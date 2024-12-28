import { useState } from "react";
import { Button } from "@derivv/ui/components/button";
import { EllipsisVertical, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeImage } from "@/features/original-images-slice";

type Props = {
  image: Image;
};

export function OriginalImage({ image }: Props) {
  const title = image.path.split("/").pop();
  const extension = image.path.split(".").pop();
  const dispatch = useDispatch();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalHeight, naturalWidth } = e.currentTarget;
    setDimensions({ height: naturalHeight, width: naturalWidth });
  };

  return (
    <figure className="shrink-0 p-2 border rounded-md bg-muted">
      <Button variant="ghost" asChild className="hover:cursor-pointer p-0">
        <img
          onLoad={handleImageLoad}
          src={image.url}
          alt={image.path}
          title={title}
          className="w-44 h-44 object-cover hover:object-contain transition[object-fit]"
        />
      </Button>

      <figcaption className="pt-2 text-xs text-muted-foreground flex items-center justify-between gap-2">
        {extension}
        <span className="text-foreground">
          {dimensions.width}x{dimensions.height}
        </span>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => dispatch(removeImage(image))}>
            <Trash />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="-ml-2 -mr-2 hover:bg-transparent"
          >
            <EllipsisVertical />
          </Button>
        </div>
      </figcaption>
    </figure>
  );
}
