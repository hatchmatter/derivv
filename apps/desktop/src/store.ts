import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import originalImageReducer from "./features/original-images-slice";

export const store = configureStore({
  reducer: {
    originalImages: originalImageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
