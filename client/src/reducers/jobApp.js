function jobApp(state = {}, action) {
  switch (action.type) {
    case "ADD_JOB_APP":
      const res = {
        ...state,
        jobApps: [...state.jobApps, action.payload]
      };
      console.log(res); 
      return res
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

