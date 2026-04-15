import { alpha, createTheme, ThemeOptions } from "@mui/material/styles";

const APP_BORDER_RADIUS = 10;
const BODY_FONT_FAMILY = 'var(--font-body), "Segoe UI", sans-serif';
const DISPLAY_FONT_FAMILY = 'var(--font-display), "Segoe UI", sans-serif';

const lightPalette = {
  primary: "#4f78c3",
  secondary: "#ffcf62",
  backgroundDefault: "#edf4ff",
  backgroundPaper: "#ffffff",
  textPrimary: "#10213f",
  textSecondary: "#61759a",
  divider: alpha("#4f78c3", 0.18),
} as const;

const darkPalette = {
  primary: "#8ea9ff",
  secondary: "#ffcf62",
  backgroundDefault: "#04070d",
  backgroundPaper: "#0b1019",
  textPrimary: "#eef3ff",
  textSecondary: "rgba(214, 224, 255, 0.74)",
  divider: alpha("#8ea9ff", 0.18),
} as const;

function getThemePalette(isDarkMode: boolean) {
  return isDarkMode ? darkPalette : lightPalette;
}

function getThemeOptions(isDarkMode: boolean): ThemeOptions {
  const palette = getThemePalette(isDarkMode);

  return {
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: palette.primary,
      },
      secondary: {
        main: palette.secondary,
      },
      background: {
        default: palette.backgroundDefault,
        paper: palette.backgroundPaper,
      },
      text: {
        primary: palette.textPrimary,
        secondary: palette.textSecondary,
      },
      divider: palette.divider,
    },
    shape: {
      borderRadius: APP_BORDER_RADIUS,
    },
    typography: {
      fontFamily: BODY_FONT_FAMILY,
      h1: {
        fontFamily: DISPLAY_FONT_FAMILY,
        fontWeight: 700,
        letterSpacing: "-0.045em",
        lineHeight: 0.92,
      },
      h2: {
        fontFamily: DISPLAY_FONT_FAMILY,
        fontWeight: 700,
        letterSpacing: "-0.035em",
        lineHeight: 0.96,
      },
      h3: {
        fontFamily: DISPLAY_FONT_FAMILY,
        fontWeight: 700,
      },
      h4: {
        fontFamily: DISPLAY_FONT_FAMILY,
        fontWeight: 700,
      },
      overline: {
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: "0.24em",
        textTransform: "uppercase",
      },
      subtitle2: {
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
      },
      body1: {
        fontSize: 15,
        lineHeight: 1.6,
      },
      body2: {
        fontSize: 13,
        lineHeight: 1.55,
      },
      button: {
        textTransform: "none",
        fontWeight: 800,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          },
          a: {
            color: "inherit",
            textDecoration: "none",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: `${APP_BORDER_RADIUS}px`,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: `${APP_BORDER_RADIUS}px`,
            boxShadow: "none",
            fontWeight: 800,
            transition:
              "background-color 180ms ease, border-color 180ms ease, color 180ms ease, box-shadow 180ms ease",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: `${APP_BORDER_RADIUS}px`,
            transition: "background-color 180ms ease, border-color 180ms ease",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            fontWeight: 800,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: `${APP_BORDER_RADIUS}px`,
            transition:
              "border-color 180ms ease, box-shadow 180ms ease, background-color 180ms ease",
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            fontWeight: 800,
          },
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            borderRadius: `${APP_BORDER_RADIUS}px`,
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(14px)",
            borderRadius: `${APP_BORDER_RADIUS}px`,
          },
        },
      },
    },
  };
}

export function createAppTheme(isDarkMode: boolean) {
  return createTheme(getThemeOptions(isDarkMode));
}

export function getDocumentThemeValue(isDarkMode: boolean) {
  return isDarkMode ? "night" : "day";
}
