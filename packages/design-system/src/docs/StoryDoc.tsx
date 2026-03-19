import type { CSSProperties, ReactNode } from "react";
import { isValidElement } from "react";
import { vars } from "../tokens/theme.css";

type KeyedEntry<T> = {
  content: T;
  key: string;
};

function getElementTypeLabel(type: unknown) {
  if (typeof type === "string") {
    return type;
  }

  if (typeof type === "function") {
    return type.displayName ?? type.name ?? "component";
  }

  if (typeof type === "symbol") {
    return type.description ?? "symbol";
  }

  return "element";
}

function getNodeSignature(node: ReactNode): string {
  if (node == null || typeof node === "boolean") {
    return "";
  }

  if (
    typeof node === "string" ||
    typeof node === "number" ||
    typeof node === "bigint"
  ) {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeSignature).join("|");
  }

  if (isValidElement(node)) {
    if (node.key != null) {
      return `key:${String(node.key)}`;
    }

    return `${getElementTypeLabel(node.type)}:${getNodeSignature(node.props.children)}`;
  }

  return String(node);
}

function createKeyedEntries<T>(
  items: readonly T[],
  getSignature: (item: T) => string,
): KeyedEntry<T>[] {
  const signatureCount = new Map<string, number>();

  return items.map((content) => {
    const baseKey = getSignature(content) || "item";
    const nextCount = (signatureCount.get(baseKey) ?? 0) + 1;

    signatureCount.set(baseKey, nextCount);

    return {
      content,
      key: nextCount === 1 ? baseKey : `${baseKey}:${nextCount}`,
    };
  });
}

const styles = {
  article: {
    maxWidth: "56rem",
    margin: "0 auto",
    padding: `${vars.space[4]} 0 ${vars.space[8]}`,
    color: vars.color.text,
    lineHeight: 1.7,
  } satisfies CSSProperties,
  title: {
    margin: 0,
    fontSize: vars.fontSize["2rem"],
    fontWeight: vars.fontWeight.black,
    lineHeight: 1.2,
  } satisfies CSSProperties,
  lead: {
    margin: `${vars.space[4]} 0 0`,
    color: vars.color.descriptionText,
    fontSize: vars.fontSize["1rem"],
  } satisfies CSSProperties,
  section: {
    marginTop: vars.space[8],
  } satisfies CSSProperties,
  sectionTitle: {
    margin: `0 0 ${vars.space[3]}`,
    fontSize: vars.fontSize["1.25rem"],
    fontWeight: vars.fontWeight.bold,
    lineHeight: 1.3,
  } satisfies CSSProperties,
  paragraph: {
    margin: `${vars.space[3]} 0 0`,
  } satisfies CSSProperties,
  list: {
    margin: `${vars.space[3]} 0 0`,
    paddingLeft: vars.space[6],
  } satisfies CSSProperties,
  listItem: {
    marginTop: vars.space[2],
  } satisfies CSSProperties,
  note: {
    marginTop: vars.space[3],
    padding: `${vars.space[3]} ${vars.space[4]}`,
    borderLeft: `${vars.space[1]} solid ${vars.color.border}`,
    backgroundColor: "color-mix(in oklch, var(--color-background) 92%, white)",
    borderRadius: vars.borderRadius.md,
  } satisfies CSSProperties,
  tableWrap: {
    marginTop: vars.space[3],
    overflowX: "auto",
  } satisfies CSSProperties,
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: vars.fontSize["0.75rem"],
  } satisfies CSSProperties,
  tableHead: {
    textAlign: "left",
    borderBottom: `${vars.space.px} solid ${vars.color.border}`,
    padding: `${vars.space[2]} ${vars.space[3]}`,
    verticalAlign: "top",
  } satisfies CSSProperties,
  tableCell: {
    borderBottom: `${vars.space.px} solid color-mix(in oklch, var(--color-border) 55%, transparent)`,
    padding: `${vars.space[2]} ${vars.space[3]}`,
    verticalAlign: "top",
  } satisfies CSSProperties,
  pre: {
    margin: `${vars.space[3]} 0 0`,
    padding: vars.space[4],
    overflowX: "auto",
    borderRadius: vars.borderRadius.md,
    backgroundColor: "color-mix(in oklch, var(--color-device) 50%, white)",
    fontSize: vars.fontSize["0.75rem"],
    lineHeight: 1.6,
  } satisfies CSSProperties,
  inlineCode: {
    fontFamily:
      'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, "Liberation Mono", monospace',
    fontSize: "0.95em",
  } satisfies CSSProperties,
} as const;

export function StoryDoc({
  title,
  lead,
  children,
}: {
  title: string;
  lead: ReactNode;
  children: ReactNode;
}) {
  return (
    <article style={styles.article}>
      <h1 style={styles.title}>{title}</h1>
      <p style={styles.lead}>{lead}</p>
      {children}
    </article>
  );
}

export function StoryDocSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

export function StoryDocParagraph({ children }: { children: ReactNode }) {
  return <p style={styles.paragraph}>{children}</p>;
}

export function StoryDocList({ items }: { items: ReactNode[] }) {
  const keyedItems = createKeyedEntries(items, getNodeSignature);

  return (
    <ul style={styles.list}>
      {keyedItems.map(({ content, key }) => (
        <li key={key} style={styles.listItem}>
          {content}
        </li>
      ))}
    </ul>
  );
}

export function StoryDocNote({ children }: { children: ReactNode }) {
  return <div style={styles.note}>{children}</div>;
}

export function StoryDocTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: ReactNode[][];
}) {
  const keyedRows = createKeyedEntries(rows, (row) =>
    row.map(getNodeSignature).join("||"),
  ).map(({ content, key }) => ({
    cells: createKeyedEntries(content, getNodeSignature).map(
      ({ content: cell, key: cellKey }) => ({
        content: cell,
        key: `${key}:${cellKey}`,
      }),
    ),
    key,
  }));

  return (
    <div style={styles.tableWrap}>
      <table style={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} style={styles.tableHead}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {keyedRows.map(({ cells, key }) => (
            <tr key={key}>
              {cells.map(({ content, key: cellKey }) => (
                <td key={cellKey} style={styles.tableCell}>
                  {content}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StoryDocCode({ code }: { code: string }) {
  return (
    <pre style={styles.pre}>
      <code style={styles.inlineCode}>{code}</code>
    </pre>
  );
}
