import { convertFileSrc } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";

import { useCallback } from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@derivv/ui/components/button";
import { EXTENSIONS } from "@/lib/constants";

type Props = {
  onSelect: (images: Image[]) => void;
};

export const openImages = async (callback: (images: Image[]) => void) => {
  const paths = await open({
    multiple: true,
    filters: [
      {
        name: "Images",
        extensions: EXTENSIONS,
      },
    ],
  });

  if (paths) {
    const images = paths.map((path) => ({
      path,
      id: crypto.randomUUID(),
      url: convertFileSrc(path),
    }));

    callback(images);
  }
};

export function OpenImages({ onSelect, ...props }: Props) {
  const handleOpen = useCallback(() => {
    openImages(onSelect);
  }, [onSelect]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleOpen}
      title="Open Images (⌘O)"
      className="[&_svg]:size-6"
      {...props}
    >
      <PlusIcon />
    </Button>
  );
}
