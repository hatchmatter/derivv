import { useEffect, useRef } from "react";

import { OpenImages } from "@/components/add-images";
import { OriginalImage } from "@/components/original-image";
import { ScrollArea, ScrollBar } from "@derivv/ui/components/scroll-area";

type Props = {
  images: Image[];
  onSelect: (images: Image[]) => void;
};

export function OriginalImages({ images, onSelect }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setWidth = () => {
      if (ref.current) {
        const parent = ref.current.parentElement;
        if (parent) {
          ref.current.style.width = `${parent.clientWidth}px`;
        }
      }
    };

    setWidth();

    window.addEventListener("resize", setWidth);

    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center px-4">
      {images.length > 0 && (
        <ScrollArea ref={ref} className="flex-1 whitespace-nowrap">
          <div className="flex w-max space-x-4 p-4 items-center">
            {images.map((image) => (
              <OriginalImage image={image} key={image.id} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
      <div className="flex-none px-4">
        <OpenImages onSelect={onSelect} />
      </div>
    </div>
  );
}
