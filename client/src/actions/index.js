import axios from "axios";

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
 * @param {*} email
 * @param {*} password
 */
export const requestLogin = (email, password) => {
  const body = { email, password };
  const url = "/auth/login";
  return dispatch => {
    axios
      .post(url, body)
      .then(r => {
        dispatch(resolveLogin(r.data.user));
      })
      .catch(e => {
        alert("login fail");
        console.log(e);
      });
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
    payload: { user }
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

export const getAllJobApps = () => async dispatch => {
  const response = await axios.get("/jobs");
  if (response.status === 200) {
    dispatch({ type: "ALL_JOB_APPS", payload: response.data });
  } else {
    dispatch({ type: "JOB_APP_ERR", payload: "Unable to get job applications" });
  }
};

export const postJobApp = details => async dispatch => {
  const response = await axios.post("/jobs", details);
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
  const response = await axios.post("/jobs/update", details);
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
  const response = await axios.post("/jobs/delete", { id: curId });
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
