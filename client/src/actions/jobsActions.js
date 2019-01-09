import axios from "axios";
import { reqConfig } from "../utilities/axios-helper";

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
    console.log("jobs auth headers.......", authHeaders);
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
