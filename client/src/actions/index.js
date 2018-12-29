import axios from "axios";
import { setItem, removeItem } from "../utilities/cookie-helper";
import { reqConfig } from "../utilities/axios-helper";
/**
 *
 * @param {*} email
 * @param {*} password
 */
export const register = ({ email, password, first_name, last_name }) => {
  const body = { email, password, first_name, last_name };
  const url = "/auth/register";
  return dispatch => {
    axios
      .post(url, body)
      .then(r => {
        // TODO: request login from these register creds?
        // Or just save token?
        dispatch(resolveLogin(r.data.user));
      })
      .catch(e => {
        // TODO map correct response
        dispatch(errorRegister("Register failed"));
      });
  };
};

/**
 *
 */
export const errorRegister = message => {
  return {
    type: "ERROR_REGISTER",
    message
  };
};

/**
 *
 */
export const clearLoginError = () => {
  return {
    type: "CLEAR_LOGIN_ERROR"
  };
};

/**
 *
 */
export const clearRegisterError = () => {
  return {
    type: "CLEAR_REGISTER_ERROR"
  };
};

/**
 *
 * @param {*} email
 * @param {*} password
 */
export const requestLogin = (email, password) => {
  const body = { email, password };
  const url = "/auth/login";
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios
        .post(url, body)
        .then(r => {
          console.log(r.data);
          // (name, token, maxage) max age set at 30 minutes
          setItem("token", r.data.token, 1800);
          // Update store
          dispatch(resolveLogin(r.data.user));
          // Let component resolve any local state
          resolve(r.data.user);
        })
        .catch(e => {
          // TODO map correct response
          // Update store
          dispatch(errorLogin("Login failed"));
          // Let component resolve any local state
          reject();
        });
    });
  };
};

/**
 *
 * @param {*} email
 * @param {*} password
 */
export const errorLogin = message => {
  return {
    type: "ERROR_LOGIN",
    message
  };
};

/**
 *
 * @param {*} email
 * @param {*} password
 */
export const resolveLogin = user => {
  return {
    type: "LOGIN",
    ...user
  };
};

/**
 *
 *
 */
export const logout = () => {
  removeItem("token", "/");
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
 * @param {*} user
 */
export const deleteAccount = user => {
  return {
    type: "DELETE_ACCOUNT",
    payload: user
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

export const getAllJobApps = () => async dispatch => {
  const authHeaders = await reqConfig("token");
  const response = await axios.get("/jobs", authHeaders);
  if (response.status === 200) {
    dispatch({ type: "ALL_JOB_APPS", payload: response.data });
  } else {
    dispatch({ type: "JOB_APP_ERR", payload: "Unable to get job applications" });
  }
};

export const postJobApp = details => async dispatch => {
  const authHeaders = await reqConfig("token");
  const response = await axios.post("/jobs", details, authHeaders);
  if (response.status === 200) {
    dispatch({ type: "ADD_JOB_APP", payload: response.data.rows[0] });
  } else {
    dispatch({ type: "JOB_APP_ERR", payload: "Unable to post job application" });
  }
};

export const sortAllJobApps = allJobApps => async dispatch => {
  dispatch({ type: "SORT_ALL_JOB_APPS", payload: allJobApps });
};

/**
 *
 * @param {*} details
 */
export const updateJobApp = details => async dispatch => {
  // TODO - This needs to be fixed to handle updates properly
  const authHeaders = await reqConfig("token");
  const response = await axios.post("/jobs/update", details, authHeaders);
  if (response.status === 200) {
    dispatch({ type: "JOB_APP_UPDATE", payload: details });
  } else {
    dispatch({ type: "JOB_APP_ERR", payload: "Unable to post job application" });
  }
};

/**
 *
 * @param {*} id
 */
export const deleteJobApp = curId => async dispatch => {
  const authHeaders = await reqConfig("token");
  const response = await axios.post("/jobs/delete", { id: curId }, authHeaders);
  if (response.status === 200) {
    dispatch({ type: "DELETE_JOB_APP", payload: curId });
  } else {
    dispatch({ type: "JOB_APP_ERR", payload: "Unable to delete job application" });
  }
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

/**
 *
 */
export const showJobDetail = () => {
  return {
    type: "TOGGLE_JOB_DETAIL",
    payload: true
  };
};

/**
 *
 */
export const hideJobDetail = () => {
  return {
    type: "TOGGLE_JOB_DETAIL",
    payload: false
  };
};

export const setCurrentJobApp = job => {  
  return {
    type: "SET_CURRENT_JOB_DETAIL",
    payload: job
  };
};
