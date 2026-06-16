import type React from "react";
import * as styles from "./VisuallyHidden.css";

const VisuallyHidden = ({ children }: { children: React.ReactNode }) => {
  return <span className={styles.hiddenStyles}>{children}</span>;
};

export default VisuallyHidden;
