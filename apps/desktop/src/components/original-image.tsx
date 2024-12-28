import { useState } from "react";
import { Button } from "@derivv/ui/components/button";
import { EllipsisVertical, Trash } from "lucide-react";

type Props = {
  image: Image;
};

export function OriginalImage({ image }: Props) {
  const title = image.path.split("/").pop();
  const extension = image.path.split(".").pop();

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalHeight, naturalWidth } = e.currentTarget;
    setDimensions({ height: naturalHeight, width: naturalWidth });
  };

  return (
    <figure className="shrink-0 p-2 border rounded-md bg-muted">
      <Button variant="ghost" asChild className="hover:cursor-pointer">
        <img
          onLoad={handleImageLoad}
          src={image.url}
          alt={image.path}
          title={title}
          className="w-60 h-40 object-cover hover:object-contain transition[object-fit]"
        />
      </Button>

      <figcaption className="pt-2 text-xs text-muted-foreground flex items-center justify-between gap-2">
        {extension}
        <span className="font-semibold text-foreground">
          {dimensions.width}x{dimensions.height}
        </span>
        <div className="flex items-center">
          <Button variant="ghost" size="icon">
            <Trash />
          </Button>
          <Button variant="ghost" size="icon" className="-ml-2">
            <EllipsisVertical />
          </Button>
        </div>
      </figcaption>
    </figure>
  );
}
