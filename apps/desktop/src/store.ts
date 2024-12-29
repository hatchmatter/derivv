import { configureStore, combineReducers } from "@reduxjs/toolkit";
import undoable, { excludeAction, StateWithHistory } from "redux-undo";
import logger from "redux-logger";

import originalImageReducer from "@/features/original-images-slice";
import derivativeConfigReducer, {
  setQuality,
} from "@/features/derivative-config-slice";

const initialState = {
  originalImages: originalImageReducer(undefined, { type: "@@INIT" }),
  derivativeConfig: derivativeConfigReducer(undefined, { type: "@@INIT" }),
};

export const store = configureStore({
  reducer: undoable(
    combineReducers({
      originalImages: originalImageReducer,
      derivativeConfig: derivativeConfigReducer,
    }),
    {
      filter: excludeAction([setQuality.type]),
    }
  ),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  // @ts-ignore
  undoableState: (initialState as any) as StateWithHistory<typeof initialState>
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
