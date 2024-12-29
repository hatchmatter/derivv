import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@derivv/ui/components/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Recent Image Sets",
      items: [
        {
          title: "Placeholder set 1",
          url: "#",
          isActive: true,
        },
        {
          title: "Placeholder set 2",
          url: "#",
          isActive: false,
        },
      ],
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data?: typeof data;
}

export function AppSidebar({ title, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>.</SidebarHeader>
      <SidebarContent>
        {(props.data?.navMain ?? data.navMain).map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
