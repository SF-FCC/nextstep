import { combineReducers } from 'redux';
import userInfo from './userInfo';
import visibleJobList from './jobList';

export default combineReducers({
  userInfo,
  visibleJobList
});

const authReducer = () => {};

const apiReducer = () => {};
