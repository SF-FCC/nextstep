function jobApp(state = {}, action) {
  switch (action.type) {
    case "ADD_JOB_APP":
      return {
        ...state,
        jobApps: [...state.jobApps, action.payload]
      };
    case "JOB_APP_UPDATE":
      const curId = action.payload.id;
      return {
        ...state, 
        jobApps: [...state.jobApps.filter((jobApp) => {
          return jobApp.id !== curId;
        }), action.payload]
      };
    case "DELETE_JOB_APP":
      const deleteId = action.payload;
      return {
        jobApps: [...state.jobApps.filter(jobApp => {
          return jobApp.id !== deleteId;
        })]
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
    case "SORT_ALL_JOB_APPS":
      return {
        ...state,
        jobApps: action.payload
      }
    default:
      return state;
  }
}

export default jobApp;

