const initialState = {
  isShowingJobForm: false,
  isShowingJobDetail: false
};

/**
 *
 *
 * @param {*} [state=initialState] the previous state
 * @param {*} action TODO typedef this
 */
function toggleDisplays(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_JOB_FORM":
      return { ...state, isShowingJobForm: action.payload };
    case "TOGGLE_JOB_DETAIL":
      return { ...state, isShowingJobDetail: action.payload };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}

export default toggleDisplays;
