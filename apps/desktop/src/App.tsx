import { useThemeMode, useTitlebar } from "@/lib/hooks";
import "@derivv/ui/globals.css";

function App() {
  useThemeMode();
  useTitlebar();

  return (
    <div id="titlebar" className="flex items-center justify-center h-10">
      <h1>Derivv Pro</h1>
    </div>
  );
}

export default App;
