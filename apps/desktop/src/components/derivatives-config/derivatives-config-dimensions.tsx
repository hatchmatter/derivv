import { useCallback } from "react";
import { Trash, CornerDownLeft, Pencil } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@derivv/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@derivv/ui/components/dialog";

import { SectionTitle } from "@/components/section-title";
import { DimensionsMenu } from "@/components/derivatives-config/dimensions-menu";
import { DimensionsInput } from "@/components/derivatives-config/dimensions-input";
import { useDerivativesConfig } from "@/hooks/use-derivatives-config";
import { pixelsToInches, inchesToPixels } from "@/lib/helpers";

export const DerivativeConfigDimensions = () => {
  const { dimensions, dimensionsSettings, addDimension, dispatch } =
    useDerivativesConfig();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const width = formData.get("width");
      const height = formData.get("height");
      const { units, dpi } = dimensionsSettings;

      if (width === "" && height === "") {
        toast.warning(
          "Empty width and height values will not resize the image but will retain other configuration settings such as quality."
        );
      }

      dispatch(
        addDimension({
          width: units === "in" ? Number(width) * dpi : Number(width),
          height: units === "in" ? Number(height) * dpi : Number(height),
          id: crypto.randomUUID(),
        })
      );
    },
    [dimensionsSettings]
  );

  const has2x = dimensionsSettings["2x"];
  const has3x = dimensionsSettings["3x"];
  const resolutionText = [has2x ? "+@2x" : "", has3x ? "+@3x" : ""]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <SectionTitle className="flex items-center justify-between mt-4">
        Dimensions
        {dimensionsSettings.units === "in" &&
          ` (${dimensionsSettings.dpi} DPI)`}
        {dimensionsSettings.units === "px" &&
          resolutionText &&
          ` (${resolutionText})`}
        <DimensionsMenu />
      </SectionTitle>
      <DimensionList
        dimensions={dimensions}
        units={dimensionsSettings.units}
        dpi={dimensionsSettings.dpi}
      />
      <form onSubmit={handleSubmit}>
        <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
          <DimensionsInput units={dimensionsSettings.units} />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="hover:bg-transparent"
          >
            <CornerDownLeft />
          </Button>
        </div>
      </form>
    </>
  );
};

const DimensionList = ({
  dimensions,
  units,
  dpi,
  ...props
}: {
  dimensions: Dimension[];
  units: string;
  dpi: number;
}) => {
  const { updateDimension, removeDimension, dispatch } = useDerivativesConfig();
  const handleSubmit = useCallback(
    (dimension: Dimension) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const width = formData.get("width");
      const height = formData.get("height");

      dispatch(
        updateDimension({
          id: dimension.id,
          width:
            units === "in"
              ? inchesToPixels(Number(width), dpi)
              : Number(width),
          height:
            units === "in"
              ? inchesToPixels(Number(height), dpi)
              : Number(height),
        })
      );
    },
    [units, dpi]
  );

  return (
    <div {...props}>
      {dimensions.map((dimension) => {
        const width =
          units === "in"
            ? pixelsToInches(dimension.width, dpi)
            : dimension.width;
        const height =
          units === "in"
            ? pixelsToInches(dimension.height, dpi)
            : dimension.height;
        const widthText = width > 0 ? `${width} ${units}` : "aspect";
        const heightText = height > 0 ? `${height} ${units}` : "aspect";
        const widthTitle =
          widthText === "aspect"
            ? "The width will be calculated based on the original image aspect ratio"
            : `width: ${widthText}`;
        const heightTitle =
          heightText === "aspect"
            ? "The height will be calculated based on the original image aspect ratio"
            : `height: ${heightText}`;
        return (
          <div
            key={dimension.id}
            className="flex w-full max-w-sm items-center justify-between space-x-2 text-sm"
          >
            <div className="flex items-center space-x-2">
              <DimensionText title={widthTitle}>{widthText}</DimensionText>
              <span className="text-muted-foreground">x</span>
              <DimensionText title={heightTitle}>{heightText}</DimensionText>
            </div>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="[&_svg]:size-3 hover:bg-transparent"
                onClick={() => dispatch(removeDimension(dimension))}
              >
                <Trash />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="[&_svg]:size-3 -ml-2 hover:bg-transparent"
                  >
                    <Pencil />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Dimension</DialogTitle>
                    <DialogDescription>
                      Edit the width and height of the dimension.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(dimension)}>
                    <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
                      <DimensionsInput
                        units={units}
                        defaultValue={{
                          width,
                          height,
                          id: dimension.id,
                        }}
                      />
                      <DialogClose asChild>
                        <Button type="submit">Save</Button>
                      </DialogClose>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const DimensionText = ({
  children,
  title,
  ...props
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <span
      className="rounded-md border border-transparent text-sm hover:border-border"
      title={title}
      {...props}
    >
      {children}
    </span>
  );
};
