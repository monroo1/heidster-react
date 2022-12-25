import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { apiSlice } from "./index.service";
import authReducer from "./reducers/auth.slice";
import formSlice from "./reducers/form.slice";

const rootReducer = combineReducers({
  authReducer,
  formSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};
