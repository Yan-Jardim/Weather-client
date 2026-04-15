"use client";

import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { Autocomplete, Box, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useCitySearch } from "@/features/weather/hooks/use-weather";
import { CityOption } from "@/features/weather/types";
import {
  formatCityLabel,
  formatCityMetaLabel,
  normalizeSearchTerm,
} from "@/features/weather/utils/formatters";
import { getCityStorageKey } from "@/features/weather/utils/recent-cities";
import {
  CITY_SEARCH_MIN_LENGTH,
  CITY_SELECTOR_COPY,
} from "./constants";
import { getCitySelectorStyles } from "./styles";

type CitySelectorProps = {
  selectedCity: CityOption;
  onSelectCity: (city: CityOption) => void;
  recentCities?: CityOption[];
  isDarkMode?: boolean;
};

function getCityKey(city: CityOption) {
  return getCityStorageKey(city);
}

export default function CitySelector({
  selectedCity,
  onSelectCity,
  recentCities = [],
  isDarkMode = false,
}: CitySelectorProps) {
  const [search, setSearch] = useState("");
  const { data = [], isLoading } = useCitySearch(search);
  const styles = getCitySelectorStyles(isDarkMode);

  const options = useMemo(() => {
    const normalizedSearch = normalizeSearchTerm(search);
    const matchingRecentCities = recentCities.filter((city) =>
      normalizeSearchTerm(formatCityLabel(city)).includes(normalizedSearch),
    );
    const mergedOptions = [selectedCity, ...matchingRecentCities, ...data];

    return Array.from(
      new Map(mergedOptions.map((city) => [getCityKey(city), city])).values(),
    );
  }, [data, recentCities, search, selectedCity]);

  const recentCityKeys = useMemo(
    () => new Set(recentCities.map((city) => getCityKey(city))),
    [recentCities],
  );

  return (
    <Autocomplete
      fullWidth
      openOnFocus
      options={options}
      filterOptions={(optionList) => optionList}
      getOptionKey={(option) => getCityKey(option)}
      slotProps={{
        paper: {
          sx: styles.paper,
        },
        popper: {
          sx: styles.popper,
        },
      }}
      getOptionLabel={(option) => formatCityLabel(option)}
      value={selectedCity}
      noOptionsText={
        search.length < CITY_SEARCH_MIN_LENGTH
          ? CITY_SELECTOR_COPY.emptySearch
          : CITY_SELECTOR_COPY.noResults
      }
      loadingText={CITY_SELECTOR_COPY.loading}
      onChange={(_, value) => {
        if (value) {
          onSelectCity(value);
        }
      }}
      onInputChange={(_, value, reason) => {
        if (reason === "input") {
          setSearch(value);
          return;
        }

        if (reason === "clear" || reason === "reset") {
          setSearch("");
        }
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      loading={isLoading}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        const isRecentOption = recentCityKeys.has(getCityKey(option));

        return (
          <Box
            component="li"
            key={key}
            {...optionProps}
            sx={styles.option}
          >
            <Stack direction="row" spacing={1.25} sx={styles.optionRow}>
              <LocationOnRoundedIcon sx={styles.optionIcon} />
              <Box>
                <Stack direction="row" spacing={0.8} sx={styles.optionHeader}>
                  <Typography sx={styles.optionTitle}>{option.name}</Typography>
                  {isRecentOption ? (
                    <Typography sx={styles.recentBadge}>
                      {CITY_SELECTOR_COPY.recentBadge}
                    </Typography>
                  ) : null}
                </Stack>
                <Typography sx={styles.optionSubtitle}>
                  {formatCityMetaLabel(option)}
                </Typography>
              </Box>
            </Stack>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={CITY_SELECTOR_COPY.label}
          placeholder={CITY_SELECTOR_COPY.placeholder}
          slotProps={{
            ...params.slotProps,
            input: {
              ...params.slotProps.input,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress size={18} /> : null}
                  {params.slotProps.input?.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
      sx={styles.root}
    />
  );
}
