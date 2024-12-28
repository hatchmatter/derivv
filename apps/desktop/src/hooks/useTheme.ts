import { useEffect } from "react";

export const useThemeMode = () => {
  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateThemeMode = (e: MediaQueryListEvent | MediaQueryList) => {
      const newColorScheme = e.matches ? "dark" : "light";
      root.classList.remove("light", "dark");
      root.classList.add(newColorScheme);
    };

    updateThemeMode(mediaQuery);
    mediaQuery.addEventListener("change", updateThemeMode);

    return () => mediaQuery.removeEventListener("change", updateThemeMode);
  }, []);
};