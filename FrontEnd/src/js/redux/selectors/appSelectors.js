import { createSelector } from "@reduxjs/toolkit";

export const appReducerSelector = (state) => state["appReducer"];

export const serviceLoaderSelector = createSelector(
  [appReducerSelector],
  (state) => state.serviceLoader
);

export const pageToastSelector = createSelector(
  [appReducerSelector],
  (state) => state.pageToast
);

