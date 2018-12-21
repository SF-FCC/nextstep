import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

import Tracker from './components/Tracker';
import Dashboard from './components/Dashboard';
import AccountForm from './components/AccountForm';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(reduxThunk)
));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App>
        <Switch>
          <Route path="/tracker" component={Tracker} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/account" component={AccountForm} />
        </Switch>
      </App>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
