import { convertFileSrc } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import { Button } from "@derivv/ui/components/button";
import { useCallback } from "react";
import { PlusIcon } from "lucide-react";

type Props = {
  onSelect: (images: Image[]) => void;
};

export function OpenImages({ onSelect, ...props }: Props) {
  const handleSelect = useCallback(async () => {
    const paths = await open({
      multiple: true,
      filters: [
        {
          name: "Images",
          extensions: [
            "jpg",
            "jpeg",
            "png",
            "gif",
            "bmp",
            "tiff",
            "ico",
            "webp",
          ],
        },
      ],
    });

    if (paths) {
      const images = paths.map((path) => ({
        path,
        id: crypto.randomUUID(),
        url: convertFileSrc(path),
      }));

      onSelect(images);
    }
  }, [onSelect]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleSelect}
      title="Open Images"
      className="[&_svg]:size-6"
      {...props}
    >
      <PlusIcon />
    </Button>
  );
}
