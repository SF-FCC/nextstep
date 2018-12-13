const initialState = { isShowingJobForm: false }

function toggleDisplays(state = initialState, action) {
  switch(action.type) {
    case 'TOGGLE_JOB_FORM':
      return Object.assign({}, state, {
        isShowingJobForm: action.payload,
      })
    default:
      return state;
  }
}

export default toggleDisplays;
