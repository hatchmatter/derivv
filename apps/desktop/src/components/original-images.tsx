import { RotateCcw } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { ActionCreators } from 'redux-undo';

import { ScrollArea, ScrollBar } from "@derivv/ui/components/scroll-area";
import { Button } from "@derivv/ui/components/button";

import { OpenImages, openImages } from "@/components/open-images";
import { OriginalImage } from "@/components/original-image";
import { RootState } from "@/store";
import { addImages, clearImages } from "@/features/original-images-slice";
import { useMousetrap } from "@/hooks/useMousetrap";
import shortcuts from "@/lib/shortcuts";

export function OriginalImages() {
  const originalImages = useSelector(
    (state: RootState) => state.originalImages.present.images
  );
  const dispatch = useDispatch();

  useMousetrap(shortcuts.undo, () => {
    dispatch(ActionCreators.undo());
  });

  useMousetrap(shortcuts.redo, () => {
    dispatch(ActionCreators.redo());
  });

  useMousetrap(shortcuts.clear, () => {
    dispatch(clearImages());
  });

  useMousetrap(shortcuts.open, () => {
    openImages((images) => dispatch(addImages(images)));
  });

  return (
    <div className="h-full flex items-center">
      <ScrollArea className="basis-11/12">
        <div className="flex space-x-4 p-4 items-center">
          {originalImages.length > 0 &&
            originalImages.map((image) => (
              <OriginalImage image={image} key={image.id} />
            ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="flex flex-col items-center justify-center basis-1/12 p-4 bg-muted rounded-md m-2 border-l">
        <OpenImages onSelect={(images) => dispatch(addImages(images))} />
        <Button
          title="Reset (⌘D)"
          variant="ghost"
          size="icon"
          className="[&_svg]:size-5"
          onClick={() => dispatch(clearImages())}
        >
          <RotateCcw />
        </Button>
      </div>
    </div>
  );
}
