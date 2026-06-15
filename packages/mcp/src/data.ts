import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const designSystemRoot = path.resolve(__dirname, "../../design-system");
const tokensPath = path.join(designSystemRoot, "dist/mcp-tokens.json");
const componentsPath = path.join(designSystemRoot, "dist/mcp-components.json");

let tokensData: any = {};
let componentsData: any = {};

export function loadData(): void {
  try {
    if (fs.existsSync(tokensPath)) {
      tokensData = JSON.parse(fs.readFileSync(tokensPath, "utf-8"));
    } else {
      console.error(`Tokens file not found at: ${tokensPath}`);
    }
    if (fs.existsSync(componentsPath)) {
      componentsData = JSON.parse(fs.readFileSync(componentsPath, "utf-8"));
    } else {
      console.error(`Components file not found at: ${componentsPath}`);
    }
  } catch (error) {
    console.error("Error loading design system metadata:", error);
  }
}

// Initial load
loadData();

export const designSystemData = {
  get tokens() {
    return tokensData;
  },
  get components() {
    return componentsData;
  },
  get designSystemRoot() {
    return designSystemRoot;
  }
};
