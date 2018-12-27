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
function user(state = {isLoggedIn: true}, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        email: action.email,
        first_name: action.first_name,
        last_name: action.last_name,
        id: action.id,
        loginError: "",
        registerError: ""
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        email: "",
        first_name: "",
        last_name: "",
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

export default user;
