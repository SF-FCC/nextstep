import axios from "axios";
import { setItem, removeItem } from "../utilities/cookie-helper";
import { reqConfig } from "../utilities/axios-helper";
import history from "../utilities/history";

/**
 * Register on server then update store and token
 */
export const register = ({ email, password, first_name, last_name, confirmPW }) => {
  const body = { email, password, first_name, last_name, confirmPW };
  const url = "/auth/register";
  return dispatch => {
    axios
      .post(url, body)
      .then(r => {
        setItem("token", r.data.token, 1800);
        dispatch(resolveLogin(r.data.user));
      })
      .catch(e => {
        console.log(e.response.data.err);
        dispatch(errorRegister(e.response.data.err));
      });
  };
};

/**
 * Sets a message on the register page that displays the passed error.
 * @param {string} message the error to be displayed
 */
export const errorRegister = message => {
  return {
    type: "ERROR_REGISTER",
    message
  };
};

/**
 * Clear the error message on register page
 */
export const clearRegisterError = () => {
  return {
    type: "CLEAR_REGISTER_ERROR"
  };
};

/**
 * @param {string} email the user email
 * @param {string} password the users password
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
 * Sets a message on the login page that displays the passed error.
 * @param {string} message the error to be displayed
 */
export const errorLogin = message => {
  return {
    type: "ERROR_LOGIN",
    message
  };
};

/**
 * Clear the error message on login page
 */
export const clearLoginError = () => {
  return {
    type: "CLEAR_LOGIN_ERROR"
  };
};

/**
 * @param {object} user the user object to be saved to the store
 */
export const resolveLogin = user => {
  history.push("/");
  return {
    type: "LOGIN",
    ...user
  };
};

/**
 * Logs the user out and clears all state
 */
export const logout = () => {
  removeItem("token", "/");
  return {
    type: "LOGOUT"
  };
};

/**
 * Unused
 * @param {string} email
 */
export const updateEmail = (email, pw) => {
  console.log('updating....', email, pw)
  return {
    type: "UPDATE_EMAIL",
    payload: email
  };
};

/**
 * Unused
 * @param {*} password
 */
export const updatePassword = password => {
  return {
    type: "UPDATE_PASSWORD",
    payload: password
  };
};

/**
 * Unused
 * Disable user from server
 * @param {*} email
 * @param {*} password
 */

export const deleteAccount = (email, password) => async dispatch => {
  const body = { email, password };
  const authHeaders = await reqConfig("token");
  const validPassword = await axios.post("/auth/login", body);

  if (validPassword.status === 200) {
    const response = await axios.delete("/users/delete", authHeaders);
    if (response.status === 200) {
      dispatch({ type: "DELETE_USER_MSG", payload: "Account was removed" });
      dispatch(logout());
      history.push("/");
    } else {
      dispatch({ type: "DELETE_USER_MSG", payload: "Unable to delete user" });
    }
  }
};

export const clearDeleteUserMsg = () => {
  return {
    type: "CLEAR_DELETE_USER_MSG"
  };
};

/**
 * Unused
 * @param {array} jobs
 */
export const setVisibleJobApps = jobs => {
  return {
    type: "SET_VISIBLE_JOB_APPS",
    payload: jobs
  };
};

/**
 * Populate all jobs tracked by user to the store
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

/**
 * Add a job app
 * @param {object} details contains the required fields of a job app
 */
export const postJobApp = details => async dispatch => {
  const authHeaders = await reqConfig("token");
  const response = await axios.post("/jobs", details, authHeaders);
  if (response.status === 200) {
    dispatch({ type: "ADD_JOB_APP", payload: response.data.rows[0] });
  } else {
    dispatch({ type: "JOB_APP_ERR", payload: "Unable to post job application" });
  }
};

/**
 * ?
 * @param {*} allJobApps ?
 */
export const sortAllJobApps = allJobApps => async dispatch => {
  dispatch({ type: "SORT_ALL_JOB_APPS", payload: allJobApps });
};

/**
 * Update a job app
 * @param {*} details the job object to be updated. Updated field will not be used by the server,
 * but is provided in order to immediately update client.
 */
export const updateJobApp = details => async dispatch => {
  const authHeaders = await reqConfig("token");
  try {
console.log('jobs auth headers.......', authHeaders);
    await axios.post("/jobs/update", details, authHeaders);
    dispatch({ type: "JOB_APP_UPDATE", payload: details });
  } catch (err) {
    // TODO revert to previous state
    dispatch({ type: "JOB_APP_ERR", payload: "Unable to post job application" });
  }
};

/**
 * Delete job app
 * @param {string} curId the id of the job app to delete
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
 * Show form to create job
 */
export const showJobForm = () => {
  return {
    type: "TOGGLE_JOB_FORM",
    payload: true
  };
};

/**
 * Hide form to create job
 */
export const hideJobForm = () => {
  return {
    type: "TOGGLE_JOB_FORM",
    payload: false
  };
};

/**
 * Show form to alter job
 */
export const showJobDetail = () => {
  return {
    type: "TOGGLE_JOB_DETAIL",
    payload: true
  };
};

/**
 * Hide form to alter job
 */
export const hideJobDetail = () => {
  return {
    type: "TOGGLE_JOB_DETAIL",
    payload: false
  };
};

/**
 * Sets the initial form state for altering a job
 * @param {object} job the job details
 */
export const setCurrentJobApp = job => {
  return {
    type: "SET_CURRENT_JOB_DETAIL",
    payload: job
  };
};
