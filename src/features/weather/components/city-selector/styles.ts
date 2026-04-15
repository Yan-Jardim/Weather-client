import { SxProps, Theme } from "@mui/material/styles";

type CitySelectorStyles = {
  paper: SxProps<Theme>;
  popper: SxProps<Theme>;
  option: SxProps<Theme>;
  optionRow: SxProps<Theme>;
  optionIcon: SxProps<Theme>;
  optionHeader: SxProps<Theme>;
  optionTitle: SxProps<Theme>;
  recentBadge: SxProps<Theme>;
  optionSubtitle: SxProps<Theme>;
  root: SxProps<Theme>;
};

export function getCitySelectorStyles(isDarkMode: boolean): CitySelectorStyles {
  return {
    paper: {
      mt: 1,
      borderRadius: "10px",
      overflow: "hidden",
      maxHeight: 360,
      border: isDarkMode
        ? "1px solid rgba(120, 140, 196, 0.18)"
        : "1px solid rgba(93, 127, 188, 0.14)",
      bgcolor: isDarkMode ? "rgba(8, 12, 20, 0.96)" : "rgba(255,255,255,0.96)",
      boxShadow: isDarkMode
        ? "0 22px 52px rgba(0, 0, 0, 0.42)"
        : "0 20px 48px rgba(46, 76, 132, 0.14)",
      backdropFilter: "blur(18px)",
    },
    popper: {
      "& .MuiAutocomplete-listbox": {
        py: 0.5,
      },
    },
    option: {
      px: 1.25,
      py: 1,
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      "&:last-of-type": {
        borderBottom: "none",
      },
    },
    optionRow: {
      alignItems: "flex-start",
    },
    optionIcon: {
      mt: 0.2,
      fontSize: 18,
      color: isDarkMode ? "#8ea9ff" : "#5e83c9",
    },
    optionHeader: {
      alignItems: "center",
      flexWrap: "wrap",
      rowGap: 0.35,
    },
    optionTitle: {
      fontSize: 14,
      fontWeight: 800,
      color: isDarkMode ? "#eef3ff" : "#17315f",
    },
    recentBadge: {
      px: 0.65,
      py: 0.15,
      borderRadius: "8px",
      bgcolor: isDarkMode
        ? "rgba(142, 169, 255, 0.12)"
        : "rgba(125, 168, 242, 0.16)",
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: isDarkMode ? "#b9caff" : "#5475a9",
    },
    optionSubtitle: {
      fontSize: 12.5,
      color: isDarkMode ? "rgba(205, 217, 255, 0.62)" : "#667fa8",
    },
    root: {
      "& .MuiOutlinedInput-root": {
        minHeight: 52,
        borderRadius: "10px",
        bgcolor: isDarkMode ? "rgba(7, 11, 18, 0.9)" : "rgba(250, 252, 255, 0.94)",
        color: isDarkMode ? "#eef3ff" : "#17315f",
        boxShadow: isDarkMode
          ? "0 18px 38px rgba(0, 0, 0, 0.24)"
          : "0 16px 28px rgba(29, 63, 118, 0.07)",
        "& fieldset": {
          borderColor: isDarkMode
            ? "rgba(120, 140, 196, 0.2)"
            : "rgba(93, 127, 188, 0.18)",
        },
        "&:hover fieldset": {
          borderColor: isDarkMode
            ? "rgba(142, 169, 255, 0.4)"
            : "rgba(93, 127, 188, 0.4)",
        },
        "&.Mui-focused fieldset": {
          borderColor: isDarkMode ? "#8ea9ff" : "#7da8f2",
          borderWidth: 1,
        },
        "@media (max-height: 860px)": {
          minHeight: 48,
        },
      },
      "& .MuiInputLabel-root": {
        color: isDarkMode ? "rgba(194, 208, 255, 0.72)" : "#5475a9",
        fontWeight: 700,
        "@media (max-height: 860px)": {
          fontSize: 13,
        },
      },
      "& .MuiInputBase-input::placeholder": {
        color: isDarkMode ? "rgba(205, 217, 255, 0.48)" : undefined,
        opacity: 1,
      },
      "& .MuiInputBase-input": {
        fontWeight: 600,
      },
      "& .MuiAutocomplete-popupIndicator, & .MuiAutocomplete-clearIndicator": {
        color: isDarkMode ? "#97b1ff" : "#5c7eb8",
      },
    },
  };
}
