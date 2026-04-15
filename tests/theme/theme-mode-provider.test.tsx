"use client";

import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ThemeModeProvider,
  useThemeMode,
} from "@/theme/theme-mode-provider";

function ThemeConsumer() {
  const { isDarkMode, syncThemeMode } = useThemeMode();

  return (
    <div>
      <span>{isDarkMode ? "dark" : "light"}</span>
      <button type="button" onClick={() => syncThemeMode(true)}>
        turn-dark
      </button>
    </div>
  );
}

afterEach(() => {
  document.documentElement.removeAttribute("data-theme");
});

describe("ThemeModeProvider", () => {
  it("provides the theme mode context and updates the html dataset", () => {
    render(
      <ThemeModeProvider>
        <ThemeConsumer />
      </ThemeModeProvider>,
    );

    expect(screen.getByText("light")).toBeInTheDocument();
    expect(document.documentElement.dataset.theme).toBe("day");

    fireEvent.click(screen.getByRole("button", { name: "turn-dark" }));

    expect(screen.getByText("dark")).toBeInTheDocument();
    expect(document.documentElement.dataset.theme).toBe("night");
  });

  it("throws when the hook is used outside the provider", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    expect(() => render(<ThemeConsumer />)).toThrow(
      "useThemeMode must be used within ThemeModeProvider",
    );

    consoleError.mockRestore();
  });
});
