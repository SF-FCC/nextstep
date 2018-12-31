import { createBrowserHistory } from "history";
import { hasItem } from "./cookie-helper";
import store from "../store";
import { logout } from "../actions";

const history = createBrowserHistory();

// Check if token has expired on every navigation. This fires even on first render.
history.listen((loc, action) => {
  if (store.getState().user.isLoggedIn) {
    // Token has expired so logout
    if (!hasItem("token")) {
      store.dispatch(logout());
    }
  }
});

export default history;
