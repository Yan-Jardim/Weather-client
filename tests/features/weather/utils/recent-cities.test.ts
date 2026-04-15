import { afterEach, describe, expect, it } from "vitest";
import {
  getCityStorageKey,
  readRecentCities,
  saveRecentCity,
} from "@/features/weather/utils/recent-cities";

const baseCity = {
  id: 1,
  name: "Sao Paulo",
  latitude: -23.55,
  longitude: -46.63,
  country: "Brasil",
  admin1: "SP",
};

afterEach(() => {
  window.localStorage.clear();
});

describe("recent-cities", () => {
  it("builds a stable storage key", () => {
    expect(getCityStorageKey(baseCity)).toBe("1--23.55--46.63");
  });

  it("returns an empty list for invalid stored data", () => {
    window.localStorage.setItem("weather-client-recent-cities", "{invalid");

    expect(readRecentCities()).toEqual([]);
  });

  it("saves recent cities without duplicates and with a max of five items", () => {
    const savedCities = [
      baseCity,
      { ...baseCity, id: 2, name: "Campinas" },
      { ...baseCity, id: 3, name: "Santos" },
      { ...baseCity, id: 4, name: "Osasco" },
      { ...baseCity, id: 5, name: "Sorocaba" },
      { ...baseCity, id: 6, name: "Ribeirao Preto" },
    ].map((city) => saveRecentCity(city));

    expect(savedCities.at(-1)).toHaveLength(5);
    expect(savedCities.at(-1)?.[0]?.name).toBe("Ribeirao Preto");

    const deduplicated = saveRecentCity({ ...baseCity, id: 4, name: "Osasco" });
    expect(deduplicated[0]?.name).toBe("Osasco");
    expect(deduplicated).toHaveLength(5);
  });
});
