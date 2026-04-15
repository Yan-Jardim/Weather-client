import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import WeatherSummary from "@/features/weather/components/weather-summary";
import { WeatherForecast } from "@/features/weather/types";

const baseWeather: WeatherForecast = {
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
  daily: [],
};

afterEach(() => {
  cleanup();
});

describe("WeatherSummary", () => {
  it("renders weather information", () => {
    render(<WeatherSummary weather={baseWeather} />);

    expect(screen.getByText("Sao Paulo, SP, Brasil")).toBeInTheDocument();
    expect(screen.getByText("PARCIALMENTE NUBLADO")).toBeInTheDocument();
    expect(screen.getByText("80%")).toBeInTheDocument();
    expect(screen.getByText("1014 hPa")).toBeInTheDocument();
    expect(screen.getByLabelText("temperatura atual")).toHaveTextContent("+26");
  });

  it("renders nighttime information with the night theme", () => {
    render(
      <WeatherSummary
        weather={{
          ...baseWeather,
          currentTime: "2026-04-14T22:45",
          isDay: false,
          temperature: -3.2,
          feelsLike: -6.1,
          humidity: 91,
          windSpeed: 18,
          pressure: 1007,
          weatherCode: 45,
          unitSymbol: "F",
          windSpeedUnit: "mph",
        }}
        isNightTheme
      />,
    );

    expect(screen.getByText("Noite")).toBeInTheDocument();
    expect(screen.getByText("NEBLINA")).toBeInTheDocument();
    expect(screen.getByText("91%")).toBeInTheDocument();
    expect(screen.getByText("1007 hPa")).toBeInTheDocument();
    expect(screen.getByLabelText("temperatura atual")).toHaveTextContent("-3");
  });
});
