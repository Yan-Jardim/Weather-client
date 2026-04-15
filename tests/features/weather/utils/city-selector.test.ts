import { describe, expect, it } from "vitest";
import {
  buildCityOptions,
  createRecentCityKeySet,
} from "@/features/weather/utils/city-selector";

const selectedCity = {
  id: 1,
  name: "Sao Paulo",
  latitude: -23.55,
  longitude: -46.63,
  admin1: "SP",
  country: "Brasil",
};

describe("city selector utils", () => {
  it("merges selected city, recent cities and fetched cities without duplicates", () => {
    const options = buildCityOptions({
      selectedCity,
      recentCities: [
        selectedCity,
        {
          id: 2,
          name: "Santos",
          latitude: -23.96,
          longitude: -46.33,
          admin1: "SP",
          country: "Brasil",
        },
      ],
      fetchedCities: [
        {
          id: 3,
          name: "Salvador",
          latitude: -12.97,
          longitude: -38.5,
          admin1: "BA",
          country: "Brasil",
        },
      ],
      search: "sa",
    });

    expect(options.map((city) => city.name)).toEqual([
      "Sao Paulo",
      "Santos",
      "Salvador",
    ]);
  });

  it("creates a lookup set for recent city keys", () => {
    const recentCityKeys = createRecentCityKeySet([
      selectedCity,
      {
        id: 2,
        name: "Campinas",
        latitude: -22.9,
        longitude: -47.06,
        admin1: "SP",
        country: "Brasil",
      },
    ]);

    expect(recentCityKeys.size).toBe(2);
    expect(
      Array.from(recentCityKeys).every((value) => typeof value === "string"),
    ).toBe(true);
  });
});
