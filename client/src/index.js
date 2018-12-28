import React from "react";
import ReactDOM from "react-dom";
import "./styleReset.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";
import { getItem } from "./utilities/cookie-helper";
import axios from "axios";
import { resolveLogin } from "./actions";
import history from "./utilities/history";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

const token = getItem("token");

// Redirect is handled inside the App component
const pathname = window.location.pathname;
if (token) {
  const reqOpt = { headers: { Authorization: `Bearer ${token}` } };
  axios
    .get("/auth/verify", reqOpt)
    .then(r => {
      store.dispatch(resolveLogin(r.data.user));
      redirectVerifiedUser();
    })
    .catch(e => {
      redirectUnverifiedUser();
    });
} else {
  redirectUnverifiedUser();
}

function redirectVerifiedUser() {
  if (pathname === "/login" || pathname === "/register") {
    history.push("/");
  }
}

function redirectUnverifiedUser() {
  if (pathname === "/tracker" || pathname === "/dashboard" || pathname === "/account") {
    history.push("/");
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route render={props => <App location={props.location} />} />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
