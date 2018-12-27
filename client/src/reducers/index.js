import { combineReducers } from "redux";
import toggleDisplays from "./toggleDisplays";
import user from "./user";
import jobApp from "./jobApp";

export default combineReducers({
  user,
  toggleDisplays,
  jobApp
});
