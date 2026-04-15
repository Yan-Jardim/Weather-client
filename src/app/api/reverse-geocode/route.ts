import { CityOption } from "@/features/weather/types";

type ReverseGeocodeResponse = {
  place_id?: number;
  name?: string;
  address?: {
    "ISO3166-2-lvl4"?: string;
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    county?: string;
    state_district?: string;
    state?: string;
    country?: string;
    country_code?: string;
  };
};

function getFallbackId(latitude: number, longitude: number) {
  const lat = Math.round(Math.abs(latitude) * 10_000);
  const lon = Math.round(Math.abs(longitude) * 10_000);

  return lat * 1_000_000 + lon;
}

function getLocationName(data: ReverseGeocodeResponse) {
  return (
    data.address?.city ??
    data.address?.town ??
    data.address?.village ??
    data.address?.municipality ??
    data.address?.county ??
    data.address?.state_district ??
    data.name ??
    "Minha localizacao"
  );
}

function getAdmin1(data: ReverseGeocodeResponse) {
  if (data.address?.country_code === "br" && data.address["ISO3166-2-lvl4"]) {
    return data.address["ISO3166-2-lvl4"].split("-").at(-1) ?? data.address.state;
  }

  return data.address?.state;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const latitude = Number(searchParams.get("latitude"));
  const longitude = Number(searchParams.get("longitude"));

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return Response.json({ error: "Latitude e longitude invalidas." }, { status: 400 });
  }

  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2&zoom=10&addressdetails=1&accept-language=pt-BR`,
    {
      headers: {
        "User-Agent": "weather-client/1.0 (reverse geocoding)",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return Response.json({ error: "Nao foi possivel identificar sua cidade." }, { status: 502 });
  }

  const data = (await response.json()) as ReverseGeocodeResponse;

  const city: CityOption = {
    id: data.place_id ?? getFallbackId(latitude, longitude),
    name: getLocationName(data),
    latitude,
    longitude,
    admin1: getAdmin1(data),
    country: data.address?.country,
  };

  return Response.json(city);
}
