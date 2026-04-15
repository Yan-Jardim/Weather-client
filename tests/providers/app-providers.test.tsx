"use client";

import { render, screen } from "@testing-library/react";
import { useQueryClient } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";
import AppProviders from "@/providers/app-providers";
import { useThemeMode } from "@/theme/theme-mode-provider";

function ProvidersConsumer() {
  const queryClient = useQueryClient();
  const { isDarkMode } = useThemeMode();

  return (
    <div>
      <span>{queryClient ? "query-client-ready" : "no-query-client"}</span>
      <span>{isDarkMode ? "dark" : "light"}</span>
    </div>
  );
}

describe("AppProviders", () => {
  it("wires react-query and theme providers", () => {
    render(
      <AppProviders>
        <ProvidersConsumer />
      </AppProviders>,
    );

    expect(screen.getByText("query-client-ready")).toBeInTheDocument();
    expect(screen.getByText("light")).toBeInTheDocument();
  });
});
