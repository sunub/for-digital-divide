import { motion } from "motion/react";
import {
	type ComponentPropsWithoutRef,
	memo,
	type Ref,
	useCallback,
} from "react";
import useToggle from "@/shared/hooks/use-toggle";
import type { Status } from "@/store/pinnumber-store";
import * as styles from "./Button.css";
import { usePendingAnimation } from "./hooks/usePendingAnimation";

interface ButtonProps extends ComponentPropsWithoutRef<typeof motion.button> {
	variant?: "default" | "confirm" | "destructive";
	status?: Status;
	ref?: Ref<HTMLButtonElement>;
}

export function Button({
	variant = "default",
	status = "idle",
	onClick,
	children,
	ref,
	...props
}: ButtonProps) {
	const [isClick, toggleClick] = useToggle(false);
	const { textAnimationScope, ballAnimationScope } =
		usePendingAnimation(status);

	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			if (status === "pending") {
				return;
			}
			toggleClick();
			onClick?.(e);
		},
		[status, onClick, toggleClick],
	);

	const isPending = status === "pending";

	return (
		<motion.button
			whileTap={{ scale: 0.95 }}
			transition={{ duration: 0.1 }}
			ref={ref}
			type="button"
			className={styles.buttonRecipe({
				variant,
				status: status === "pending" ? "pending" : "idle",
			})}
			aria-pressed={isClick}
			onClick={handleClick}
			{...props}
		>
			<div>
				<span className={styles.edgeClass} />
				<span className={styles.shadowClass} />

				<motion.div ref={ballAnimationScope} className={styles.frontClass}>
					<motion.span
						id="upper-dot-pending"
						initial={{ y: 0, scale: 1 }}
						className={styles.dotClass({
							status: isPending ? "pending" : "idle",
							type: "upper",
						})}
					/>
					<motion.span
						id="lower-dot-pending"
						initial={{ y: 0, scale: 1 }}
						className={styles.dotClass({
							status: isPending ? "pending" : "idle",
							type: "lower",
						})}
					/>
					<motion.div ref={textAnimationScope}>{children}</motion.div>
				</motion.div>
			</div>
		</motion.button>
	);
}

export default memo(Button);
