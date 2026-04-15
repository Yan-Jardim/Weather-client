import { describe, expect, it } from "vitest";
import {
  formatCalendarLabel,
  formatCityLabel,
  formatCityMetaLabel,
  formatClockTime,
  formatShortDateLabel,
  formatTemperature,
  formatWeekdayLabel,
  normalizeSearchTerm,
} from "@/features/weather/utils/formatters";

describe("formatters", () => {
  it("formats city labels consistently", () => {
    expect(
      formatCityLabel({
        name: "Sao Paulo",
        admin1: "SP",
        country: "Brasil",
      }),
    ).toBe("Sao Paulo, SP, Brasil");

    expect(
      formatCityMetaLabel({
        admin1: "SP",
        country: "Brasil",
      }),
    ).toBe("SP - Brasil");
  });

  it("normalizes search terms using pt-BR locale rules", () => {
    expect(normalizeSearchTerm("  São  ")).toBe("são");
  });

  it("formats calendar and clock labels", () => {
    expect(formatCalendarLabel("2026-04-14T12:37")).toBe("TER 14 ABR");
    expect(formatClockTime("2026-04-14T05:48")).toBe("05:48");
  });

  it("formats weekday and short date labels", () => {
    expect(formatWeekdayLabel("2026-04-14")).toBe("TER");
    expect(formatShortDateLabel("2026-04-14")).toBe("14/04");
  });

  it("formats rounded temperatures with and without plus sign", () => {
    expect(formatTemperature(26.4)).toBe("26");
    expect(formatTemperature(26.4, { withPlus: true })).toBe("+26");
    expect(formatTemperature(-3.2, { withPlus: true })).toBe("-3");
  });
});
