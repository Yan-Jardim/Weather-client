import { SxProps, Theme } from "@mui/material/styles";

type WeatherDashboardStyles = {
  container: SxProps<Theme>;
  content: SxProps<Theme>;
  header: SxProps<Theme>;
  heroCopy: SxProps<Theme>;
  title: SxProps<Theme>;
  controlPanel: SxProps<Theme>;
  controlsRow: SxProps<Theme>;
  selectorBox: SxProps<Theme>;
  actions: SxProps<Theme>;
  locationButton: SxProps<Theme>;
  refreshingLabel: SxProps<Theme>;
  warningAlert: SxProps<Theme>;
  errorAlert: SxProps<Theme>;
  loadingCard: SxProps<Theme>;
  loadingStack: SxProps<Theme>;
  loadingLabel: SxProps<Theme>;
  resultCard: SxProps<Theme>;
};

export function getWeatherDashboardStyles(
  isDarkMode: boolean,
): WeatherDashboardStyles {
  const heroTextColor = isDarkMode ? "#f5f7ff" : "#f8fbff";
  const controlPanelSurface = isDarkMode
    ? {
        border: "1px solid rgba(113, 129, 176, 0.18)",
        bgcolor: "rgba(4, 7, 13, 0.76)",
        boxShadow: "0 28px 72px rgba(0, 0, 0, 0.5)",
      }
    : {
        border: "1px solid rgba(255,255,255,0.28)",
        bgcolor: "rgba(255,255,255,0.14)",
        boxShadow: "0 22px 56px rgba(10, 25, 52, 0.16)",
      };
  const resultSurface = isDarkMode
    ? {
        border: "1px solid rgba(113, 129, 176, 0.2)",
        boxShadow: "0 32px 92px rgba(0, 0, 0, 0.56)",
      }
    : {
        border: "1px solid rgba(255,255,255,0.28)",
        boxShadow: "0 28px 70px rgba(8, 19, 44, 0.22)",
      };

  return {
    container: {
      py: { xs: 2.25, md: 3, lg: 2.75 },
      minHeight: "100vh",
      display: "flex",
      alignItems: "flex-start",
      "@media (max-height: 860px)": {
        py: { xs: 1.75, md: 2.1, lg: 1.85 },
      },
    },
    content: {
      width: "100%",
    },
    header: {
      justifyContent: "space-between",
      alignItems: { md: "flex-start" },
    },
    heroCopy: {
      maxWidth: { md: 720, lg: 760 },
    },
    title: {
      fontFamily: "var(--font-display), sans-serif",
      fontSize: { xs: 36, md: 50, lg: 54, xl: 58 },
      lineHeight: 0.9,
      letterSpacing: "-0.045em",
      color: heroTextColor,
      "@media (max-height: 860px)": {
        fontSize: { xs: 32, md: 44, lg: 48 },
      },
    },
    controlPanel: {
      p: { xs: 1.5, md: 1.75 },
      ...controlPanelSurface,
      backdropFilter: "blur(18px)",
      "@media (max-height: 860px)": {
        p: { xs: 1.2, md: 1.35 },
      },
    },
    controlsRow: {
      alignItems: { lg: "center" },
      justifyContent: "space-between",
    },
    selectorBox: {
      flex: { lg: "0 1 66%" },
      maxWidth: { lg: 760, xl: 820 },
      minWidth: 0,
    },
    actions: {
      flex: { lg: "0 0 auto" },
      width: { lg: "auto" },
      alignSelf: { lg: "stretch" },
    },
    locationButton: {
      minHeight: 44,
      px: 2,
      bgcolor: isDarkMode ? "#9fb5ff" : "#ffd45f",
      color: isDarkMode ? "#07101f" : "#1b3568",
      boxShadow: isDarkMode
        ? "0 14px 28px rgba(0, 0, 0, 0.28)"
        : "0 14px 28px rgba(174, 130, 28, 0.2)",
      fontWeight: 800,
      whiteSpace: "nowrap",
      "&:hover": {
        bgcolor: isDarkMode ? "#b2c4ff" : "#ffcd46",
        boxShadow: isDarkMode
          ? "0 16px 30px rgba(0, 0, 0, 0.3)"
          : "0 16px 30px rgba(174, 130, 28, 0.24)",
      },
      "@media (max-height: 860px)": {
        minHeight: 40,
        px: 1.75,
      },
    },
    refreshingLabel: {
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      opacity: 0.92,
      color: isDarkMode
        ? "rgba(200, 212, 255, 0.68)"
        : "rgba(243, 250, 255, 0.72)",
    },
    warningAlert: {
      borderRadius: "8px",
      bgcolor: isDarkMode
        ? "rgba(120, 89, 20, 0.22)"
        : "rgba(255, 214, 118, 0.22)",
      color: "#fff9eb",
      border: isDarkMode
        ? "1px solid rgba(255, 214, 118, 0.18)"
        : "1px solid rgba(255, 214, 118, 0.26)",
    },
    errorAlert: {
      borderRadius: "8px",
      bgcolor: isDarkMode ? "rgba(79, 18, 28, 0.42)" : "rgba(194, 59, 59, 0.2)",
      color: "#fff1f1",
      border: isDarkMode
        ? "1px solid rgba(255, 156, 156, 0.12)"
        : "1px solid rgba(255, 156, 156, 0.18)",
    },
    loadingCard: {
      minHeight: { xs: 320, md: 420 },
      display: "grid",
      placeItems: "center",
      border: isDarkMode
        ? "1px solid rgba(113, 129, 176, 0.2)"
        : "1px solid rgba(255,255,255,0.28)",
      bgcolor: isDarkMode ? "rgba(4, 7, 13, 0.76)" : "rgba(11, 25, 52, 0.22)",
      backdropFilter: "blur(18px)",
      boxShadow: isDarkMode
        ? "0 34px 90px rgba(0, 0, 0, 0.58)"
        : "0 32px 80px rgba(8, 19, 44, 0.22)",
    },
    loadingStack: {
      alignItems: "center",
    },
    loadingLabel: {
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: isDarkMode
        ? "rgba(214, 224, 255, 0.72)"
        : "rgba(243, 250, 255, 0.78)",
    },
    resultCard: {
      overflow: "hidden",
      ...resultSurface,
    },
  };
}
