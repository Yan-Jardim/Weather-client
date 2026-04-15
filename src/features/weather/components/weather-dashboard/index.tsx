"use client";

import MyLocationIcon from "@mui/icons-material/MyLocationRounded";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import CitySelector from "@/features/weather/components/city-selector";
import ForecastList from "@/features/weather/components/forecast-list";
import UnitToggle from "@/features/weather/components/unit-toggle";
import WeatherSummary from "@/features/weather/components/weather-summary";
import { useWeather } from "@/features/weather/hooks/use-weather";
import { reverseGeocodeLocation } from "@/features/weather/lib/weather-api";
import { CityOption, TemperatureUnit } from "@/features/weather/types";
import {
  createLocationFallback,
  getCurrentPosition,
} from "@/features/weather/utils/location";
import {
  readRecentCities,
  saveRecentCity,
} from "@/features/weather/utils/recent-cities";
import { convertWeatherForecastUnits } from "@/features/weather/utils/unit-conversion";
import { useThemeMode } from "@/theme/theme-mode-provider";
import {
  DEFAULT_CITY,
  GEOLOCATION_OPTIONS,
  WEATHER_DASHBOARD_COPY,
} from "./constants";
import { getWeatherDashboardStyles } from "./styles";

export default function WeatherDashboard() {
  const [unit, setUnit] = useState<TemperatureUnit>("celsius");
  const [selectedCity, setSelectedCity] = useState<CityOption>(DEFAULT_CITY);
  const [recentCities, setRecentCities] = useState<CityOption[]>(() =>
    readRecentCities(),
  );
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const { isDarkMode, syncThemeMode } = useThemeMode();

  const { data, isLoading, isError, refetch, isFetching } = useWeather({
    city: selectedCity,
  });
  const displayWeather = useMemo(
    () => (data ? convertWeatherForecastUnits(data, unit) : null),
    [data, unit],
  );
  const loading = isLoading || isFetching;
  const isRefreshingPanel = loading && Boolean(displayWeather);
  const isInitialLoading = loading && !data;
  const styles = getWeatherDashboardStyles(isDarkMode);

  useEffect(() => {
    if (!displayWeather) {
      return;
    }

    syncThemeMode(!displayWeather.isDay);
  }, [displayWeather, syncThemeMode]);

  const handleCitySelect = (city: CityOption) => {
    setRecentCities(saveRecentCity(city));
    setSelectedCity(city);
  };

  const handleCurrentLocation = async () => {
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError(WEATHER_DASHBOARD_COPY.geolocationUnsupported);
      return;
    }

    setIsLocating(true);

    try {
      const position = await getCurrentPosition(GEOLOCATION_OPTIONS);
      const { latitude, longitude } = position.coords;

      try {
        const location = await reverseGeocodeLocation({
          latitude,
          longitude,
        });

        handleCitySelect(location);
      } catch {
        handleCitySelect(
          createLocationFallback({
            latitude,
            longitude,
            name: WEATHER_DASHBOARD_COPY.currentLocation,
            country: "Atual",
          }),
        );
        setLocationError(WEATHER_DASHBOARD_COPY.reverseGeocodeFallback);
      }
    } catch {
      setLocationError(WEATHER_DASHBOARD_COPY.locationUnavailable);
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Stack spacing={{ xs: 2.25, md: 2.75 }} sx={styles.content}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1.25}
          sx={styles.header}
        >
          <Box sx={styles.heroCopy}>
            <Typography component="h1" sx={styles.title}>
              {WEATHER_DASHBOARD_COPY.title}
            </Typography>
          </Box>
        </Stack>

        <Paper elevation={0} sx={styles.controlPanel}>
          <Stack spacing={1.6}>
            <Stack
              spacing={1.2}
              direction={{ xs: "column", lg: "row" }}
              sx={styles.controlsRow}
            >
              <Box sx={styles.selectorBox}>
                <CitySelector
                  selectedCity={selectedCity}
                  onSelectCity={handleCitySelect}
                  recentCities={recentCities}
                  isDarkMode={isDarkMode}
                />
              </Box>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.1}
                sx={styles.actions}
              >
                <UnitToggle
                  unit={unit}
                  onChangeUnit={setUnit}
                  isDarkMode={isDarkMode}
                />
                <Button
                  variant="contained"
                  startIcon={<MyLocationIcon />}
                  onClick={handleCurrentLocation}
                  disabled={isLocating}
                  sx={styles.locationButton}
                >
                  {isLocating
                    ? WEATHER_DASHBOARD_COPY.locating
                    : WEATHER_DASHBOARD_COPY.currentLocation}
                </Button>
              </Stack>
            </Stack>

            {isRefreshingPanel ? (
              <Typography sx={styles.refreshingLabel}>
                {WEATHER_DASHBOARD_COPY.refreshing}
              </Typography>
            ) : null}

            {locationError ? (
              <Alert severity="warning" sx={styles.warningAlert}>
                {locationError}
              </Alert>
            ) : null}

            {isError ? (
              <Alert
                severity="error"
                action={
                  <Button
                    color="inherit"
                    size="small"
                    onClick={() => refetch()}
                  >
                    {WEATHER_DASHBOARD_COPY.retry}
                  </Button>
                }
                sx={styles.errorAlert}
              >
                {WEATHER_DASHBOARD_COPY.loadError}
              </Alert>
            ) : null}
          </Stack>
        </Paper>

        {isInitialLoading ? (
          <Paper elevation={0} sx={styles.loadingCard}>
            <Stack spacing={2} sx={styles.loadingStack}>
              <CircularProgress thickness={4.5} sx={{ color: "#fff" }} />
              <Typography sx={styles.loadingLabel}>
                {WEATHER_DASHBOARD_COPY.loading}
              </Typography>
            </Stack>
          </Paper>
        ) : null}

        {displayWeather ? (
          <Paper elevation={0} sx={styles.resultCard}>
            <WeatherSummary
              weather={displayWeather}
              isNightTheme={isDarkMode}
            />
            <ForecastList
              days={displayWeather.daily}
              unitSymbol={displayWeather.unitSymbol}
              isNightTheme={isDarkMode}
            />
          </Paper>
        ) : null}
      </Stack>
    </Container>
  );
}
