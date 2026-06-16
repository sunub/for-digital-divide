"use client";

import { Loading } from "@internal/design-system/components";
import { CheckIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useStepper } from "../hooks/useStepper";
import { useStepperStore } from "../store/stepper-store";
import * as styles from "./Stepper.css";

const TARGET_PATHS = ["/sign-up/register-user", "/onboarding", "/intro"];
export const CONFIRM_COLOR = "oklch(0.404 0.2121 288.17775174927874)";

function StepIcon({ done }: { done: boolean }) {
  return (
    <IconContainer>
      <Circle $done={done} />
      {done && (
        <CheckIconContainer>
          <CheckIcon size={10} color={CONFIRM_COLOR} strokeWidth={4} />
        </CheckIconContainer>
      )}
    </IconContainer>
  );
}

function StepItem({
  step,
  isCurrent,
  isChild,
}: {
  step: { id: string; index: number; label: string; done: boolean };
  isCurrent: boolean;
  isChild: boolean;
}) {
  return (
    <StepListItem done={step.done} isProgress={isCurrent} isChild={isChild}>
      {isCurrent ? (
        <>
          <span>{step.label}</span>
          <LoadingContainer>
            <Loading size={3} radius="2rem" />
          </LoadingContainer>
        </>
      ) : (
        <>
          <StepIcon done={step.done} />
          <span>{step.label}</span>
        </>
      )}
    </StepListItem>
  );
}

// 스타일 적용을 위한 헬퍼 함수
function getStepListItemClass(
  done: boolean,
  isProgress: boolean,
  isChild: boolean,
) {
  return styles.stepListItem({ done, isProgress, isChild });
}

function getCircleClass(done: boolean) {
  return styles.circle({ done });
}

const Container = (props: React.ComponentProps<"ol">) => (
  <ol className={styles.container} {...props} />
);

const StepListItem = ({
  done,
  isProgress,
  isChild,
  ...props
}: React.ComponentProps<"li"> & {
  done: boolean;
  isProgress: boolean;
  isChild: boolean;
}) => (
  <li className={getStepListItemClass(done, isProgress, isChild)} {...props} />
);

const Circle = ({ $done }: { $done: boolean }) => (
  <div className={getCircleClass($done)} />
);

const CheckIconContainer = (props: React.ComponentProps<"div">) => (
  <div className={styles.checkIconContainer} {...props} />
);

const IconContainer = (props: React.ComponentProps<"div">) => (
  <div className={styles.iconContainer} {...props} />
);

const LoadingContainer = (props: React.ComponentProps<"div">) => (
  <div className={styles.loadingContainer} {...props} />
);

export function Stepper() {
  const pathname = usePathname();
  const stepper = useStepperStore();

  useStepper();

  if (!TARGET_PATHS.includes(pathname)) {
    return null;
  }

  if (pathname === "/dashboard") {
    return (
      <Container>
        <StepListItem done={true} isProgress={false} isChild={false}>
          <StepIcon done={true} />
          <span>대쉬보드</span>
        </StepListItem>
      </Container>
    );
  }

  return (
    <Container>
      {stepper.steps.map((step) => {
        const isCurrent = stepper.currentStep === step.index;
        const isChild = step.index === 3 || step.index === 4;
        return (
          <StepItem
            key={step.id}
            step={step}
            isCurrent={isCurrent}
            isChild={isChild}
          />
        );
      })}
    </Container>
  );
}
