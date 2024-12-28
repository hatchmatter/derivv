import { useThemeMode, useTitlebar } from "@/lib/hooks";
import { SidebarProvider } from "@derivv/ui/components/sidebar";
import "@derivv/ui/globals.css";
import Layout from "./Layout";

function App() {
  useThemeMode();
  useTitlebar();

  return (
    <SidebarProvider>
      <Layout />
    </SidebarProvider>
  );
}

export default App;
