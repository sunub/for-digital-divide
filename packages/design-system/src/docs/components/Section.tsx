import { Box } from "../../primitives/Box";
import { Flex } from "../../primitives/Flex";
import { Text } from "../../components/Text";
import { vars } from "../../tokens/theme.css";

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Flex gap={4}>
      <Text variant="title" as="h2" color="foreground">
        {title}
      </Text>
      <Box
        paddingLeft={4}
        style={{ borderLeft: `4px solid ${vars.color.button}` }}
      >
        {children}
      </Box>
    </Flex>
  );
}
