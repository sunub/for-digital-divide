import type { CSSProperties, ReactNode } from "react";
import { vars } from "../tokens/theme.css";

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
  return (
    <ul style={styles.list}>
      {items.map((item, index) => (
        <li key={index} style={styles.listItem}>
          {item}
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
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} style={styles.tableCell}>
                  {cell}
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

