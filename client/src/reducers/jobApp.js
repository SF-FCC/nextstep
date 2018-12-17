function jobApp(state = {}, action) {
  switch (action.type) {
    case "ADD_JOB_APP":
      return {
        ...state,
        jobAppPostRes: action.payload
      };
    default:
      return state;
  }
}

export default jobApp;
