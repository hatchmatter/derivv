import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { EXTENSIONS, UNITS, DPI } from "@/lib/constants";

export type Units = (typeof UNITS)[number];
export type DPI = (typeof DPI)[number];

export interface DerivativeConfigState {
  id: string;
  dimensions: Dimension[];
  dimensionsSettings: {
    units: Units;
    dpi: DPI;
    "2x": boolean;
    "3x": boolean;
  };
  fileType: (typeof EXTENSIONS)[number];
  quality: number;
  outputPath: string;
  zip: boolean;
  name: string;
}

const initialState: DerivativeConfigState = {
  id: crypto.randomUUID(),
  dimensions: [
    {
      id: crypto.randomUUID(),
      width: 200,
      height: 200,
    },
  ],
  dimensionsSettings: {
    units: "px",
    dpi: 72,
    "2x": false,
    "3x": false,
  },
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
    updateDimension: (state, action: PayloadAction<Dimension>) => {
      const index = state.dimensions.findIndex(
        (dimension) => dimension.id === action.payload.id
      );
      if (index !== -1) {
        state.dimensions[index] = action.payload;
      }
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
    updateDimensionsSettings: (
      state,
      action: PayloadAction<
        Partial<DerivativeConfigState["dimensionsSettings"]>
      >
    ) => {
      state.dimensionsSettings = {
        ...state.dimensionsSettings,
        ...action.payload,
      };
    },
  },
});

export const {
  addDimension,
  updateDimension,
  removeDimension,
  clearDimensions,
  setConfigName,
  setQuality,
  updateDimensionsSettings,
} = derivativeConfigSlice.actions;
export const actions = derivativeConfigSlice.actions;
export default derivativeConfigSlice.reducer;
