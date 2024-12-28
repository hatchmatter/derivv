export { useMousetrap } from "./useMousetrap";

import { getCurrentWindow } from "@tauri-apps/api/window";
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

export const useTitlebar = () => {
  useEffect(() => {
    const appWindow = getCurrentWindow();

    const titlebar = document.getElementById("titlebar");

    if (!titlebar) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (e.buttons === 1) {
        // Primary (left) button
        e.detail === 2 ? appWindow.toggleMaximize() : appWindow.startDragging();
      }
    };

    titlebar.addEventListener("mousedown", handleMouseDown);

    return () => {
      titlebar.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);
};


