const initialState = {};

/**
 *
 * @param {*} [state={}] the previous state
 * @param {*} action TODO typedef this
 */
function jobList(state = initialState, action) {
  switch (action.type) {
    case "SET_VISIBLE_JOB_APPS":
      return {
        ...state,
        visibleJobApps: action.payload
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}

export default jobList;
