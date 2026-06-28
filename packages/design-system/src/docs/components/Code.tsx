import { Box } from "../../primitives/Box";

export function Code({ children }: { children: string }) {
  return (
    <Box
      as="code"
      paddingLeft={2}
      paddingRight={2}
      borderRadius="sm"
      backgroundColor="device"
      color="button"
      style={{
        fontFamily: "monospace",
        fontSize: "0.9em",
        fontWeight: "bold",
      }}
    >
      {children}
    </Box>
  );
}
