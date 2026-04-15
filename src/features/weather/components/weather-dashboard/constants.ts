import { CityOption } from "@/features/weather/types";

export const DEFAULT_CITY: CityOption = {
  id: 3448439,
  name: "Sao Paulo",
  latitude: -23.5505,
  longitude: -46.6333,
  country: "Brasil",
  admin1: "SP",
};

export const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 10_000,
  maximumAge: 300_000,
};

export const WEATHER_DASHBOARD_COPY = {
  title: "Painel do tempo com cara de produto.",
  currentLocation: "Minha localizacao",
  locating: "Localizando...",
  refreshing: "Atualizando painel...",
  loading: "Montando o painel meteorologico...",
  loadError: "Erro ao carregar os dados de previsao.",
  retry: "Tentar novamente",
  geolocationUnsupported: "Geolocalizacao nao suportada pelo navegador.",
  locationUnavailable: "Nao foi possivel acessar sua localizacao.",
  reverseGeocodeFallback:
    "Nao consegui identificar sua cidade exata, mas carreguei a previsao da sua localizacao.",
} as const;
