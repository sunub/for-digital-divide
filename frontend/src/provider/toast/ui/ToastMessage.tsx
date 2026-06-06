import {
  AngryIcon,
  FrownIcon,
  InfoIcon,
  LaughIcon,
  PartyPopperIcon,
} from "lucide-react";
import { motion, useAnimation, type Variants } from "motion/react";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import { useToastStore } from "../store/toast-store";
import * as styles from "../style/toast.css";

const toastVariants: Variants = {
  initial: { opacity: 0, y: -50 },
  animate: (custom: { length: number; index: number }) => ({
    opacity: 1,
    y: (custom.length - custom.index - 1) * 10,
  }),
  exit: { opacity: 0, y: -50 },
};

function ToastStatus({ type }: { type: string }) {
  switch (type) {
    case "success":
      return (
        <div className={styles.successIconContainer}>
          <PartyPopperIcon className={styles.icon} />
          <LaughIcon className={styles.icon} />
        </div>
      );
    case "error":
      return <FrownIcon className={styles.icon} />;
    case "info":
      return <InfoIcon className={styles.icon} />;
    case "warning":
      return <AngryIcon className={styles.icon} />;
    default:
      return null;
  }
}

function Messages({ message }: { message: string[] }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {message.map((msg) => (
        <p className={styles.text} key={nanoid()}>
          {msg}
        </p>
      ))}
    </div>
  );
}

export function ToastMessage({
  toast,
  index,
  length,
}: {
  toast: { id: string; type: string; message: string[] };
  index: number;
  length: number;
}) {
  const controls = useAnimation();
  const dispatch = useToastStore((state) => state.dispatch);

  useEffect(() => {
    controls.start("animate");
    const timer = setTimeout(() => {
      controls
        .start("exit")
        .then(() => dispatch({ type: "remove", payload: { id: toast.id } }));
    }, 3000);
    return () => clearTimeout(timer);
  }, [controls, dispatch, toast.id]);

  return (
    <motion.div
      custom={{ length, index }}
      variants={toastVariants}
      initial="initial"
      animate={controls}
      exit="exit"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ zIndex: index }}
      className={styles.message({
        type: toast.type as "success" | "error" | "info" | "warning",
      })}
    >
      <ToastStatus type={toast.type} />
      <Messages message={toast.message} />
    </motion.div>
  );
}
