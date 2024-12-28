import { store } from "./store";
import { Provider as ReduxProvider } from "react-redux";

import { useThemeMode, useTitlebar } from "@/lib/hooks";
import { SidebarProvider } from "@derivv/ui/components/sidebar";
import "@derivv/ui/globals.css";
import Layout from "./Layout";

function App() {
  useThemeMode();
  useTitlebar();

  return (
    <ReduxProvider store={store}>
      <SidebarProvider>
        <Layout />
      </SidebarProvider>
    </ReduxProvider>
  );
}

export default App;
