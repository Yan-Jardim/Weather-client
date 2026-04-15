import axios from "axios";
import { CityOption, WeatherForecast } from "@/features/weather/types";
import { formatCityLabel } from "@/features/weather/utils/formatters";

const geoClient = axios.create({
  baseURL: "https://geocoding-api.open-meteo.com/v1",
});

const appClient = axios.create({
  baseURL: "/api",
});

const weatherClient = axios.create({
  baseURL: "https://api.open-meteo.com/v1",
});

type GeocodingResponse = {
  results?: Array<{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country?: string;
    admin1?: string;
  }>;
};

type ForecastResponse = {
  current: {
    time: string;
    is_day: number;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    surface_pressure: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    sunrise: string[];
    sunset: string[];
    weather_code: number[];
    temperature_2m_min: number[];
    temperature_2m_max: number[];
    precipitation_probability_max: Array<number | null>;
  };
};

type ReverseGeocodeInput = {
  latitude: number;
  longitude: number;
};

export async function searchCities(query: string): Promise<CityOption[]> {
  if (!query) {
    return [];
  }

  const { data } = await geoClient.get<GeocodingResponse>("/search", {
    params: {
      name: query,
      count: 5,
      language: "pt",
    },
  });

  return (data.results ?? []).map((city) => ({
    id: city.id,
    name: city.name,
    latitude: city.latitude,
    longitude: city.longitude,
    country: city.country,
    admin1: city.admin1,
  }));
}

export async function reverseGeocodeLocation({
  latitude,
  longitude,
}: ReverseGeocodeInput): Promise<CityOption> {
  const { data } = await appClient.get<CityOption>("/reverse-geocode", {
    params: {
      latitude,
      longitude,
    },
  });

  return data;
}

type GetForecastInput = {
  city: CityOption;
};

export async function getForecast({
  city,
}: GetForecastInput): Promise<WeatherForecast> {
  const { data } = await weatherClient.get<ForecastResponse>("/forecast", {
    params: {
      latitude: city.latitude,
      longitude: city.longitude,
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

  return {
    cityLabel: formatCityLabel(city),
    currentTime: data.current.time,
    isDay: data.current.is_day === 1,
    temperature: data.current.temperature_2m,
    feelsLike: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    pressure: data.current.surface_pressure,
    sunrise: data.daily.sunrise[0],
    sunset: data.daily.sunset[0],
    precipitationChance: data.daily.precipitation_probability_max[0] ?? 0,
    weatherCode: data.current.weather_code,
    unitSymbol: "C",
    windSpeedUnit: "km/h",
    daily: data.daily.time.map((date, index) => ({
      date,
      weatherCode: data.daily.weather_code[index],
      min: data.daily.temperature_2m_min[index],
      max: data.daily.temperature_2m_max[index],
      precipitationChance: data.daily.precipitation_probability_max[index] ?? 0,
    })),
  };
}
