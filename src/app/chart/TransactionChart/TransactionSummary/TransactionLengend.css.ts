import { style } from "@vanilla-extract/css";
import { COLORS } from "../constants/colors";

export const legendContainer = style({
  marginTop: "auto",
  paddingTop: "20px",
  display: "flex",
  gap: "10px",
  fontSize: "0.75rem",
});

export const balanceIndicator = style({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: COLORS.balance,
});

export const balanceLabel = style({
  color: "#666",
});

export const incomeIndicator = style({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: COLORS.income,
});

export const incomeLabel = style({
  color: "#666",
});

export const expenseIndicator = style({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: COLORS.expense,
});

export const expenseLabel = style({
  color: "#666",
});
