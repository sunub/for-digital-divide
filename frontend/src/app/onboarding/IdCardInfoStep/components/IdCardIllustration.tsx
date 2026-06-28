import { Box, Flex } from "@internal/design-system/primitives";
import * as parentStyles from "../IdCardInfoStep.css";
import * as illustrationStyles from "./IdCardIllustration.css";

interface IdCardIllustrationProps {
  name?: string;
  residentFront?: string;
  issueDate?: string;
}

export function IdCardIllustration({
  name,
  residentFront,
  issueDate,
}: IdCardIllustrationProps) {
  return (
    <Flex
      direction="column"
      position="relative"
      width="full"
      padding={6}
      marginBottom={8}
      className={illustrationStyles.cardContainer}
    >
      <Box className={parentStyles.hologram1} />
      <Box className={parentStyles.hologram2} />

      <Flex
        alignItems="flex-start"
        justifyContent="space-between"
        marginBottom={4}
        className={illustrationStyles.zIndex10}
      >
        <Flex direction="column" gap={1}>
          <span className={parentStyles.cardCountry}>대한민국</span>
          <span className={parentStyles.cardTitle}>주민등록증</span>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          position="relative"
          className={illustrationStyles.cardPhoto}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(108, 62, 198, 0.4)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <title>id-card-icon</title>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </Flex>
      </Flex>

      <Flex direction="column" gap={2} className={illustrationStyles.zIndex10}>
        <span className={parentStyles.cardNameText}>{name || "이름"}</span>
        <span className={parentStyles.cardRrnText}>
          {residentFront ? `${residentFront}-1******` : "주민등록번호"}
        </span>
      </Flex>

      <Flex
        alignItems="flex-end"
        justifyContent="space-between"
        marginTop="auto"
        className={illustrationStyles.zIndex10}
      >
        <Flex direction="column">
          <span className={parentStyles.cardDateLabel}>발급일</span>
          <span className={parentStyles.cardDateText}>
            {issueDate || "YYYY.MM.DD"}
          </span>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          className={illustrationStyles.cardSeal}
        >
          <Box className={parentStyles.cardSealInner} />
        </Flex>
      </Flex>
    </Flex>
  );
}
