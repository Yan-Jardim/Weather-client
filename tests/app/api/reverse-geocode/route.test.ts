import { afterEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/reverse-geocode/route";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("GET /api/reverse-geocode", () => {
  it("returns 400 for invalid coordinates", async () => {
    const response = await GET(
      new Request("http://localhost/api/reverse-geocode?latitude=x&longitude=y"),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Latitude e longitude invalidas.",
    });
  });

  it("returns 502 when the reverse geocoding service fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 502 }),
    );

    const response = await GET(
      new Request(
        "http://localhost/api/reverse-geocode?latitude=-23.55&longitude=-46.63",
      ),
    );

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      error: "Nao foi possivel identificar sua cidade.",
    });
  });

  it("maps the reverse geocoding response into a city option", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      Response.json({
        place_id: 123,
        address: {
          city: "Sao Paulo",
          state: "Sao Paulo",
          country: "Brasil",
          country_code: "br",
          "ISO3166-2-lvl4": "BR-SP",
        },
      }),
    );

    const response = await GET(
      new Request(
        "http://localhost/api/reverse-geocode?latitude=-23.55&longitude=-46.63",
      ),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      id: 123,
      name: "Sao Paulo",
      latitude: -23.55,
      longitude: -46.63,
      admin1: "SP",
      country: "Brasil",
    });
  });

  it("falls back to alternative fields when place id and city are missing", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      Response.json({
        name: "Centro",
        address: {
          municipality: "Campinas",
          state: "Sao Paulo",
          country: "Brasil",
          country_code: "br",
        },
      }),
    );

    const response = await GET(
      new Request(
        "http://localhost/api/reverse-geocode?latitude=-22.9056&longitude=-47.0608",
      ),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      id: 229056470608,
      name: "Campinas",
      latitude: -22.9056,
      longitude: -47.0608,
      admin1: "Sao Paulo",
      country: "Brasil",
    });
  });
});
