function jobApp(state = {}, action) {
  switch (action.type) {
    case "ADD_JOB_APP":
      return {
        ...state,
        jobApps: [...state.jobApps, action.payload]
      };
    case "SET_CURRENT_JOB_DETAIL":
      return {
        ...state,
        currentJobApp: action.payload
      };
    case "JOB_APP_ERR":
      return {
        ...state,
        jobAppErr: action.payload
      };
    case "ALL_JOB_APPS":
      return {
        ...state,
        jobApps: action.payload
      }
    default:
      return state;
  }
}

export default jobApp;

