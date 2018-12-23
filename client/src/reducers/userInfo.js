/**
 *
 * @typedef {object} AuthAction
 * @property {string} email user email
 * @property {string} firstName user first name
 * @property {string} lastName user last name
 * @property {string} id user id
 */

/**
 *
 * @param {object} [state={}] Previous state
 * @param {AuthAction} action The user auth information
 */
function userInfo(state = {}, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        userEmail: action.email,
        firstName: action.firstName,
        lastName: action.lastName,
        id: action.id
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        userEmail: "",
        firstName: "",
        lastName: "",
        id: ""
      };

    case "ERROR_LOGIN":
      return {
        ...state,
        loginError: action.message
      };
    case "CLEAR_LOGIN_ERROR":
      return {
        ...state,
        loginError: ""
      };

    case "ERROR_REGISTER":
      return {
        ...state,
        registerError: action.message
      };
    case "CLEAR_REGISTER_ERROR":
      return {
        ...state,
        registerError: ""
      };
    default:
      return state;
  }
}

export default userInfo;
