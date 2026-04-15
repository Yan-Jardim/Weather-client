import { SxProps, Theme } from "@mui/material/styles";

function getBottomBorder(index: number, daysLength: number, columns: number) {
  const lastRowCount = daysLength % columns || columns;
  return index < daysLength - lastRowCount ? "1px solid rgba(255,255,255,0.1)" : "none";
}

type ForecastListStyles = {
  root: SxProps<Theme>;
  header: SxProps<Theme>;
  headerTitle: SxProps<Theme>;
  headerSubtitle: SxProps<Theme>;
  grid: SxProps<Theme>;
  getDayCard: (index: number) => SxProps<Theme>;
  dayStack: SxProps<Theme>;
  dayName: SxProps<Theme>;
  dayDate: SxProps<Theme>;
  maxTemp: SxProps<Theme>;
  minTemp: SxProps<Theme>;
  precipitation: SxProps<Theme>;
};

export function getForecastListStyles(
  isNightTheme: boolean,
  daysLength: number,
): ForecastListStyles {
  const forecastBorderColor = isNightTheme
    ? "rgba(125, 145, 202, 0.16)"
    : "rgba(168, 198, 255, 0.16)";
  const forecastDividerColor = isNightTheme
    ? "rgba(125, 145, 202, 0.14)"
    : "rgba(168, 198, 255, 0.12)";
  const forecastBottomColor = isNightTheme
    ? "rgba(125, 145, 202, 0.12)"
    : "rgba(168, 198, 255, 0.1)";
  const forecastBackground = isNightTheme
    ? "linear-gradient(180deg, rgba(6, 9, 15, 0.96) 0%, rgba(3, 5, 9, 0.99) 100%)"
    : "linear-gradient(180deg, rgba(42, 67, 115, 0.95) 0%, rgba(31, 49, 84, 0.98) 100%)";
  const forecastHighlight = isNightTheme
    ? "rgba(142, 169, 255, 0.08)"
    : "rgba(194, 221, 255, 0.1)";

  return {
    root: {
      borderTop: `1px solid ${forecastBorderColor}`,
      background: forecastBackground,
      backdropFilter: "blur(16px)",
    },
    header: {
      px: { xs: 1.25, md: 1.6 },
      py: { xs: 1.15, md: 1.25 },
      justifyContent: "space-between",
      alignItems: { sm: "center" },
      borderBottom: `1px solid ${forecastDividerColor}`,
    },
    headerTitle: {
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "rgba(248, 251, 255, 0.82)",
    },
    headerSubtitle: {
      fontSize: 12,
      color: "rgba(248, 251, 255, 0.68)",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: {
        xs: "repeat(2, minmax(0, 1fr))",
        sm: "repeat(4, minmax(0, 1fr))",
        lg: `repeat(${daysLength}, minmax(0, 1fr))`,
      },
      "@media (max-height: 860px)": {
        gridTemplateColumns: {
          xs: "repeat(2, minmax(0, 1fr))",
          sm: "repeat(4, minmax(0, 1fr))",
          lg: `repeat(${daysLength}, minmax(0, 1fr))`,
        },
      },
    },
    getDayCard: (index: number) => ({
      px: { xs: 1.25, md: 1.45 },
      py: { xs: 1.15, md: 1.3 },
      borderRight: {
        lg:
          index === daysLength - 1
            ? "none"
            : `1px solid ${forecastDividerColor}`,
      },
      borderBottom: {
        xs: getBottomBorder(index, daysLength, 2).replace(
          "rgba(255,255,255,0.1)",
          forecastBottomColor,
        ),
        sm: getBottomBorder(index, daysLength, 4).replace(
          "rgba(255,255,255,0.1)",
          forecastBottomColor,
        ),
        lg: "none",
      },
      bgcolor: index === 0 ? forecastHighlight : "transparent",
      "@media (max-height: 860px)": {
        px: { xs: 1.15, md: 1.2 },
        py: { xs: 1, md: 1.05 },
      },
    }),
    dayStack: {
      alignItems: "center",
      textAlign: "center",
    },
    dayName: {
      fontSize: 9.5,
      fontWeight: 800,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "rgba(248, 251, 255, 0.78)",
    },
    dayDate: {
      fontSize: 10,
      color: "rgba(248, 251, 255, 0.66)",
    },
    maxTemp: {
      fontSize: 16,
      fontWeight: 800,
      color: "#fff",
    },
    minTemp: {
      fontSize: 12,
      color: "rgba(248, 251, 255, 0.72)",
    },
    precipitation: {
      fontSize: 9.5,
      color: "rgba(148, 215, 255, 0.88)",
    },
  };
}
