import { useThemeMode, useTitlebar } from "@/lib/hooks";
import "@derivv/ui/globals.css";
import Layout from "./Layout";

function App() {
  useThemeMode();
  useTitlebar();

  return <Layout />;
}

export default App;
