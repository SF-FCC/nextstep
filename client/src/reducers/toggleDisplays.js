const initialState = { isShowingJobForm: false };

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
    default:
      return state;
  }
}

export default toggleDisplays;
