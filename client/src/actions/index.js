export const register = userInfo => {
  return {
    type: 'REGISTER',
    payload: userInfo
  };
};

export const login = userInfo => {
  return {
    type: 'LOGIN',
    payload: userInfo
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export const updateEmail = email => {
  return {
    type: 'UPDATE_EMAIL',
    payload: email
  };
};

export const updatePassword = password => {
  return {
    type: 'UPDATE_PASSWORD',
    payload: password
  };
};

export const deleteAccount = userInfo => {
  return {
    type: 'DELETE_ACCOUNT',
    payload: userInfo
  };
};

/**
 * @param {array} jobs
 * @returns {object} action type SET_VISIBLE_JOB_APPS
 */
export const setVisibleJobApps = jobs => {
  return {
    type: 'SET_VISIBLE_JOB_APPS',
    payload: jobs
  };
};

export const addJobApp = details => {
  return {
    type: 'ADD_JOB_APP',
    payload: details
  };
};

export const updateJobApp = id => {
  return {
    type: 'UPDATE_JOB_APP'
    // payload: details
  };
};

export const deleteJobApp = id => {
  return {
    type: 'DELETE_JOB_APP'
  };
};

export const showJobForm = () => {
  return {
    type: 'TOGGLE_JOB_FORM',
    payload: true
  }
}

export const hideJobForm = () => {
  return {
    type: 'TOGGLE_JOB_FORM',
    payload: false
  }
}
