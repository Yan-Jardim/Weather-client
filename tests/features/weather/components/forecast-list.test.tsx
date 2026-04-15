import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ForecastList from "@/features/weather/components/forecast-list";

describe("ForecastList", () => {
  it("renders the weekly forecast data", () => {
    render(
      <ForecastList
        unitSymbol="C"
        days={[
          {
            date: "2026-04-14",
            weatherCode: 2,
            min: 18.2,
            max: 27.7,
            precipitationChance: 35,
          },
          {
            date: "2026-04-15",
            weatherCode: 61,
            min: 16.1,
            max: 24.9,
            precipitationChance: 72,
          },
        ]}
      />,
    );

    expect(screen.getByText("Proximos 7 dias")).toBeInTheDocument();
    expect(
      screen.getByText("Maxima, minima e chance de chuva"),
    ).toBeInTheDocument();
    expect(screen.getByText("TER")).toBeInTheDocument();
    expect(screen.getByText("14/04")).toBeInTheDocument();
    expect(screen.getByText("28°C")).toBeInTheDocument();
    expect(screen.getByText("18°C")).toBeInTheDocument();
    expect(screen.getByText("35% chuva")).toBeInTheDocument();
    expect(screen.getByText("72% chuva")).toBeInTheDocument();
  });

  it("supports the night theme variant", () => {
    const { container } = render(
      <ForecastList
        unitSymbol="F"
        isNightTheme
        days={[
          {
            date: "2026-04-16",
            weatherCode: 95,
            min: 48.4,
            max: 66.2,
            precipitationChance: 80,
          },
        ]}
      />,
    );

    expect(screen.getByText("QUI")).toBeInTheDocument();
    expect(screen.getByText("66°F")).toBeInTheDocument();
    expect(screen.getByText("48°F")).toBeInTheDocument();
    expect(
      container.querySelector('[data-testid="ThunderstormRoundedIcon"]'),
    ).toBeInTheDocument();
  });
});
