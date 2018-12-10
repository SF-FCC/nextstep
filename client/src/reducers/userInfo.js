function userInfo(state = [], action) {
  switch (action.type) {
    case 'LOGIN':
      return [
        ...state,
        {
          isLoggedIn: true,
          userEmail: action.email,
          firstName: action.firstName,
          lastName: action.lastName,
          id: action.id
        }
      ]
    case 'LOGOUT':
      return [
        ...state,
        {
          isLoggedIn: false,
          userEmail: '',
          firstName: '',
          lastName: '',
          id: ''
        }
      ]
    default:
      return state
  }
}
