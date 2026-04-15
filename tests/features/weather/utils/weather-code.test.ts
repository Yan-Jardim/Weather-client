import { describe, expect, it } from "vitest";
import { getWeatherLabel } from "@/features/weather/utils/weather-code";

describe("getWeatherLabel", () => {
  it("returns clear sky for code zero", () => {
    expect(getWeatherLabel(0)).toBe("Ceu limpo");
  });

  it.each([
    [2, "Parcialmente nublado"],
    [45, "Neblina"],
    [63, "Chuva"],
    [75, "Neve"],
    [80, "Pancadas de chuva"],
    [86, "Pancadas de neve"],
    [95, "Tempestade"],
  ])("returns %s mapped to %s", (code, expectedLabel) => {
    expect(getWeatherLabel(code)).toBe(expectedLabel);
  });

  it("returns unknown label for out of range code", () => {
    expect(getWeatherLabel(120)).toBe("Condicao desconhecida");
  });
});
