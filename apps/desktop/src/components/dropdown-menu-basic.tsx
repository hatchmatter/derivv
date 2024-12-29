import { EllipsisVertical } from "lucide-react";

import { Button } from "@derivv/ui/components/button";
import {
  DropdownMenu as DropdownMenuUI,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@derivv/ui/components/dropdown-menu";

const exampleData = [
  {
    sectionTitle: "My Account",
    items: [
      {
        label: "Profile",
        shortcut: "⇧⌘P",
      },
      {
        label: "Billing",
        shortcut: "⌘B",
      },
      {
        label: "Settings",
        shortcut: "⌘S",
      },
      {
        label: "Keyboard shortcuts",
        shortcut: "⌘K",
      },
    ],
  },
];

type DropdownMenuProps = {
  data: {
    sectionTitle?: string;
    items: {
      label: string;
      shortcut?: string;
    }[];
  }[];
};

export function DropdownMenu({ data }: DropdownMenuProps) {
  return (
    <DropdownMenuUI>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-transparent focus-visible:ring-0">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {(data ?? exampleData).map((section, index) => (
          <DropdownMenuGroup key={index}>
            {section.sectionTitle && (
              <DropdownMenuLabel>{section.sectionTitle}</DropdownMenuLabel>
            )}
            {section.sectionTitle && <DropdownMenuSeparator />}
            {section.items.map((item, index) => (
              <DropdownMenuItem key={index}>
                {item.label}
                {item.shortcut && (
                  <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenuUI>
  );
}
