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
export const updateEmail = (email, newEmail, password) => async dispatch => {
  const body = { email, newEmail };
  const authHeaders = await reqConfig("token");
  const validPassword = await axios.post("/auth/login", { email, password });

  if (validPassword.status === 200) {
    const response = await axios.put("/users/email", body, authHeaders);
    if (response.status === 200) {
      dispatch({ type: "UPDATE_EMAIL", payload: newEmail });
      history.push("/tracker");
    } else {
      dispatch({ type: "UPDATE_EMAIL_ERR", message: "unable to update email" });
    }
  }
};

export const updatePassword = (email, newPw, password) => async dispatch => {
  const body = { email, newPw };
  const authHeaders = await reqConfig("token");
  const validPassword = await axios.post("/auth/login", { email, password });
  if (validPassword.status === 200) {
    const response = await axios.put("/users/password", body, authHeaders);
    if (response.status === 200) {
      history.push("/tracker");
    } else {
      dispatch({ type: "UPDATE_PW_ERR", message: "unable to update password" });
    }
  }
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
