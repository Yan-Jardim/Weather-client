export type TemperatureUnit = "celsius" | "fahrenheit";

export type CityOption = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
};

export type ForecastDay = {
  date: string;
  weatherCode: number;
  min: number;
  max: number;
  precipitationChance: number;
};

export type WeatherForecast = {
  cityLabel: string;
  currentTime: string;
  isDay: boolean;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  sunrise: string;
  sunset: string;
  precipitationChance: number;
  weatherCode: number;
  unitSymbol: string;
  windSpeedUnit: string;
  daily: ForecastDay[];
};
