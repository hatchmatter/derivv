import { useCallback, useState } from "react";
import debounce from "lodash/debounce";

import { Input } from "@derivv/ui/components/input";
import { Slider } from "@derivv/ui/components/slider";

import { SectionTitle } from "@/components/section-title";
import { useDispatch, useSelector } from "react-redux";
import { setQuality } from "@/features/derivative-config-slice";
import { RootState } from "@/store";

export function DerivativesConfigQuality() {
  const { quality } = useSelector((state: RootState) => state.present.derivativeConfig);
  const [qualityState, setQualityState] = useState(quality);
  const dispatch = useDispatch();

  const debouncedSetQuality = debounce((value: number) => {
    dispatch(setQuality(value));
  }, 1000);

  const handleChange = useCallback((value: number) => {
    setQualityState(value);
    debouncedSetQuality(value);
  }, []);

  return (
    <>
      <SectionTitle className="mt-4">Quality</SectionTitle>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Slider
          value={[qualityState]}
          max={100}
          min={1}
          step={1}
          onValueChange={(value) => handleChange(value[0])}
        />
        <Input
          type="number"
          placeholder="Quality"
          name="quality"
          min={1}
          max={100}
          value={qualityState}
          onChange={(e) => handleChange(Number(e.target.value))}
          className="w-16"
        />
      </div>
    </>
  );
}
