import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';

import Tracker from './components/Tracker';
import Account from './components/Account';
import Dashboard from './components/Dashboard';
import AccountForm from './components/AccountForm';
 

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Switch>
        <Route path="/tracker" component={Tracker} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/account/form" component={AccountForm} />
      </Switch>
    </App>
  </BrowserRouter>, 
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
