import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import undoable from "redux-undo";

export interface OriginalImagesState {
  images: Image[];
}

const initialState: OriginalImagesState = {
  images: [],
};

export const originalImagesSlice = createSlice({
  name: "originalImages",
  initialState,
  reducers: {
    addImages: (state, action: PayloadAction<Image[]>) => {
      state.images.push(...action.payload);
    },
    removeImage: (state, action: PayloadAction<Image>) => {
      state.images = state.images.filter(
        (image) => image.id !== action.payload.id
      );
    },
    clearImages: (state) => {
      state.images = [];
    },
  },
});

export const { addImages, removeImage, clearImages } =
  originalImagesSlice.actions;
export default undoable(originalImagesSlice.reducer);
