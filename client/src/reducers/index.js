import { combineReducers } from "redux";
import toggleDisplays from './toggleDisplays';
import userInfo from "./userInfo";

export default combineReducers({
  userInfo,
  toggleDisplays
});

// const authReducer = () => {};

// const apiReducer = () => {};
