"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useCitySearch, useWeather } from "@/features/weather/hooks/use-weather";

const { searchCitiesMock, getForecastMock } = vi.hoisted(() => ({
  searchCitiesMock: vi.fn(),
  getForecastMock: vi.fn(),
}));

vi.mock("@/features/weather/lib/weather-api", () => ({
  searchCities: searchCitiesMock,
  getForecast: getForecastMock,
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

afterEach(() => {
  searchCitiesMock.mockReset();
  getForecastMock.mockReset();
});

describe("useCitySearch", () => {
  it("does not fetch cities for short search terms", () => {
    renderHook(() => useCitySearch("s"), {
      wrapper: createWrapper(),
    });

    expect(searchCitiesMock).not.toHaveBeenCalled();
  });

  it("fetches cities when the search term has at least two characters", async () => {
    searchCitiesMock.mockResolvedValue([
      {
        id: 1,
        name: "Sao Paulo",
        latitude: -23.55,
        longitude: -46.63,
        country: "Brasil",
        admin1: "SP",
      },
    ]);

    const { result } = renderHook(() => useCitySearch("sa"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toHaveLength(1);
    });

    expect(searchCitiesMock).toHaveBeenCalledWith("sa");
  });
});

describe("useWeather", () => {
  it("fetches the forecast for the selected city", async () => {
    getForecastMock.mockResolvedValue({
      cityLabel: "Sao Paulo, SP, Brasil",
      currentTime: "2026-04-14T12:37",
      isDay: true,
      temperature: 26,
      feelsLike: 27,
      humidity: 80,
      windSpeed: 10,
      pressure: 1014,
      sunrise: "2026-04-14T05:48",
      sunset: "2026-04-14T17:56",
      precipitationChance: 35,
      weatherCode: 2,
      unitSymbol: "C",
      windSpeedUnit: "km/h",
      daily: [],
    });

    const city = {
      id: 1,
      name: "Sao Paulo",
      latitude: -23.55,
      longitude: -46.63,
      country: "Brasil",
      admin1: "SP",
    };

    const { result } = renderHook(() => useWeather({ city }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data?.cityLabel).toBe("Sao Paulo, SP, Brasil");
    });

    expect(getForecastMock).toHaveBeenCalledWith({ city });
  });
});
