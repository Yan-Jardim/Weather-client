import { CityOption } from "@/features/weather/types";

type LocationFallbackInput = {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
};

export function getCurrentPosition(options?: PositionOptions) {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

export function createLocationFallback({
  latitude,
  longitude,
  name,
  country,
}: LocationFallbackInput): CityOption {
  return {
    id:
      Math.round(Math.abs(latitude) * 10_000) * 1_000_000 +
      Math.round(Math.abs(longitude) * 10_000),
    name,
    latitude,
    longitude,
    country,
  };
}
