import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";

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