import { combineReducers } from "redux";
import toggleDisplays from "./toggleDisplays";
import userInfo from "./userInfo";
import jobApp from "./jobApp";

export default combineReducers({
  userInfo,
  toggleDisplays,
  jobApp
});
