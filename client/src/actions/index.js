export const register = userInfo => {
  return {
    type: 'REGISTER',
    payload: userInfo
  }
}

export const login = userInfo => {
  return {
    type: 'LOGIN',
    payload: userInfo
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}

export const updateEmail = email => {
  return {
    type: 'UPDATE_EMAIL',
    payload: email
  }
}

export const updatePassword = password => {
  return {
    type: 'UPDATE_PASSWORD',
    payload: password
  }
}

export const deleteAccount = userInfo => {
  return {
    type: 'DELETE_ACCOUNT',
    payload: userInfo
  }
}

export const getJobApps = user => {
  return {
    type: 'GET_JOB_APPS'
    // payload: user.jobApps ?
  }
}

export const addJobApp = details => {
  return {
    type: 'ADD_JOB_APP',
    payload: details
  }
}

export const updateJobApp = id => {
  return {
    type: 'UPDATE_JOB_APP'
    // payload: details
  }
}

export const deleteJobApp = id => {
  return {
    type: 'DELETE_JOB_APP'
  }
}

export const toggleJobForm = () => {
  return {
    type: 'TOGGLE_JOB_FORM'
  }
}
