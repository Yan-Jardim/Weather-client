import { Box, Chip, Stack, Typography } from "@mui/material";
import WeatherIcon from "@/features/weather/components/weather-icon";
import { WeatherForecast } from "@/features/weather/types";
import {
  formatCalendarLabel,
  formatClockTime,
  formatTemperature,
} from "@/features/weather/utils/formatters";
import { getWeatherLabel } from "@/features/weather/utils/weather-code";
import {
  getWeatherDetailItems,
  getWeatherHighlightItems,
  WEATHER_SUMMARY_COPY,
} from "./constants";
import { getWeatherSummaryStyles } from "./styles";

type WeatherSummaryProps = {
  weather: WeatherForecast;
  isNightTheme?: boolean;
};

export default function WeatherSummary({
  weather,
  isNightTheme = false,
}: WeatherSummaryProps) {
  const styles = getWeatherSummaryStyles(isNightTheme);
  const weatherConditionLabel = getWeatherLabel(weather.weatherCode).toUpperCase();
  const weatherDetails = getWeatherDetailItems(weather);
  const weatherHighlights = getWeatherHighlightItems(weather);
  const periodLabel = weather.isDay
    ? WEATHER_SUMMARY_COPY.dayLabel
    : WEATHER_SUMMARY_COPY.nightLabel;

  return (
    <Box sx={styles.root}>
      <Box aria-hidden sx={styles.overlay} />
      <Box aria-hidden className="weather-float" sx={styles.floatingCloud} />
      <Box
        aria-hidden
        className="weather-float-delayed"
        sx={styles.floatingCloudDelayed}
      />

      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={{ xs: 2.25, lg: 1.9 }}
        sx={styles.content}
      >
        <Stack spacing={1.45} sx={styles.cityColumn}>
          <Box>
            <Typography sx={styles.cityEyebrow}>
              {WEATHER_SUMMARY_COPY.cityLabel}
            </Typography>
            <Typography sx={styles.cityName}>{weather.cityLabel}</Typography>
          </Box>

          <Stack direction="row" spacing={0.75} sx={styles.chips}>
            <Chip
              label={formatCalendarLabel(weather.currentTime)}
              size="small"
              sx={styles.chip}
            />
            <Chip
              label={formatClockTime(weather.currentTime)}
              size="small"
              sx={styles.chip}
            />
            <Chip
              label={periodLabel}
              size="small"
              sx={styles.chip}
            />
          </Stack>

          <Box>
            <Typography sx={styles.conditionLabel}>
              {weatherConditionLabel}
            </Typography>
            <Typography sx={styles.description}>
              {WEATHER_SUMMARY_COPY.description}
            </Typography>
          </Box>
        </Stack>

        <Box sx={styles.iconColumn}>
          <Box className="weather-sheen" sx={styles.iconWrap}>
            <WeatherIcon
              code={weather.weatherCode}
              isDay={weather.isDay}
              size={118}
            />
          </Box>
        </Box>

        <Stack spacing={1.35} sx={styles.metricsColumn}>
          <Box>
            <Typography aria-label="temperatura atual" sx={styles.temperatureValue}>
              {formatTemperature(weather.temperature, { withPlus: true })}
              <Box component="span" sx={styles.temperatureUnit}>
                {"\u00b0"}
                {weather.unitSymbol}
              </Box>
            </Typography>
            <Typography sx={styles.temperatureCaption}>
              {WEATHER_SUMMARY_COPY.currentLabel}
            </Typography>
          </Box>

          <Stack spacing={0.8} sx={styles.detailsList}>
            {weatherDetails.map((row) => {
              const DetailIcon = row.icon.Icon;

              return (
                <Stack key={row.label} direction="row" spacing={0.9} sx={styles.detailRow}>
                  <Stack direction="row" spacing={1} sx={styles.detailMeta}>
                    <Box sx={styles.detailIconBox}>
                      <DetailIcon
                        sx={{
                          fontSize: row.icon.size,
                          color: row.icon.color,
                        }}
                      />
                    </Box>
                    <Typography sx={styles.detailLabel}>{row.label}</Typography>
                  </Stack>
                  <Typography sx={styles.detailValue}>{row.value}</Typography>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Stack>

      <Box sx={styles.statsGrid}>
        {weatherHighlights.map((stat) => {
          const HighlightIcon = stat.icon.Icon;

          return (
            <Box key={stat.label} sx={styles.statCard}>
              <Stack direction="row" spacing={1.1} sx={styles.statContent}>
                <Box sx={styles.statIconBox}>
                  <HighlightIcon
                    sx={{
                      fontSize: stat.icon.size,
                      color: stat.icon.color,
                    }}
                  />
                </Box>
                <Box>
                  <Typography sx={styles.statLabel}>{stat.label}</Typography>
                  <Typography sx={styles.statValue}>{stat.value}</Typography>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
