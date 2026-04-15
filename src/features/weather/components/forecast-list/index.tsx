import { Box, Stack, Typography } from "@mui/material";
import WeatherIcon from "@/features/weather/components/weather-icon";
import { ForecastDay } from "@/features/weather/types";
import {
  formatShortDateLabel,
  formatTemperature,
  formatWeekdayLabel,
} from "@/features/weather/utils/formatters";
import { FORECAST_LIST_COPY } from "./constants";
import { getForecastListStyles } from "./styles";

type ForecastListProps = {
  days: ForecastDay[];
  unitSymbol: string;
  isNightTheme?: boolean;
};

export default function ForecastList({
  days,
  unitSymbol,
  isNightTheme = false,
}: ForecastListProps) {
  const styles = getForecastListStyles(isNightTheme, days.length);

  return (
    <Box sx={styles.root}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={0.5} sx={styles.header}>
        <Typography sx={styles.headerTitle}>
          {FORECAST_LIST_COPY.title}
        </Typography>
        <Typography sx={styles.headerSubtitle}>
          {FORECAST_LIST_COPY.subtitle}
        </Typography>
      </Stack>

      <Box sx={styles.grid}>
        {days.map((day, index) => (
          <Box key={day.date} sx={styles.getDayCard(index)}>
            <Stack spacing={0.45} sx={styles.dayStack}>
              <Typography sx={styles.dayName}>
                {formatWeekdayLabel(day.date)}
              </Typography>
              <Typography sx={styles.dayDate}>
                {formatShortDateLabel(day.date)}
              </Typography>
              <WeatherIcon code={day.weatherCode} size={22} compact />
              <Typography sx={styles.maxTemp}>
                {formatTemperature(day.max)}
                {`\u00b0${unitSymbol}`}
              </Typography>
              <Typography sx={styles.minTemp}>
                {formatTemperature(day.min)}
                {`\u00b0${unitSymbol}`}
              </Typography>
              <Typography sx={styles.precipitation}>
                {`${Math.round(day.precipitationChance)}% ${FORECAST_LIST_COPY.precipitationSuffix}`}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
