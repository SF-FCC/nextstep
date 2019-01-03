import { logout } from "../actions";

export default function config(axios, history, store) {
  axios.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      if (error.response.data === "Unauthorized") {
        alert("Your session has expired");
        store.dispatch(logout());
        history.push("/login");
      }
      return Promise.reject(error);
    }
  );
}
