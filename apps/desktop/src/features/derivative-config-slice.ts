import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { EXTENSIONS } from "@/lib/constants";

export interface DerivativeConfigState {
  id: string;
  dimensions: Dimension[];
  fileType: (typeof EXTENSIONS)[number];
  quality: number;
  outputPath: string;
  zip: boolean;
  name: string;
}

const initialState: DerivativeConfigState = {
  id: crypto.randomUUID(),
  dimensions: [{ width: 200, height: 200, id: crypto.randomUUID() }],
  fileType: "jpg",
  quality: 75,
  outputPath: "~/Desktop",
  zip: false,
  name: "Untitled Config",
};

export const derivativeConfigSlice = createSlice({
  name: "derivativeConfig",
  initialState,
  reducers: {
    openConfig: (state, action: PayloadAction<DerivativeConfigState>) => {
      state = action.payload;
    },
    addDimension: (state, action: PayloadAction<Dimension>) => {
      state.dimensions.push(action.payload);
    },
    removeDimension: (state, action: PayloadAction<Dimension>) => {
      state.dimensions = state.dimensions.filter(
        (dimension) => dimension.id !== action.payload.id
      );
    },
    clearDimensions: (state) => {
      state.dimensions = [];
    },
    setConfigName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setQuality: (state, action: PayloadAction<number>) => {
      state.quality = action.payload;
    },
  },
});

export const {
  addDimension,
  removeDimension,
  clearDimensions,
  setConfigName,
  setQuality,
} = derivativeConfigSlice.actions;
export default derivativeConfigSlice.reducer;
