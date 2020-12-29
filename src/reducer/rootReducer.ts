import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer/index";
import userReducer from "./userReducer/index";
import dairyReducer from "./dairyReducer/index";
import entryReducer from "./entryReducer/index";
export default combineReducers({
  authReducer,
  userReducer,
  dairyReducer,
  entryReducer,
});
