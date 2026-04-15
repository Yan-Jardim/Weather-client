import { afterEach, describe, expect, it, vi } from "vitest";

const { geoGetMock, appGetMock, weatherGetMock } = vi.hoisted(() => ({
  geoGetMock: vi.fn(),
  appGetMock: vi.fn(),
  weatherGetMock: vi.fn(),
}));

vi.mock("axios", () => ({
  default: {
    create: vi
      .fn()
      .mockReturnValueOnce({ get: geoGetMock })
      .mockReturnValueOnce({ get: appGetMock })
      .mockReturnValueOnce({ get: weatherGetMock }),
  },
}));

import {
  getForecast,
  reverseGeocodeLocation,
  searchCities,
} from "@/features/weather/lib/weather-api";

afterEach(() => {
  geoGetMock.mockReset();
  appGetMock.mockReset();
  weatherGetMock.mockReset();
});

describe("weather-api", () => {
  it("returns an empty array when the city search query is empty", async () => {
    await expect(searchCities("")).resolves.toEqual([]);
    expect(geoGetMock).not.toHaveBeenCalled();
  });

  it("maps geocoding results into city options", async () => {
    geoGetMock.mockResolvedValue({
      data: {
        results: [
          {
            id: 1,
            name: "Sao Paulo",
            latitude: -23.55,
            longitude: -46.63,
            country: "Brasil",
            admin1: "SP",
          },
        ],
      },
    });

    await expect(searchCities("sao")).resolves.toEqual([
      {
        id: 1,
        name: "Sao Paulo",
        latitude: -23.55,
        longitude: -46.63,
        country: "Brasil",
        admin1: "SP",
      },
    ]);
    expect(geoGetMock).toHaveBeenCalledWith("/search", {
      params: {
        name: "sao",
        count: 5,
        language: "pt",
      },
    });
  });

  it("calls the app reverse geocoding route", async () => {
    const location = {
      id: 10,
      name: "Campinas",
      latitude: -22.9,
      longitude: -47.06,
      admin1: "SP",
      country: "Brasil",
    };
    appGetMock.mockResolvedValue({ data: location });

    await expect(
      reverseGeocodeLocation({
        latitude: -22.9,
        longitude: -47.06,
      }),
    ).resolves.toEqual(location);
    expect(appGetMock).toHaveBeenCalledWith("/reverse-geocode", {
      params: {
        latitude: -22.9,
        longitude: -47.06,
      },
    });
  });

  it("maps the forecast response into the application model", async () => {
    weatherGetMock.mockResolvedValue({
      data: {
        current: {
          time: "2026-04-14T12:37",
          is_day: 1,
          temperature_2m: 26.3,
          apparent_temperature: 27.1,
          relative_humidity_2m: 80,
          wind_speed_10m: 10,
          surface_pressure: 1014,
          weather_code: 2,
        },
        daily: {
          time: ["2026-04-14", "2026-04-15"],
          sunrise: ["2026-04-14T05:48", "2026-04-15T05:47"],
          sunset: ["2026-04-14T17:56", "2026-04-15T17:57"],
          weather_code: [2, 61],
          temperature_2m_min: [18.2, 17.4],
          temperature_2m_max: [26.3, 24.8],
          precipitation_probability_max: [35, null],
        },
      },
    });

    await expect(
      getForecast({
        city: {
          id: 1,
          name: "Sao Paulo",
          latitude: -23.55,
          longitude: -46.63,
          admin1: "SP",
          country: "Brasil",
        },
      }),
    ).resolves.toEqual({
      cityLabel: "Sao Paulo, SP, Brasil",
      currentTime: "2026-04-14T12:37",
      isDay: true,
      temperature: 26.3,
      feelsLike: 27.1,
      humidity: 80,
      windSpeed: 10,
      pressure: 1014,
      sunrise: "2026-04-14T05:48",
      sunset: "2026-04-14T17:56",
      precipitationChance: 35,
      weatherCode: 2,
      unitSymbol: "C",
      windSpeedUnit: "km/h",
      daily: [
        {
          date: "2026-04-14",
          weatherCode: 2,
          min: 18.2,
          max: 26.3,
          precipitationChance: 35,
        },
        {
          date: "2026-04-15",
          weatherCode: 61,
          min: 17.4,
          max: 24.8,
          precipitationChance: 0,
        },
      ],
    });

    expect(weatherGetMock).toHaveBeenCalledWith("/forecast", {
      params: {
        latitude: -23.55,
        longitude: -46.63,
        current:
          "is_day,temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,surface_pressure",
        daily:
          "weather_code,temperature_2m_min,temperature_2m_max,sunrise,sunset,precipitation_probability_max",
        temperature_unit: "celsius",
        wind_speed_unit: "kmh",
        timezone: "auto",
        forecast_days: 7,
      },
    });
  });
});
