const initialState = { showJobForm: false }

function toggleDisplays(state = initialState, action) {
  switch(action.type) {
    case 'TOGGLE_JOB_FORM':
      return Object.assign({}, state, {
        showJobForm: !state.showJobForm,
      })
    default:
      return state;
  }
}

export default toggleDisplays;
