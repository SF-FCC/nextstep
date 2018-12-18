import axios from 'axios';

/**
 *
 * @param {*} userInfo
 */
export const register = userInfo => {
  return {
    type: "REGISTER",
    payload: userInfo
  };
};

/**
 *
 * @param {*} userInfo
 */
export const login = userInfo => {
  return {
    type: "LOGIN",
    payload: userInfo
  };
};

/**
 *
 *
 */
export const logout = () => {
  return {
    type: "LOGOUT"
  };
};

/**
 *
 * @param {*} email
 */
export const updateEmail = email => {
  return {
    type: "UPDATE_EMAIL",
    payload: email
  };
};

/**
 *
 * @param {*} password
 */
export const updatePassword = password => {
  return {
    type: "UPDATE_PASSWORD",
    payload: password
  };
};

/**
 *
 * @param {*} userInfo
 */
export const deleteAccount = userInfo => {
  return {
    type: "DELETE_ACCOUNT",
    payload: userInfo
  };
};

/**
 *
 * @param {array} jobs
 */
export const setVisibleJobApps = jobs => {
  return {
    type: "SET_VISIBLE_JOB_APPS",
    payload: jobs
  };
};

/**
 *
 * @param {*} details
 */

export const postJobApp = details => async dispatch => { 
  const response = await axios.post('/jobs', details);
  if (response.status === 200) {
    dispatch({type: "ADD_JOB_APP", payload: response})
  } else {
    dispatch({type: "ADD_JOB_APP_ERR", payload: 'Unable to post job application'})
  }
};

/**
 *
 * @param {*} id
 */
export const updateJobApp = id => {
  return {
    type: "UPDATE_JOB_APP"
    // payload: details
  };
};

/**
 *
 * @param {*} id
 */
export const deleteJobApp = id => {
  return {
    type: "DELETE_JOB_APP"
  };
};

/**
 *
 */
export const showJobForm = () => {
  return {
    type: "TOGGLE_JOB_FORM",
    payload: true
  };
};

/**
 *
 */
export const hideJobForm = () => {
  return {
    type: "TOGGLE_JOB_FORM",
    payload: false
  };
};
