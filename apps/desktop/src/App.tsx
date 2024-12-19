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

  return (
    <div>
      <h1>Derivv</h1>
    </div>
  );
}

export default App;
