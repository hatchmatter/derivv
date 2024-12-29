import { configureStore, combineReducers } from "@reduxjs/toolkit";
import undoable from "redux-undo";
import logger from 'redux-logger'
import originalImageReducer from "./features/original-images-slice";
import derivativeConfigReducer from "./features/derivative-config-slice";

export const store = configureStore({
  reducer: undoable(
    combineReducers({
      originalImages: originalImageReducer,
      derivativeConfig: derivativeConfigReducer,
    })
  ),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
