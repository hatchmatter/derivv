import { Input } from "@derivv/ui/components/input";

import type { Units } from "@/features/derivative-config-slice";

type DimensionsInputProps = {
  units: Units;
  defaultValue?: Dimension;
};

export const DimensionsInput = ({
  units,
  defaultValue,
}: DimensionsInputProps) => {
  return (
    <>
      <Input
        type="number"
        placeholder="Width"
        name="width"
        defaultValue={defaultValue?.width}
        min={1}
        max={units === "in" ? 100 : undefined}
        step={units === "px" ? 1 : 0.01}
      />
      <Input
        type="number"
        placeholder="Height"
        name="height"
        defaultValue={defaultValue?.height}
        min={1}
        max={units === "in" ? 100 : undefined}
        step={units === "px" ? 1 : 0.01}
      />
    </>
  );
};
