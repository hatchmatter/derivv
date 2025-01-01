import { cn } from "@derivv/lib/utils";
import {
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@derivv/ui/components/sidebar";

import { AppSidebar } from "@/components/app-sidebar";
import ImageSet from "@/routes/ImageSet";

export default function Layout() {
  const { open } = useSidebar();
  return (
    <>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <header
          id="titlebar"
          className="flex w-full items-center gap-2 px-2 justify-between"
        >
          <SidebarTrigger
            className={cn(!open && "ml-16", "transition-all duration-200")}
          />
          <span className="text-sm">Derivv Pro</span>
          <span className="w-36">&nbsp;</span>
        </header>
        <div className="flex flex-1 flex-col gap-4 pt-0 pb-4 px-4">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <ImageSet />
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
