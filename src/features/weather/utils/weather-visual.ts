import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";
import CloudQueueRoundedIcon from "@mui/icons-material/CloudQueueRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import GrainRoundedIcon from "@mui/icons-material/GrainRounded";
import ThunderstormRoundedIcon from "@mui/icons-material/ThunderstormRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import { WeatherVisual } from "@/features/weather/components/weather-icon/types";

export function getWeatherVisual(code: number, isDay: boolean): WeatherVisual {
  if (code === 0) {
    return {
      Icon: isDay ? WbSunnyRoundedIcon : DarkModeRoundedIcon,
      color: isDay ? "#ffd764" : "#dce9ff",
      halo: isDay ? "rgba(255, 215, 100, 0.52)" : "rgba(220, 233, 255, 0.34)",
    };
  }

  if (code <= 3) {
    return {
      Icon: CloudQueueRoundedIcon,
      color: "#f4f8ff",
      halo: "rgba(244, 248, 255, 0.26)",
    };
  }

  if (code <= 48) {
    return {
      Icon: GrainRoundedIcon,
      color: "#e0ebfb",
      halo: "rgba(224, 235, 251, 0.24)",
    };
  }

  if (code <= 82) {
    return {
      Icon: WaterDropRoundedIcon,
      color: "#95d8ff",
      halo: "rgba(149, 216, 255, 0.28)",
    };
  }

  if (code <= 86) {
    return {
      Icon: AcUnitRoundedIcon,
      color: "#eef7ff",
      halo: "rgba(238, 247, 255, 0.28)",
    };
  }

  return {
    Icon: ThunderstormRoundedIcon,
    color: "#ffd48a",
    halo: "rgba(255, 212, 138, 0.3)",
  };
}
