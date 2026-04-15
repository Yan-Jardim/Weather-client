import { CityOption } from "@/features/weather/types";

const RECENT_CITIES_KEY = "weather-client-recent-cities";
const MAX_RECENT_CITIES = 5;

function isValidCityOption(value: unknown): value is CityOption {
  if (!value || typeof value !== "object") {
    return false;
  }

  const city = value as Partial<CityOption>;

  return (
    typeof city.id === "number" &&
    typeof city.name === "string" &&
    typeof city.latitude === "number" &&
    typeof city.longitude === "number"
  );
}

export function getCityStorageKey(city: CityOption) {
  return `${city.id}-${city.latitude}-${city.longitude}`;
}

export function readRecentCities(): CityOption[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(RECENT_CITIES_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isValidCityOption).slice(0, MAX_RECENT_CITIES);
  } catch {
    return [];
  }
}

export function saveRecentCity(city: CityOption): CityOption[] {
  if (typeof window === "undefined") {
    return [];
  }

  const nextRecentCities = [
    city,
    ...readRecentCities().filter(
      (recentCity) => getCityStorageKey(recentCity) !== getCityStorageKey(city),
    ),
  ].slice(0, MAX_RECENT_CITIES);

  window.localStorage.setItem(RECENT_CITIES_KEY, JSON.stringify(nextRecentCities));

  return nextRecentCities;
}
