import AirRoundedIcon from "@mui/icons-material/AirRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import ThermostatRoundedIcon from "@mui/icons-material/ThermostatRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import { WeatherForecast } from "@/features/weather/types";
import {
  formatClockTime,
  formatPercentage,
  formatPressure,
  formatTemperature,
  formatWindSpeed,
} from "@/features/weather/utils/formatters";
import {
  WeatherDetailItem,
  WeatherHighlightItem,
} from "@/features/weather/components/weather-summary/types";

export function getWeatherDetailItems(
  weather: WeatherForecast,
): WeatherDetailItem[] {
  return [
    {
      label: "Pressao",
      value: formatPressure(weather.pressure),
      icon: {
        Icon: SpeedRoundedIcon,
        size: 16,
        color: "#f8fbff",
      },
    },
    {
      label: "Nascer do sol",
      value: formatClockTime(weather.sunrise),
      icon: {
        Icon: WbSunnyRoundedIcon,
        size: 16,
        color: "#ffd86b",
      },
    },
    {
      label: "Por do sol",
      value: formatClockTime(weather.sunset),
      icon: {
        Icon: DarkModeRoundedIcon,
        size: 16,
        color: "#e5edff",
      },
    },
  ];
}

export function getWeatherHighlightItems(
  weather: WeatherForecast,
): WeatherHighlightItem[] {
  return [
    {
      label: "Sensacao",
      value: `${formatTemperature(weather.feelsLike)}\u00b0${weather.unitSymbol}`,
      icon: {
        Icon: ThermostatRoundedIcon,
        size: 18,
        color: "#f8fbff",
      },
    },
    {
      label: "Umidade",
      value: formatPercentage(weather.humidity),
      icon: {
        Icon: WaterDropRoundedIcon,
        size: 18,
        color: "#9edcff",
      },
    },
    {
      label: "Vento",
      value: formatWindSpeed(weather.windSpeed, weather.windSpeedUnit),
      icon: {
        Icon: AirRoundedIcon,
        size: 18,
        color: "#dfeaff",
      },
    },
    {
      label: "Chuva",
      value: formatPercentage(weather.precipitationChance),
      icon: {
        Icon: WaterDropRoundedIcon,
        size: 18,
        color: "#7dd5ff",
      },
    },
  ];
}
