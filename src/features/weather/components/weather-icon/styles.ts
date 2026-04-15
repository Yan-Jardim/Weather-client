import { SxProps, Theme } from "@mui/material/styles";

type WeatherIconStyleInput = {
  code: number;
  compact: boolean;
  size: number;
  frameSize: number;
  halo: string;
};

type WeatherIconStyles = {
  root: SxProps<Theme>;
  halo: SxProps<Theme>;
  frame: SxProps<Theme>;
  icon: SxProps<Theme>;
  trailingCloud: SxProps<Theme>;
};

export function getWeatherIconStyles({
  code,
  compact,
  size,
  frameSize,
  halo,
}: WeatherIconStyleInput): WeatherIconStyles {
  return {
    root: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: frameSize,
      height: frameSize,
      flexShrink: 0,
    },
    halo: {
      position: "absolute",
      inset: 0,
      borderRadius: "10px",
      background: `radial-gradient(circle, ${halo} 0%, transparent 72%)`,
      filter: "blur(6px)",
    },
    frame: {
      position: "absolute",
      width: frameSize - 18,
      height: frameSize - 18,
      borderRadius: "10px",
      border: "1px solid rgba(255,255,255,0.14)",
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 100%)",
    },
    icon: {
      position: "relative",
      fontSize: size,
      filter: compact ? "none" : `drop-shadow(0 10px 24px ${halo})`,
    },
    trailingCloud: {
      position: "absolute",
      bottom: 8,
      right: 8,
      fontSize: size * 0.42,
      color: "rgba(255,255,255,0.78)",
      display: compact || code > 3 ? "none" : "block",
    },
  };
}
