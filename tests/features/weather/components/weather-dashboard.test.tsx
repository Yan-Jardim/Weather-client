"use client";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const {
  useWeatherMock,
  reverseGeocodeLocationMock,
  readRecentCitiesMock,
  saveRecentCityMock,
  convertWeatherForecastUnitsMock,
  useThemeModeMock,
} = vi.hoisted(() => ({
  useWeatherMock: vi.fn(),
  reverseGeocodeLocationMock: vi.fn(),
  readRecentCitiesMock: vi.fn(),
  saveRecentCityMock: vi.fn(),
  convertWeatherForecastUnitsMock: vi.fn(),
  useThemeModeMock: vi.fn(),
}));

vi.mock("@/features/weather/components/city-selector", () => ({
  default: ({
    selectedCity,
    onSelectCity,
  }: {
    selectedCity: { name: string };
    onSelectCity: (city: {
      id: number;
      name: string;
      latitude: number;
      longitude: number;
      admin1?: string;
      country?: string;
    }) => void;
  }) => (
    <div>
      <span>selected-city:{selectedCity.name}</span>
      <button
        type="button"
        onClick={() =>
          onSelectCity({
            id: 99,
            name: "Campinas",
            latitude: -22.9,
            longitude: -47.06,
            admin1: "SP",
            country: "Brasil",
          })
        }
      >
        change-city
      </button>
    </div>
  ),
}));

vi.mock("@/features/weather/components/unit-toggle", () => ({
  default: ({
    unit,
    onChangeUnit,
  }: {
    unit: string;
    onChangeUnit: (unit: "celsius" | "fahrenheit") => void;
  }) => (
    <div>
      <span>unit:{unit}</span>
      <button type="button" onClick={() => onChangeUnit("fahrenheit")}>
        switch-unit
      </button>
    </div>
  ),
}));

vi.mock("@/features/weather/components/weather-summary", () => ({
  default: ({
    weather,
    isNightTheme,
  }: {
    weather: { cityLabel: string; unitSymbol: string };
    isNightTheme: boolean;
  }) => (
    <div>
      summary:{weather.cityLabel}:{weather.unitSymbol}:{String(isNightTheme)}
    </div>
  ),
}));

vi.mock("@/features/weather/components/forecast-list", () => ({
  default: ({
    unitSymbol,
    days,
  }: {
    unitSymbol: string;
    days: unknown[];
  }) => <div>forecast:{unitSymbol}:{days.length}</div>,
}));

vi.mock("@/features/weather/hooks/use-weather", () => ({
  useWeather: useWeatherMock,
}));

vi.mock("@/features/weather/lib/weather-api", () => ({
  reverseGeocodeLocation: reverseGeocodeLocationMock,
}));

vi.mock("@/features/weather/utils/recent-cities", () => ({
  readRecentCities: readRecentCitiesMock,
  saveRecentCity: saveRecentCityMock,
}));

vi.mock("@/features/weather/utils/unit-conversion", () => ({
  convertWeatherForecastUnits: convertWeatherForecastUnitsMock,
}));

vi.mock("@/theme/theme-mode-provider", () => ({
  useThemeMode: useThemeModeMock,
}));

import WeatherDashboard from "@/features/weather/components/weather-dashboard";

const baseForecast = {
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
  daily: [{ date: "2026-04-14", weatherCode: 2, min: 18, max: 26, precipitationChance: 35 }],
};

describe("WeatherDashboard", () => {
  beforeEach(() => {
    readRecentCitiesMock.mockReturnValue([]);
    saveRecentCityMock.mockImplementation((city) => [city]);
    convertWeatherForecastUnitsMock.mockImplementation(
      (data, unit: "celsius" | "fahrenheit") => ({
        ...data,
        unitSymbol: unit === "fahrenheit" ? "F" : "C",
      }),
    );
    useThemeModeMock.mockReturnValue({
      isDarkMode: false,
      syncThemeMode: vi.fn(),
    });
    useWeatherMock.mockReturnValue({
      data: baseForecast,
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
      isFetching: false,
    });
    reverseGeocodeLocationMock.mockReset();
    Object.defineProperty(navigator, "geolocation", {
      configurable: true,
      value: {
        getCurrentPosition: vi.fn(),
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state when there is no initial data", () => {
    useWeatherMock.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      refetch: vi.fn(),
      isFetching: false,
    });

    render(<WeatherDashboard />);

    expect(
      screen.getByText("Montando o painel meteorologico..."),
    ).toBeInTheDocument();
  });

  it("renders the dashboard data, changes unit and syncs the theme", async () => {
    const syncThemeMode = vi.fn();
    useThemeModeMock.mockReturnValue({
      isDarkMode: true,
      syncThemeMode,
    });
    useWeatherMock.mockReturnValue({
      data: {
        ...baseForecast,
        isDay: false,
      },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
      isFetching: true,
    });

    render(<WeatherDashboard />);

    expect(screen.getByText("selected-city:Sao Paulo")).toBeInTheDocument();
    expect(
      screen.getByText("Atualizando painel..."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("summary:Sao Paulo, SP, Brasil:C:true"),
    ).toBeInTheDocument();
    expect(screen.getByText("forecast:C:1")).toBeInTheDocument();
    expect(syncThemeMode).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByRole("button", { name: "switch-unit" }));

    await waitFor(() => {
      expect(
        screen.getByText("summary:Sao Paulo, SP, Brasil:F:true"),
      ).toBeInTheDocument();
    });
  });

  it("shows the request error state and retries the query", () => {
    const refetch = vi.fn();
    useWeatherMock.mockReturnValue({
      data: baseForecast,
      isLoading: false,
      isError: true,
      refetch,
      isFetching: false,
    });

    render(<WeatherDashboard />);

    expect(
      screen.getByText("Erro ao carregar os dados de previsao."),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Tentar novamente" }));

    expect(refetch).toHaveBeenCalled();
  });

  it("shows a warning when geolocation is not available", async () => {
    Object.defineProperty(navigator, "geolocation", {
      configurable: true,
      value: undefined,
    });

    render(<WeatherDashboard />);

    fireEvent.click(screen.getByRole("button", { name: "Minha localizacao" }));

    expect(
      await screen.findByText("Geolocalizacao nao suportada pelo navegador."),
    ).toBeInTheDocument();
  });

  it("updates the selected city from the current location and handles fallback", async () => {
    const getCurrentPosition = vi.fn((success: PositionCallback) =>
      success({
        coords: {
          latitude: -22.9,
          longitude: -47.06,
          accuracy: 1,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
          toJSON: () => ({}),
        },
        timestamp: Date.now(),
        toJSON: () => ({}),
      } as GeolocationPosition),
    );
    Object.defineProperty(navigator, "geolocation", {
      configurable: true,
      value: {
        getCurrentPosition,
      },
    });
    reverseGeocodeLocationMock
      .mockResolvedValueOnce({
        id: 77,
        name: "Campinas",
        latitude: -22.9,
        longitude: -47.06,
        admin1: "SP",
        country: "Brasil",
      })
      .mockRejectedValueOnce(new Error("reverse-geocode failed"));

    render(<WeatherDashboard />);

    fireEvent.click(screen.getByRole("button", { name: "Minha localizacao" }));

    await waitFor(() => {
      expect(saveRecentCityMock).toHaveBeenCalledWith({
        id: 77,
        name: "Campinas",
        latitude: -22.9,
        longitude: -47.06,
        admin1: "SP",
        country: "Brasil",
      });
    });
    expect(screen.getByText("selected-city:Campinas")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Minha localizacao" }));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Nao consegui identificar sua cidade exata, mas carreguei a previsao da sua localizacao.",
        ),
      ).toBeInTheDocument();
    });
    expect(
      saveRecentCityMock.mock.calls.at(-1)?.[0]?.name,
    ).toBe("Minha localizacao");
    expect(getCurrentPosition).toHaveBeenCalledTimes(2);
  });
});
