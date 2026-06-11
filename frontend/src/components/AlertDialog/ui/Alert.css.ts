import { recipe } from "@vanilla-extract/recipes";

export const backdrop = recipe({
  base: {
    position: "absolute",
    inset: 0,
    backgroundColor: "oklch(0.2158 0.0666 288.17775174927874 / 50%)",
    backdropFilter: "blur(10px)",
    zIndex: 40,
  },
  variants: {
    state: {
      open: { animation: `fadeIn 0.2s ease-out` },
      closed: { animation: `fadeOut 0.2s ease-in` },
    },
  },
});

export const contentWrapper = recipe({
  base: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor:
      "color-mix(in oklch, var(--color-transparent) 0%, var(--color-background))",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    zIndex: 50,
    minWidth: "300px",
    maxWidth: "100cqw",
    ":focus": {
      outline: "none",
    },
  },
  variants: {
    state: {
      open: { animation: `contentShow 0.2s ease-out` },
      closed: { animation: `contentHide 0.2s ease-in` },
    },
  },
});

export const alertDialogTrigger = recipe({
  base: {
    backgroundColor: "#dc2626",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s",
    selectors: {
      "&:hover": {
        backgroundColor: "#b91c1c",
      },
      '&[data-state="open"]': {
        outline: "2px solid #f87171",
      },
    },
  },
  variants: {
    state: {
      open: {},
      closed: {},
    },
  },
});
