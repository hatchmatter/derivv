import { Button } from "@derivv/ui/components/button";
import { EllipsisVertical, Trash } from "lucide-react";

type Props = {
  image: Image;
};

export function OriginalImage({ image }: Props) {
  const title = image.path.split("/").pop();
  const extension = image.path.split(".").pop();

  return (
    <figure className="shrink-0 p-2 border rounded-md bg-muted">
      <Button variant="ghost" asChild className="hover:cursor-pointer">
        <img
          src={image.url}
          alt={image.path}
          title={title}
          className="w-60 h-40 object-cover hover:object-contain transition[object-fit]"
        />
      </Button>

      <figcaption className="pt-2 text-xs text-muted-foreground flex items-center justify-between gap-2">
        {extension}
        <span className="font-semibold text-foreground">300x300</span>
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
