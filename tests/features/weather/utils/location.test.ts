import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createLocationFallback,
  getCurrentPosition,
} from "@/features/weather/utils/location";

describe("location utils", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("wraps navigator geolocation in a promise", async () => {
    const geolocation = {
      getCurrentPosition: vi.fn((success: PositionCallback) =>
        success({
          coords: {
            latitude: -23.55,
            longitude: -46.63,
            accuracy: 1,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
            toJSON: () => ({}),
          },
          timestamp: Date.now(),
          toJSON: () => ({}),
        } as GeolocationPosition),
      ),
    };

    Object.defineProperty(navigator, "geolocation", {
      configurable: true,
      value: geolocation,
    });

    const position = await getCurrentPosition({
      enableHighAccuracy: true,
    });

    expect(position.coords.latitude).toBe(-23.55);
    expect(geolocation.getCurrentPosition).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      { enableHighAccuracy: true },
    );
  });

  it("creates a stable fallback city from coordinates", () => {
    expect(
      createLocationFallback({
        latitude: -22.9056,
        longitude: -47.0608,
        name: "Minha localizacao",
        country: "Atual",
      }),
    ).toEqual({
      id: 229056470608,
      name: "Minha localizacao",
      latitude: -22.9056,
      longitude: -47.0608,
      country: "Atual",
    });
  });
});
