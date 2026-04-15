import { SxProps, Theme } from "@mui/material/styles";

type UnitToggleStyles = {
  root: SxProps<Theme>;
};

export function getUnitToggleStyles(isDarkMode: boolean): UnitToggleStyles {
  return {
    root: {
      p: 0.5,
      border: isDarkMode
        ? "1px solid rgba(124, 144, 196, 0.24)"
        : "1px solid rgba(255,255,255,0.22)",
      borderRadius: "10px",
      bgcolor: isDarkMode ? "rgba(5, 8, 14, 0.86)" : "rgba(7, 20, 48, 0.12)",
      backdropFilter: "blur(12px)",
      "& .MuiToggleButtonGroup-grouped": {
        border: 0,
        borderRadius: "8px !important",
        color: isDarkMode ? "rgba(214, 224, 255, 0.76)" : "rgba(244, 250, 255, 0.84)",
        px: 1.8,
        minHeight: 44,
        minWidth: 52,
        fontSize: 12.5,
        fontWeight: 800,
        letterSpacing: "0.12em",
        "@media (max-height: 860px)": {
          minHeight: 40,
          minWidth: 48,
          px: 1.45,
        },
      },
      "& .Mui-selected": {
        bgcolor: isDarkMode
          ? "rgba(142, 169, 255, 0.18) !important"
          : "rgba(255,255,255,0.22) !important",
        color: "#fff",
        boxShadow: isDarkMode
          ? "0 10px 24px rgba(0, 0, 0, 0.28)"
          : "0 10px 20px rgba(8, 19, 44, 0.16)",
      },
    },
  };
}
