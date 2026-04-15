import { CityOption } from "@/features/weather/types";

const DEFAULT_LOCALE = "pt-BR";

type FormatTemperatureOptions = {
  withPlus?: boolean;
};

export function formatCityLabel(city: Pick<CityOption, "name" | "admin1" | "country">) {
  return [city.name, city.admin1, city.country].filter(Boolean).join(", ");
}

export function formatCityMetaLabel(
  city: Pick<CityOption, "admin1" | "country">,
) {
  return [city.admin1, city.country].filter(Boolean).join(" - ");
}

export function normalizeSearchTerm(value: string) {
  return value.trim().toLocaleLowerCase(DEFAULT_LOCALE);
}

export function formatCalendarLabel(value: string) {
  const date = new Date(value);
  const weekday = new Intl.DateTimeFormat(DEFAULT_LOCALE, { weekday: "short" })
    .format(date)
    .replace(".", "")
    .toUpperCase();
  const day = new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    day: "2-digit",
  }).format(date);
  const month = new Intl.DateTimeFormat(DEFAULT_LOCALE, { month: "short" })
    .format(date)
    .replace(".", "")
    .toUpperCase();

  return `${weekday} ${day} ${month}`;
}

export function formatClockTime(value: string) {
  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatWeekdayLabel(dateValue: string) {
  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    weekday: "short",
  })
    .format(new Date(`${dateValue}T00:00:00`))
    .replace(".", "")
    .toUpperCase();
}

export function formatShortDateLabel(dateValue: string) {
  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    day: "2-digit",
    month: "2-digit",
  }).format(new Date(`${dateValue}T00:00:00`));
}

export function formatTemperature(
  value: number,
  options: FormatTemperatureOptions = {},
) {
  const roundedValue = Math.round(value);

  if (options.withPlus && roundedValue > 0) {
    return `+${roundedValue}`;
  }

  return `${roundedValue}`;
}
