"use client";

import { ArrowIcon } from "@/icons";
import useToggle from "@/shared/hooks/use-toggle";
import {
  PageFlexSection,
  Stack,
  Grid,
} from "@for-digital-divide/design-system";
import { title } from "./page.css";
import { SmallPhone } from "./ui/SmallPhone";

export default function Home() {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <PageFlexSection direction="column">
      {!isOpen && (
        <Stack
          asChild
          alignItems="center"
          className={title}
          width={"full"}
          space={"1.25rem"}
        >
          <header>
            <h1>핸드폰을 클릭해주세요!</h1>
            <ArrowIcon />
          </header>
        </Stack>
      )}
      <Grid placeItems={"center"} width={"full"} height={"fit"}>
        <SmallPhone isOpen={isOpen} toggleOpen={toggleOpen} />
      </Grid>
    </PageFlexSection>
  );
}
