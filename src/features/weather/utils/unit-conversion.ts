import { TemperatureUnit, WeatherForecast } from "@/features/weather/types";

const KILOMETERS_TO_MILES = 0.621371;

function celsiusToFahrenheit(value: number) {
  return (value * 9) / 5 + 32;
}

function kilometersPerHourToMilesPerHour(value: number) {
  return value * KILOMETERS_TO_MILES;
}

export function convertWeatherForecastUnits(
  weather: WeatherForecast,
  unit: TemperatureUnit,
): WeatherForecast {
  if (unit === "celsius") {
    return {
      ...weather,
      unitSymbol: "C",
      windSpeedUnit: "km/h",
    };
  }

  return {
    ...weather,
    temperature: celsiusToFahrenheit(weather.temperature),
    feelsLike: celsiusToFahrenheit(weather.feelsLike),
    windSpeed: kilometersPerHourToMilesPerHour(weather.windSpeed),
    unitSymbol: "F",
    windSpeedUnit: "mph",
    daily: weather.daily.map((day) => ({
      ...day,
      min: celsiusToFahrenheit(day.min),
      max: celsiusToFahrenheit(day.max),
    })),
  };
}
