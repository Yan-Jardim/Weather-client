import { CityOption } from "@/features/weather/types";
import { formatCityLabel, normalizeSearchTerm } from "./formatters";
import { getCityStorageKey } from "./recent-cities";

type BuildCityOptionsInput = {
  selectedCity: CityOption;
  recentCities: CityOption[];
  fetchedCities: CityOption[];
  search: string;
};

export function buildCityOptions({
  selectedCity,
  recentCities,
  fetchedCities,
  search,
}: BuildCityOptionsInput) {
  const normalizedSearch = normalizeSearchTerm(search);
  const matchingRecentCities = recentCities.filter((city) =>
    normalizeSearchTerm(formatCityLabel(city)).includes(normalizedSearch),
  );
  const mergedOptions = [
    selectedCity,
    ...matchingRecentCities,
    ...fetchedCities,
  ];

  return Array.from(
    new Map(
      mergedOptions.map((city) => [getCityStorageKey(city), city]),
    ).values(),
  );
}

export function createRecentCityKeySet(recentCities: CityOption[]) {
  return new Set(recentCities.map((city) => getCityStorageKey(city)));
}
