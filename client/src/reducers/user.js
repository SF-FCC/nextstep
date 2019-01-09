/**
 *
 * @typedef {object} AuthAction
 * @property {string} email user email
 * @property {string} firstName user first name
 * @property {string} lastName user last name
 * @property {string} id user id
 */

const initialState = {
  isLoggedIn: false,
  email: "",
  first_name: "",
  last_name: "",
  id: "",
  loginError: "",
  registerError: "",
  deleteUserMsg: ""
};

/**
 *
 * @param {object} [state={}] Previous state
 * @param {AuthAction} action The user auth information
 */
function user(state = initialState, action) {
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
      return initialState;

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
    case "DELETE_USER_MSG":
      return {
        ...state,
        deleteUserMsg: action.message
      }
    case "CLEAR_DELETE_USER_MSG":
      return {
        ...state,
        deleteUserMsg: ""
      }
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
