import { useEffect, useRef } from "react";
import { RotateCcw } from "lucide-react";

import { OpenImages } from "@/components/open-images";
import { OriginalImage } from "@/components/original-image";
import { ScrollArea, ScrollBar } from "@derivv/ui/components/scroll-area";
import { Button } from "@derivv/ui/components/button";

type Props = {
  images: Image[];
  onSelect: (images: Image[]) => void;
};

export function OriginalImages({ images, onSelect }: Props) {
  return (
    <div className="h-full flex items-center">
      <ScrollArea className="basis-11/12">
        <div className="flex space-x-4 p-4 items-center">
          {images.length > 0 &&
            images.map((image) => (
              <OriginalImage image={image} key={image.id} />
            ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="flex flex-col items-center justify-center basis-1/12 p-4 bg-muted rounded-md m-2 border-l">
        <OpenImages onSelect={onSelect} />
        <Button
          title="Reset"
          variant="ghost"
          size="icon"
          className="[&_svg]:size-5"
        >
          <RotateCcw />
        </Button>
      </div>
    </div>
  );
}
