import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import WeatherIcon from "@/features/weather/components/weather-icon";
import { getWeatherIconStyles } from "@/features/weather/components/weather-icon/styles";

describe("WeatherIcon", () => {
  it("renders the day and night icons for clear sky", () => {
    const { container, rerender } = render(<WeatherIcon code={0} isDay />);

    expect(
      container.querySelector('[data-testid="WbSunnyRoundedIcon"]'),
    ).toBeInTheDocument();
    expect(container.querySelector(".weather-float")).toBeInTheDocument();
    expect(
      container.querySelector(".weather-float-delayed"),
    ).toBeInTheDocument();

    rerender(<WeatherIcon code={0} isDay={false} />);

    expect(
      container.querySelector('[data-testid="DarkModeRoundedIcon"]'),
    ).toBeInTheDocument();
  });

  it("renders the expected icons across the supported weather ranges", () => {
    const { container, rerender } = render(<WeatherIcon code={2} />);

    expect(
      container.querySelector('[data-testid="CloudQueueRoundedIcon"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-testid="CloudRoundedIcon"]'),
    ).toBeInTheDocument();

    rerender(<WeatherIcon code={45} />);
    expect(
      container.querySelector('[data-testid="GrainRoundedIcon"]'),
    ).toBeInTheDocument();

    rerender(<WeatherIcon code={61} />);
    expect(
      container.querySelector('[data-testid="WaterDropRoundedIcon"]'),
    ).toBeInTheDocument();

    rerender(<WeatherIcon code={85} />);
    expect(
      container.querySelector('[data-testid="AcUnitRoundedIcon"]'),
    ).toBeInTheDocument();

    rerender(<WeatherIcon code={95} />);
    expect(
      container.querySelector('[data-testid="ThunderstormRoundedIcon"]'),
    ).toBeInTheDocument();
  });

  it("hides the decorative frame in compact mode", () => {
    const { container } = render(<WeatherIcon code={2} compact size={22} />);

    expect(
      container.querySelector('[data-testid="CloudQueueRoundedIcon"]'),
    ).toBeInTheDocument();
    expect(container.querySelector(".weather-float")).not.toBeInTheDocument();
    expect(
      container.querySelector(".weather-float-delayed"),
    ).not.toBeInTheDocument();
  });
});

describe("getWeatherIconStyles", () => {
  it("returns decorative styles for full icons and compact styles when requested", () => {
    const fullStyles = getWeatherIconStyles({
      code: 2,
      compact: false,
      size: 48,
      frameSize: 84,
      halo: "rgba(255, 255, 255, 0.2)",
    });
    const compactStyles = getWeatherIconStyles({
      code: 95,
      compact: true,
      size: 22,
      frameSize: 22,
      halo: "rgba(255, 212, 138, 0.3)",
    });

    expect(fullStyles.icon).toMatchObject({
      fontSize: 48,
      filter: "drop-shadow(0 10px 24px rgba(255, 255, 255, 0.2))",
    });
    expect(fullStyles.trailingCloud).toMatchObject({
      display: "block",
    });
    expect(compactStyles.icon).toMatchObject({
      fontSize: 22,
      filter: "none",
    });
    expect(compactStyles.trailingCloud).toMatchObject({
      display: "none",
    });
  });
});
