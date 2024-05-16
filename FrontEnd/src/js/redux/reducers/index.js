// reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";

import dataReducer from "./dataReducer";
import userDtlsReducer from "./userDtlsReducer";
import appReducer from "./appReducer";

const rootReducer = combineReducers({
  appReducer: appReducer,
  userDtlsReducer: userDtlsReducer,
  dataReducer: dataReducer,
});

export default rootReducer;
