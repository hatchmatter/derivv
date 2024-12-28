import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@derivv/ui/components/separator"
import {
  SidebarInset,
  SidebarTrigger,
} from "@derivv/ui/components/sidebar"
import ImageSet from "@/routes/ImageSet"

export default function Layout() {
  return (
    <>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <header className="flex h-10 shrink-0 items-center gap-2 border-b px-4 justify-end">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <ImageSet />
          </div>
        </div>
      </SidebarInset>
    </>
  )
}
