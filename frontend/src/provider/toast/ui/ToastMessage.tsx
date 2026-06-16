import { Text } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import { motion, type Variants } from "motion/react";
import { useEffect } from "react";
import { MdCheckCircle, MdError, MdInfo, MdWarning } from "react-icons/md";
import { useToastStore } from "../store/toast-store";
import * as styles from "../style/toast.css";
import type { Toast } from "../types";

const toastVariants: Variants = {
  initial: { opacity: 0, y: -50 },
  animate: (custom: { length: number; index: number }) => ({
    opacity: 1,
    y: (custom.length - custom.index - 1) * 10 + 15,
  }),
  exit: { opacity: 0, y: -50 },
};

function renderDefaultMessageText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const content = part.slice(2, -2);
      const isSixDigits = /^\d{6}$/.test(content);
      const itemKey = `bold-${content}-${index}`;
      return (
        <strong
          key={itemKey}
          className={isSixDigits ? styles.strongOtpText : styles.strongText}
        >
          {content}
        </strong>
      );
    }
    return part;
  });
}

function getDefaultIcon(type: string) {
  switch (type) {
    case "success":
      return <MdCheckCircle size={24} />;
    case "error":
      return <MdError size={24} />;
    case "warning":
      return <MdWarning size={24} />;
    default:
      return <MdInfo size={24} />;
  }
}

function getDefaultTitle(type: string) {
  switch (type) {
    case "success":
      return "성공";
    case "error":
      return "오류";
    case "warning":
      return "경고";
    default:
      return "알림";
  }
}

export function ToastMessage({
  toast,
  index,
  length,
}: {
  toast: Toast;
  index: number;
  length: number;
}) {
  const dispatch = useToastStore((state) => state.dispatch);

  useEffect(() => {
    const duration = toast.duration !== undefined ? toast.duration : 3000;
    if (duration !== 0) {
      const timer = setTimeout(() => {
        dispatch({ type: "remove", payload: { id: toast.id } });
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [dispatch, toast.id, toast.duration]);

  const IconComponent = toast.icon || getDefaultIcon(toast.type);
  const title = toast.title || getDefaultTitle(toast.type);

  return (
    <motion.div
      custom={{ length, index }}
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ zIndex: index, position: "absolute" }}
      className={styles.message({ type: toast.type })}
    >
      <Flex direction="row" alignItems="center" padding={4} gap={4}>
        <Flex
          alignItems="center"
          justifyContent="center"
          className={styles.iconContainer({ type: toast.type })}
        >
          {IconComponent}
        </Flex>

        <Flex direction="column" style={{ flexGrow: 1, overflow: "hidden" }}>
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className={styles.headerRow}
          >
            <Text as="span" className={styles.typeTitle({ type: toast.type })}>
              {title}
            </Text>
            <Text as="span" className={styles.timestamp}>
              지금
            </Text>
          </Flex>

          {toast.children ? (
            toast.children
          ) : (
            <Text as="p" className={styles.bodyText}>
              {toast.message?.map((msg, idx) => (
                <span key={`toast-message-${msg}-${index}`}>
                  {renderDefaultMessageText(msg)}
                  {idx < (toast.message?.length || 0) - 1 && <br />}
                </span>
              ))}
            </Text>
          )}
        </Flex>
      </Flex>
    </motion.div>
  );
}
