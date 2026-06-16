import { clsx } from "clsx";
import type { InputHTMLAttributes, ReactNode } from "react";
import { MdCheck } from "react-icons/md";
import * as styles from "./CheckBox.css";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
  /** 굵은 글씨 및 어두운 색상 여부 (ex. 전체동의) */
  isBold?: boolean;
}

export const Checkbox = ({
  children,
  isBold = false,
  className,
  ...props
}: CheckboxProps) => {
  return (
    <label className={clsx(styles.labelContainer, className)}>
      {/* 실제 동작을 담당하는 숨겨진 Input */}
      <input type="checkbox" className={styles.visuallyHidden} {...props} />

      {/* 화면에 그려지는 커스텀 박스 */}
      <div className={styles.control}>
        <MdCheck className={styles.iconStyle} />
      </div>

      {/* 외부에서 주입되는 텍스트 및 컨텐츠 */}
      <span
        className={clsx(
          styles.textStyle,
          isBold ? styles.textBold : styles.textNormal,
        )}
      >
        {children}
      </span>
    </label>
  );
};

// 중첩 레이아웃을 위한 Wrapper 컴포넌트
interface CheckboxGroupProps {
  children: ReactNode;
  className?: string;
}

export const CheckboxGroup = ({ children, className }: CheckboxGroupProps) => {
  return (
    <div className={clsx(styles.checkboxGroup, className)}>{children}</div>
  );
};
