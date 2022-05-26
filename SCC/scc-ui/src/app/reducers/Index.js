import { updateAction } from "./EmulationReducer";
import { combineReducers } from "redux";
import { authReducer } from "./AuthReducer";
import { policyManagerReducer } from "./PolicyManagerReducer";
import { sccCommonReducer } from "./SccCommonReducer";

const rootReducer = combineReducers({
  authReducer: authReducer,
  sccCommonReducer,
  updateAction,
  policyManagerReducer
});

export default rootReducer;
