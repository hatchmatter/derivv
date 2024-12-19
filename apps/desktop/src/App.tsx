import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";
import "./index.css";

function App() {
  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      const newColorScheme = e.matches ? "dark" : "light";
      root.classList.remove("light", "dark");
      root.classList.add(newColorScheme);
    };

    updateTheme(mediaQuery);
    mediaQuery.addEventListener("change", updateTheme);

    return () => mediaQuery.removeEventListener("change", updateTheme);
  }, []);

  useEffect(() => {
    const appWindow = getCurrentWindow();

    document.getElementById("titlebar")?.addEventListener("mousedown", (e) => {
      if (e.buttons === 1) {
        // Primary (left) button
        e.detail === 2
          ? appWindow.toggleMaximize() // Maximize on double click
          : appWindow.startDragging(); // Else start dragging
      }
    });
  }, []);

  return (
    <div id="titlebar" className="flex items-center justify-center h-10">
      <h1>Derivv</h1>
    </div>
  );
}

export default App;
