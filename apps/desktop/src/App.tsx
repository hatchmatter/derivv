import { Provider as ReduxProvider } from "react-redux";

import { store } from "@/store";
import { useThemeMode } from "@/hooks/useTheme";
import { useTitlebar } from "@/hooks/useTitlebar";
import Layout from "@/Layout";

import { SidebarProvider } from "@derivv/ui/components/sidebar";
import { Toaster } from "@derivv/ui/components/sonner";

import "@derivv/ui/globals.css";

function App() {
  useThemeMode();
  useTitlebar();

  return (
    <ReduxProvider store={store}>
      <SidebarProvider>
        <Layout />
        <Toaster />
      </SidebarProvider>
    </ReduxProvider>
  );
}

export default App;
