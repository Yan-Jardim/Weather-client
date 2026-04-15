import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import { Box } from "@mui/material";
import {
  getWeatherVisual,
  WEATHER_ICON_FRAME_SIZE_OFFSET,
} from "./constants";
import { getWeatherIconStyles } from "./styles";

type WeatherIconProps = {
  code: number;
  isDay?: boolean;
  size?: number;
  compact?: boolean;
};

export default function WeatherIcon({
  code,
  isDay = true,
  size = 48,
  compact = false,
}: WeatherIconProps) {
  const { Icon, color, halo } = getWeatherVisual(code, isDay);
  const frameSize = compact ? size : size + WEATHER_ICON_FRAME_SIZE_OFFSET;
  const styles = getWeatherIconStyles({
    code,
    compact,
    size,
    frameSize,
    halo,
  });

  return (
    <Box component="span" sx={styles.root}>
      {!compact ? (
        <>
          <Box aria-hidden sx={styles.halo} />
          <Box aria-hidden className="weather-float" sx={styles.frame} />
        </>
      ) : null}
      <Icon
        sx={{
          color,
          ...styles.icon,
        }}
      />
      {!compact && code <= 3 ? (
        <CloudRoundedIcon
          className="weather-float-delayed"
          sx={styles.trailingCloud}
        />
      ) : null}
    </Box>
  );
}
