/**
 *
 *
 * @param {*} [state={}] the previous state
 * @param {*} action TODO typedef this
 */
function jobList(state = {}, action) {
  switch (action.type) {
    case "SET_VISIBLE_JOB_APPS":
      return {
        ...state,
        visibleJobApps: action.payload
      };
    default:
      return state;
  }
}

export default jobList;
