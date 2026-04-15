import { describe, expect, it } from "vitest";
import { createAppTheme, getDocumentThemeValue } from "@/theme/app-theme";

describe("app-theme", () => {
  it("creates the light theme configuration", () => {
    const theme = createAppTheme(false);

    expect(theme.palette.mode).toBe("light");
    expect(theme.palette.primary.main).toBe("#4f78c3");
    expect(theme.palette.background.default).toBe("#edf4ff");
    expect(theme.shape.borderRadius).toBe(10);
    expect(theme.typography.h1?.fontFamily).toContain("var(--font-display)");
  });

  it("creates the dark theme configuration", () => {
    const theme = createAppTheme(true);

    expect(theme.palette.mode).toBe("dark");
    expect(theme.palette.primary.main).toBe("#8ea9ff");
    expect(theme.palette.background.default).toBe("#04070d");
    expect(theme.components?.MuiAlert?.styleOverrides?.root).toMatchObject({
      backdropFilter: "blur(14px)",
      borderRadius: "10px",
    });
  });

  it("returns the expected document theme values", () => {
    expect(getDocumentThemeValue(false)).toBe("day");
    expect(getDocumentThemeValue(true)).toBe("night");
  });
});
