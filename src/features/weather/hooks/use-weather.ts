"use client";

import { useQuery } from "@tanstack/react-query";
import { getForecast, searchCities } from "@/features/weather/lib/weather-api";
import { CityOption } from "@/features/weather/types";

export function useCitySearch(searchTerm: string) {
  return useQuery({
    queryKey: ["city-search", searchTerm],
    queryFn: () => searchCities(searchTerm),
    enabled: searchTerm.length >= 2,
    staleTime: 1000 * 60 * 10,
  });
}

type UseWeatherInput = {
  city: CityOption;
};

export function useWeather({ city }: UseWeatherInput) {
  return useQuery({
    queryKey: [
      "weather-forecast",
      city.id,
      city.name,
      city.admin1,
      city.country,
      city.latitude,
      city.longitude,
    ],
    queryFn: () => getForecast({ city }),
    staleTime: 1000 * 60 * 5,
  });
}
