import ts from "typescript";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project root is 2 levels up from packages/design-system/scripts
const pkgDir = path.resolve(__dirname, "..");
const srcDir = path.join(pkgDir, "src");
const distDir = path.join(pkgDir, "dist");

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Helper to unwrap satisfies, as, and parenthesis
function unwrapAsAndSatisfies(node: ts.Node): ts.Node {
  let current = node;
  while (
    ts.isAsExpression(current) ||
    ts.isSatisfiesExpression(current) ||
    ts.isParenthesizedExpression(current)
  ) {
    current = current.expression;
  }
  return current;
}

// AST Evaluation Helpers
function evaluateNode(node: ts.Node, localDecls: Map<string, any>): any {
  const unwrapped = unwrapAsAndSatisfies(node);
  
  if (ts.isStringLiteral(unwrapped) || ts.isNoSubstitutionTemplateLiteral(unwrapped)) {
    return unwrapped.text;
  }
  if (ts.isNumericLiteral(unwrapped)) {
    return Number(unwrapped.text);
  }
  if (unwrapped.kind === ts.SyntaxKind.TrueKeyword) {
    return true;
  }
  if (unwrapped.kind === ts.SyntaxKind.FalseKeyword) {
    return false;
  }
  if (unwrapped.kind === ts.SyntaxKind.NullKeyword) {
    return null;
  }
  if (ts.isPrefixUnaryExpression(unwrapped)) {
    const operand = evaluateNode(unwrapped.operand, localDecls);
    if (unwrapped.operator === ts.SyntaxKind.MinusToken) {
      return -operand;
    }
    return operand;
  }
  if (ts.isIdentifier(unwrapped)) {
    const name = unwrapped.text;
    if (localDecls.has(name)) {
      return localDecls.get(name);
    }
    return name;
  }
  if (ts.isPropertyAccessExpression(unwrapped)) {
    const expression = evaluateNode(unwrapped.expression, localDecls);
    const name = unwrapped.name.text;
    if (expression && typeof expression === "object" && name in expression) {
      return (expression as any)[name];
    }
    return `${expression}.${name}`;
  }
  if (ts.isObjectLiteralExpression(unwrapped)) {
    const obj: any = {};
    for (const prop of unwrapped.properties) {
      if (ts.isPropertyAssignment(prop)) {
        const keyName = ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name)
          ? prop.name.text
          : prop.name.getText();
        obj[keyName] = evaluateNode(prop.initializer, localDecls);
      } else if (ts.isShorthandPropertyAssignment(prop)) {
        const keyName = prop.name.text;
        if (localDecls.has(keyName)) {
          obj[keyName] = localDecls.get(keyName);
        } else {
          obj[keyName] = keyName;
        }
      }
    }
    return obj;
  }
  if (ts.isArrayLiteralExpression(unwrapped)) {
    return unwrapped.elements.map(el => evaluateNode(el, localDecls));
  }
  return null;
}

// Extract tokens from theme.css.ts
function parseThemeTokens(filePath: string): any {
  const code = fs.readFileSync(filePath, "utf-8");
  const sourceFile = ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true);
  const localDecls = new Map<string, any>();
  let varsResult: any = null;

  function visit(node: ts.Node) {
    if (ts.isVariableDeclaration(node) && node.initializer) {
      const name = node.name.getText();
      let val: any = null;
      const unwrappedInitializer = unwrapAsAndSatisfies(node.initializer);

      if (ts.isCallExpression(unwrappedInitializer)) {
        const args = unwrappedInitializer.arguments;
        if (args.length >= 2) {
          val = evaluateNode(args[1], localDecls);
        } else if (args.length === 1) {
          val = evaluateNode(args[0], localDecls);
        }
      } else {
        val = evaluateNode(unwrappedInitializer, localDecls);
      }

      if (val !== null) {
        localDecls.set(name, val);
        if (name === "vars") {
          varsResult = val;
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return varsResult;
}

// Extract sprinkles from sprinkles.css.ts
function parseSprinkles(filePath: string): any {
  const code = fs.readFileSync(filePath, "utf-8");
  const sourceFile = ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true);
  const localDecls = new Map<string, any>();
  let sprinklesResult: any = null;

  function visit(node: ts.Node) {
    if (ts.isVariableDeclaration(node) && node.initializer) {
      const name = node.name.getText();
      let val: any = null;
      const unwrappedInitializer = unwrapAsAndSatisfies(node.initializer);

      if (ts.isCallExpression(unwrappedInitializer) && unwrappedInitializer.arguments.length > 0) {
        val = evaluateNode(unwrappedInitializer.arguments[0], localDecls);
      } else {
        val = evaluateNode(unwrappedInitializer, localDecls);
      }

      if (val !== null) {
        localDecls.set(name, val);
        if (name === "baseStyleProperties") {
          sprinklesResult = val;
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return sprinklesResult;
}

function getObjectPropertyValue(objNode: ts.ObjectLiteralExpression, propPath: string[]): ts.Node | null {
  let current: ts.Node = objNode;
  for (const key of propPath) {
    if (!ts.isObjectLiteralExpression(current)) return null;
    let found: ts.Node | null = null;
    for (const prop of current.properties) {
      if (ts.isPropertyAssignment(prop)) {
        const propName = ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name)
          ? prop.name.text
          : prop.name.getText();
        if (propName === key) {
          found = prop.initializer;
          break;
        }
      }
    }
    if (!found) return null;
    current = unwrapAsAndSatisfies(found);
  }
  return current;
}

function isExported(node: ts.VariableDeclaration): boolean {
  const variableStatement = node.parent?.parent;
  if (variableStatement && ts.isVariableStatement(variableStatement)) {
    const modifiers = ts.canHaveModifiers(variableStatement)
      ? ts.getModifiers(variableStatement)
      : undefined;
    if (modifiers) {
      return modifiers.some(m => m.kind === ts.SyntaxKind.ExportKeyword);
    }
  }
  return false;
}

function cleanUpJsx(text: string): string {
  text = text.trim();
  if (text.startsWith("(") && text.endsWith(")")) {
    text = text.slice(1, -1).trim();
  }
  if (text.startsWith("{") && text.endsWith("}")) {
    const match = text.match(/return\s+\(?([\s\S]+?)\)?\s*;?\s*}$/);
    if (match) {
      return match[1].trim();
    }
  }
  return text;
}

// Parse Storybook stories file
function parseStorybook(filePath: string): any {
  const code = fs.readFileSync(filePath, "utf-8");
  const sourceFile = ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true);
  
  let componentName = "";
  let description = "";
  const props: any = {};
  const examples: any[] = [];
  
  const localDecls = new Map<string, any>();
  // Pre-populate local variables (e.g. variantOptions)
  function visitLocalDecls(node: ts.Node) {
    if (ts.isVariableDeclaration(node) && node.initializer && node.name.getText() !== "meta") {
      const name = node.name.getText();
      const val = evaluateNode(node.initializer, localDecls);
      if (val !== null) {
        localDecls.set(name, val);
      }
    }
    ts.forEachChild(node, visitLocalDecls);
  }
  visitLocalDecls(sourceFile);

  // Find meta object and component name
  function visitMeta(node: ts.Node) {
    if (ts.isVariableDeclaration(node) && node.name.getText() === "meta" && node.initializer) {
      const unwrapped = unwrapAsAndSatisfies(node.initializer);
      if (ts.isObjectLiteralExpression(unwrapped)) {
        const metaNode = unwrapped;
        
        // Component name
        const compNode = getObjectPropertyValue(metaNode, ["component"]);
        if (compNode) {
          componentName = compNode.getText();
        } else {
          componentName = path.basename(filePath, ".stories.tsx");
        }
        
        // Description
        const descNode = getObjectPropertyValue(metaNode, ["parameters", "docs", "description", "component"]);
        if (descNode) {
          description = evaluateNode(descNode, localDecls) || "";
        }
        
        // argTypes
        const argTypesNode = getObjectPropertyValue(metaNode, ["argTypes"]);
        if (argTypesNode && ts.isObjectLiteralExpression(argTypesNode)) {
          for (const prop of argTypesNode.properties) {
            if (ts.isPropertyAssignment(prop)) {
              const propName = ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name)
                ? prop.name.text
                : prop.name.getText();
              const propConfig = evaluateNode(prop.initializer, localDecls) || {};
              
              const options = propConfig.options;
              const hasOptions = Array.isArray(options);
              
              props[propName] = {
                type: hasOptions
                  ? options.map((o: any) => typeof o === "string" ? `"${o}"` : String(o)).join(" | ")
                  : (propConfig.control === "boolean" ? "boolean" : "any"),
                description: propConfig.description || "",
                defaultValue: ""
              };
            }
          }
        }
        
        // default args
        const argsNode = getObjectPropertyValue(metaNode, ["args"]);
        if (argsNode && ts.isObjectLiteralExpression(argsNode)) {
          const defaultArgs = evaluateNode(argsNode, localDecls) || {};
          for (const key in defaultArgs) {
            if (props[key]) {
              props[key].defaultValue = String(defaultArgs[key]);
            } else {
              props[key] = {
                type: typeof defaultArgs[key],
                description: "",
                defaultValue: String(defaultArgs[key])
              };
            }
          }
        }
      }
    }
    ts.forEachChild(node, visitMeta);
  }
  visitMeta(sourceFile);

  if (!componentName) {
    componentName = path.basename(filePath, ".stories.tsx");
  }

  // Find stories
  function visitStories(node: ts.Node) {
    if (ts.isVariableDeclaration(node) && isExported(node)) {
      const name = node.name.getText();
      if (name !== "meta" && node.initializer) {
        const unwrapped = unwrapAsAndSatisfies(node.initializer);
        if (ts.isObjectLiteralExpression(unwrapped)) {
          const renderNode = getObjectPropertyValue(unwrapped, ["render"]);
          const argsNode = getObjectPropertyValue(unwrapped, ["args"]);
          let exampleCode = "";

          if (renderNode) {
            const unwrappedRender = unwrapAsAndSatisfies(renderNode);
            if (ts.isArrowFunction(unwrappedRender)) {
              exampleCode = cleanUpJsx(unwrappedRender.body.getText(sourceFile));
            } else if (ts.isFunctionExpression(unwrappedRender)) {
              exampleCode = cleanUpJsx(unwrappedRender.body.getText(sourceFile));
            }
          } else if (argsNode) {
            const storyArgs = evaluateNode(argsNode, localDecls) || {};
            const attributes = Object.entries(storyArgs)
              .map(([k, v]) => {
                if (k === "children") return "";
                if (typeof v === "string") return `${k}="${v}"`;
                return `${k}={${JSON.stringify(v)}}`;
              })
              .filter(Boolean)
              .join(" ");
            const children = storyArgs.children || "";
            exampleCode = `<${componentName}${attributes ? " " + attributes : ""}>${children}</${componentName}>`;
          }

          if (exampleCode) {
            examples.push({
              scenario: name,
              code: exampleCode
            });
          }
        }
      }
    }
    ts.forEachChild(node, visitStories);
  }
  visitStories(sourceFile);

  return {
    name: componentName,
    description,
    importPath: `@internal/design-system/components`,
    props,
    examples
  };
}

// Main Build function
function main() {
  console.log("Starting MCP data generation...");
  
  // 1. Parse tokens
  const themeFile = path.join(srcDir, "tokens", "theme.css.ts");
  console.log(`Parsing theme tokens from ${themeFile}...`);
  const tokens = parseThemeTokens(themeFile);
  
  // 2. Parse sprinkles
  const sprinklesFile = path.join(srcDir, "styles", "sprinkles.css.ts");
  console.log(`Parsing sprinkles config from ${sprinklesFile}...`);
  const sprinkles = parseSprinkles(sprinklesFile);
  
  const mcpTokens = {
    ...tokens,
    sprinkles: sprinkles ? {
      shorthands: Object.keys(sprinkles.shorthands || {}),
      properties: Object.keys(sprinkles.properties || {})
    } : null
  };
  
  const tokensOut = path.join(distDir, "mcp-tokens.json");
  fs.writeFileSync(tokensOut, JSON.stringify(mcpTokens, null, 2));
  console.log(`Successfully generated tokens metadata at ${tokensOut}`);
  
  // 3. Scan components stories
  const componentsDir = path.join(srcDir, "components");
  console.log(`Scanning component stories under ${componentsDir}...`);
  
  const mcpComponents: any = {};
  function scanStories(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanStories(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".stories.tsx")) {
        console.log(`Parsing story: ${entry.name}...`);
        try {
          const compData = parseStorybook(fullPath);
          mcpComponents[compData.name] = compData;
        } catch (err) {
          console.error(`Failed to parse story file ${entry.name}:`, err);
        }
      }
    }
  }
  scanStories(componentsDir);
  
  const compsOut = path.join(distDir, "mcp-components.json");
  fs.writeFileSync(compsOut, JSON.stringify(mcpComponents, null, 2));
  console.log(`Successfully generated components metadata at ${compsOut}`);
  console.log("MCP data generation completed successfully!");
}

main();
