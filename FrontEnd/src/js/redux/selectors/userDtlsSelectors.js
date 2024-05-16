import { createSelector } from "@reduxjs/toolkit";

export const userDtlsSelector = (state) => state["userDtlsReducer"];

export const isLoggedInSelector = createSelector(
    [userDtlsSelector],
    (state) => state.userDtls['loggedIn'] || false
  );
export const registeredUserDtlsSelector = createSelector(
    [userDtlsSelector],
    (state) => state.userDtls['user'] || {}
  );