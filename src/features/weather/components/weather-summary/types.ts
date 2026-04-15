import { SvgIconComponent } from "@mui/icons-material";

export type WeatherIconToken = {
  Icon: SvgIconComponent;
  color: string;
  size: number;
};

export type WeatherDetailItem = {
  label: string;
  value: string;
  icon: WeatherIconToken;
};

export type WeatherHighlightItem = {
  label: string;
  value: string;
  icon: WeatherIconToken;
};
