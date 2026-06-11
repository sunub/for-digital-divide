"use client";

import { Flex } from "@internal/design-system/primitives";
import { Text } from "@internal/design-system/components";
import { motion, useSpring } from "motion/react";
import { memo, useEffect } from "react";
import * as style from "./MainTitle.css";

export const MainTitle = memo(() => {
  const width = useSpring("1px");

  useEffect(() => {
    width.set("100px");
  }, [width]);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      width="full"
      color={"standOut"}
      paddingTop={10}
      paddingBottom={8}
      className={style.brandTitle}
      fontSize={"2rem"}
    >
      <Flex alignItems="center" justifyContent="center" width="full">
        <Text as="span" fontWeight="semibold" className={style.brandTitle}>
          디지털
        </Text>
        <motion.svg
          className={style.svg}
          key={"divide-line"}
          style={{ width }}
          height={"10px"}
          viewBox={`0 0 100 10`}
        >
          <title>Divide line</title>
          <motion.rect style={{ width }} height={"2px"} />
        </motion.svg>
        <Text as="span" fontWeight="semibold" className={style.brandTitle}>
          격차
        </Text>
      </Flex>
      <Text as="span" fontWeight="semibold" className={style.brandTitle}>
        좁히기
      </Text>
    </Flex>
  );
});
