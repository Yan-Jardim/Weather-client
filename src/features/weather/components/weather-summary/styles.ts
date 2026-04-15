import { SxProps, Theme } from "@mui/material/styles";

type WeatherSummaryStyles = {
  root: SxProps<Theme>;
  overlay: SxProps<Theme>;
  floatingCloud: SxProps<Theme>;
  floatingCloudDelayed: SxProps<Theme>;
  content: SxProps<Theme>;
  cityColumn: SxProps<Theme>;
  cityEyebrow: SxProps<Theme>;
  cityName: SxProps<Theme>;
  chips: SxProps<Theme>;
  chip: SxProps<Theme>;
  conditionLabel: SxProps<Theme>;
  description: SxProps<Theme>;
  iconColumn: SxProps<Theme>;
  iconWrap: SxProps<Theme>;
  metricsColumn: SxProps<Theme>;
  temperatureValue: SxProps<Theme>;
  temperatureUnit: SxProps<Theme>;
  temperatureCaption: SxProps<Theme>;
  detailsList: SxProps<Theme>;
  detailRow: SxProps<Theme>;
  detailMeta: SxProps<Theme>;
  detailIconBox: SxProps<Theme>;
  detailLabel: SxProps<Theme>;
  detailValue: SxProps<Theme>;
  statsGrid: SxProps<Theme>;
  statCard: SxProps<Theme>;
  statContent: SxProps<Theme>;
  statIconBox: SxProps<Theme>;
  statLabel: SxProps<Theme>;
  statValue: SxProps<Theme>;
};

export function getWeatherSummaryStyles(
  isNightTheme: boolean,
): WeatherSummaryStyles {
  const heroBackground = isNightTheme
    ? "linear-gradient(135deg, #0d1322 0%, #090d16 42%, #03050a 100%)"
    : "linear-gradient(135deg, #6b98df 0%, #4f77bb 46%, #314a77 100%)";
  const heroOverlay = isNightTheme
    ? "radial-gradient(circle at 18% 18%, rgba(182, 199, 255, 0.16) 0%, transparent 24%), radial-gradient(circle at 78% 14%, rgba(255,255,255,0.06) 0%, transparent 20%), linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)"
    : "radial-gradient(circle at 20% 18%, rgba(255, 226, 127, 0.28) 0%, transparent 24%), radial-gradient(circle at 76% 14%, rgba(255,255,255,0.12) 0%, transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 100%)";
  const glassBackground = isNightTheme
    ? "rgba(8, 12, 20, 0.48)"
    : "rgba(10, 24, 54, 0.16)";
  const glassBorder = isNightTheme
    ? "1px solid rgba(127, 145, 196, 0.14)"
    : "1px solid rgba(255,255,255,0.14)";
  const chipBackground = isNightTheme
    ? "rgba(7, 11, 18, 0.7)"
    : "rgba(8, 20, 46, 0.18)";
  const sectionLabelColor = "rgba(248, 251, 255, 0.74)";
  const mutedTextColor = "rgba(248, 251, 255, 0.8)";
  const iconSurfaceColor = isNightTheme
    ? "rgba(142, 169, 255, 0.12)"
    : "rgba(255,255,255,0.11)";
  const statSurfaceColor = isNightTheme
    ? "rgba(7, 11, 18, 0.58)"
    : "rgba(8, 20, 46, 0.16)";

  return {
    root: {
      position: "relative",
      overflow: "hidden",
      px: { xs: 2, md: 2.8 },
      pt: { xs: 2.1, md: 2.5 },
      pb: { xs: 2.2, md: 2.45 },
      color: "#f8fbff",
      background: heroBackground,
      "@media (max-height: 860px)": {
        px: { xs: 1.8, md: 2.2 },
        pt: { xs: 1.8, md: 1.9 },
        pb: { xs: 1.9, md: 2 },
      },
    },
    overlay: {
      position: "absolute",
      inset: 0,
      background: heroOverlay,
    },
    floatingCloud: {
      position: "absolute",
      top: { xs: 78, md: 92 },
      left: { xs: "52%", md: "47%" },
      width: { xs: 120, md: 154 },
      height: { xs: 32, md: 40 },
      borderRadius: "10px",
      background: isNightTheme
        ? "rgba(188, 203, 255, 0.08)"
        : "rgba(255,255,255,0.12)",
      transform: "translateX(-50%)",
      filter: "blur(1px)",
    },
    floatingCloudDelayed: {
      position: "absolute",
      top: { xs: 98, md: 116 },
      left: { xs: "60%", md: "56%" },
      width: { xs: 78, md: 102 },
      height: { xs: 24, md: 30 },
      borderRadius: "10px",
      background: isNightTheme
        ? "rgba(188, 203, 255, 0.07)"
        : "rgba(255,255,255,0.1)",
      transform: "translateX(-50%)",
    },
    content: {
      position: "relative",
      justifyContent: "space-between",
      alignItems: { lg: "center" },
    },
    cityColumn: {
      flex: 1.05,
      maxWidth: 430,
    },
    cityEyebrow: {
      fontSize: 10,
      letterSpacing: "0.28em",
      textTransform: "uppercase",
      color: sectionLabelColor,
    },
    cityName: {
      mt: 0.45,
      fontFamily: "var(--font-display), sans-serif",
      fontSize: { xs: 32, md: 38, lg: 40 },
      lineHeight: 0.88,
      letterSpacing: "-0.03em",
      "@media (max-height: 860px)": {
        fontSize: { xs: 30, md: 34, lg: 36 },
      },
    },
    chips: {
      flexWrap: "wrap",
      rowGap: 0.75,
    },
    chip: {
      bgcolor: chipBackground,
      color: "#f8fbff",
      fontWeight: 800,
      height: 25,
      fontSize: 11,
      letterSpacing: "0.08em",
    },
    conditionLabel: {
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: sectionLabelColor,
    },
    description: {
      mt: 0.55,
      maxWidth: 320,
      fontSize: { xs: 13.25, md: 14 },
      lineHeight: 1.5,
      color: mutedTextColor,
    },
    iconColumn: {
      flex: 0.85,
      display: "flex",
      justifyContent: "center",
      minHeight: { xs: 110, md: 138, lg: 150 },
    },
    iconWrap: {
      display: "grid",
      placeItems: "center",
    },
    metricsColumn: {
      flex: 1,
      alignItems: { xs: "flex-start", lg: "flex-end" },
      textAlign: { xs: "left", lg: "right" },
    },
    temperatureValue: {
      fontFamily: "var(--font-display), sans-serif",
      fontSize: { xs: 60, md: 76, lg: 84 },
      lineHeight: 0.82,
      letterSpacing: "-0.06em",
      textShadow: "0 18px 40px rgba(8, 19, 44, 0.18)",
      "@media (max-height: 860px)": {
        fontSize: { xs: 54, md: 68, lg: 74 },
      },
    },
    temperatureUnit: {
      ml: 0.6,
      verticalAlign: "top",
      fontSize: { xs: 24, md: 30, lg: 32 },
      lineHeight: 1,
    },
    temperatureCaption: {
      mt: 0.5,
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: sectionLabelColor,
    },
    detailsList: {
      width: "100%",
      maxWidth: 272,
    },
    detailRow: {
      alignItems: "center",
      justifyContent: { xs: "flex-start", lg: "space-between" },
      px: 1.2,
      py: 0.75,
      borderRadius: "10px",
      border: glassBorder,
      bgcolor: glassBackground,
      backdropFilter: "blur(12px)",
    },
    detailMeta: {
      alignItems: "center",
    },
    detailIconBox: {
      width: 24,
      height: 24,
      borderRadius: "10px",
      display: "grid",
      placeItems: "center",
      bgcolor: iconSurfaceColor,
    },
    detailLabel: {
      fontSize: 9.5,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: sectionLabelColor,
    },
    detailValue: {
      fontSize: 13,
      fontWeight: 800,
    },
    statsGrid: {
      position: "relative",
      mt: { xs: 2, md: 2.2 },
      display: "grid",
      gridTemplateColumns: {
        xs: "repeat(2, minmax(0, 1fr))",
        md: "repeat(4, minmax(0, 1fr))",
      },
      gap: 0.9,
    },
    statCard: {
      px: 1.25,
      py: 1.05,
      borderRadius: "10px",
      border: isNightTheme
        ? "1px solid rgba(127, 145, 196, 0.13)"
        : "1px solid rgba(255,255,255,0.14)",
      bgcolor: statSurfaceColor,
      backdropFilter: "blur(10px)",
    },
    statContent: {
      alignItems: "center",
    },
    statIconBox: {
      width: 28,
      height: 28,
      borderRadius: "10px",
      display: "grid",
      placeItems: "center",
      bgcolor: iconSurfaceColor,
    },
    statLabel: {
      fontSize: 9,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: sectionLabelColor,
    },
    statValue: {
      mt: 0.1,
      fontSize: 15,
      fontWeight: 800,
    },
  };
}
