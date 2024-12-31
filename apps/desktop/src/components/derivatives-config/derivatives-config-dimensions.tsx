import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trash, CornerDownLeft, Pencil } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@derivv/ui/components/button";
import { Input } from "@derivv/ui/components/input";
import { RootState } from "@/store";
import {
  addDimension,
  removeDimension,
} from "@/features/derivative-config-slice";
import { SectionTitle } from "@/components/section-title";
import { DimensionsMenu } from "@/components/derivatives-config/dimensions-menu";

export const DerivativeConfigDimensions = () => {
  const { dimensions, dimensionsSettings } = useSelector(
    (state: RootState) => state.present.derivativeConfig
  );
  const dispatch = useDispatch();

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
  const resolutionText = [
    has2x ? "+@2x" : "",
    has3x ? "+@3x" : "",
  ].filter(Boolean).join(", ");

  return (
    <>
      <SectionTitle className="flex items-center justify-between mt-4">
        Dimensions
        {dimensionsSettings.units === "in" && ` (${dimensionsSettings.dpi} DPI)`}
        {dimensionsSettings.units === "px" && resolutionText && ` (${resolutionText})`}
        <DimensionsMenu />
      </SectionTitle>
      <DimensionList
        dimensions={dimensions}
        units={dimensionsSettings.units}
        dpi={dimensionsSettings.dpi}
      />
      <form onSubmit={handleSubmit}>
        <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
          <Input
            type="number"
            placeholder="Width"
            name="width"
            min={1}
            max={dimensionsSettings.units === "in" ? 100 : undefined}
            step={dimensionsSettings.units === "px" ? 1 : 0.01}
          />
          <Input
            type="number"
            placeholder="Height"
            name="height"
            min={1}
            max={dimensionsSettings.units === "in" ? 100 : undefined}
            step={dimensionsSettings.units === "px" ? 1 : 0.01}
          />
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
  const dispatch = useDispatch();
  const getDimensionValue = (n: number) =>
    units === "in" ? Math.round((n / dpi) * 100) / 100 : n;

  return (
    <div {...props}>
      {dimensions.map((dimension) => {
        const width = getDimensionValue(dimension.width);
        const height = getDimensionValue(dimension.height);
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
              <Button
                variant="ghost"
                size="icon"
                className="[&_svg]:size-3 -ml-2 hover:bg-transparent"
                onClick={() => {
                  alert("Edit");
                }}
              >
                <Pencil />
              </Button>
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
