import { isValidElement } from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Manrope: () => ({
    variable: "mock-body-font",
  }),
  Barlow_Condensed: () => ({
    variable: "mock-display-font",
  }),
}));

vi.mock("@mui/material-nextjs/v15-appRouter", () => ({
  AppRouterCacheProvider: ({ children }: { children: unknown }) => (
    <cache-provider>{children}</cache-provider>
  ),
}));

vi.mock("@/providers/app-providers", () => ({
  default: ({ children }: { children: unknown }) => (
    <app-providers>{children}</app-providers>
  ),
}));

import RootLayout, { metadata } from "@/app/layout";

describe("RootLayout", () => {
  it("exports the page metadata", () => {
    expect(metadata).toEqual({
      title: "Weather Client",
      description: "Aplicacao de previsao do tempo com Next.js",
    });
  });

  it("wraps the app with fonts and providers", () => {
    const element = RootLayout({
      children: <div>app-content</div>,
    });

    expect(isValidElement(element)).toBe(true);
    expect(element.props.lang).toBe("pt-BR");
    expect(element.props.className).toContain("mock-body-font");
    expect(element.props.className).toContain("mock-display-font");

    const body = element.props.children;
    expect(body.props.className).toBe("weather-shell");

    const cacheProvider = body.props.children;
    const renderedCacheProvider = cacheProvider.type(cacheProvider.props);
    expect(renderedCacheProvider.type).toBe("cache-provider");

    const appProviders = renderedCacheProvider.props.children;
    const renderedAppProviders = appProviders.type(appProviders.props);
    expect(renderedAppProviders.type).toBe("app-providers");
    expect(renderedAppProviders.props.children.props.children).toBe("app-content");
  });
});
