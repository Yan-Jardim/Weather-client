"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { createAppTheme, getDocumentThemeValue } from "@/theme/app-theme";

type ThemeModeProviderProps = {
  children: ReactNode;
};

type ThemeModeContextValue = {
  isDarkMode: boolean;
  syncThemeMode: (value: boolean) => void;
};

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

export function useThemeMode() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error("useThemeMode must be used within ThemeModeProvider");
  }

  return context;
}

export function ThemeModeProvider({ children }: ThemeModeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = getDocumentThemeValue(isDarkMode);
  }, [isDarkMode]);

  const theme = useMemo(() => createAppTheme(isDarkMode), [isDarkMode]);
  const contextValue = useMemo(
    () => ({
      isDarkMode,
      syncThemeMode: (value: boolean) => setIsDarkMode(value),
    }),
    [isDarkMode],
  );

  return (
    <ThemeModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
