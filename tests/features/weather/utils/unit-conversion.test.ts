import { describe, expect, it } from "vitest";
import { convertWeatherForecastUnits } from "@/features/weather/utils/unit-conversion";

const baseWeather = {
  cityLabel: "Sao Paulo, SP, Brasil",
  currentTime: "2026-04-14T12:37",
  isDay: true,
  temperature: 20,
  feelsLike: 22,
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
      min: 10,
      max: 20,
      precipitationChance: 35,
    },
  ],
} as const;

describe("convertWeatherForecastUnits", () => {
  it("converts temperatures and wind speed to fahrenheit and mph", () => {
    const result = convertWeatherForecastUnits(baseWeather, "fahrenheit");

    expect(result.temperature).toBe(68);
    expect(result.feelsLike).toBe(71.6);
    expect(result.windSpeed).toBeCloseTo(6.21371);
    expect(result.unitSymbol).toBe("F");
    expect(result.windSpeedUnit).toBe("mph");
    expect(result.daily[0]?.min).toBe(50);
    expect(result.daily[0]?.max).toBe(68);
  });

  it("keeps metric units when celsius is selected", () => {
    const result = convertWeatherForecastUnits(baseWeather, "celsius");

    expect(result.temperature).toBe(20);
    expect(result.feelsLike).toBe(22);
    expect(result.windSpeed).toBe(10);
    expect(result.unitSymbol).toBe("C");
    expect(result.windSpeedUnit).toBe("km/h");
    expect(result.daily[0]).toMatchObject({
      min: 10,
      max: 20,
    });
  });
});
