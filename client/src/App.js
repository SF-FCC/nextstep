import React, { Component } from "react";
import PropTypes from "prop-types";
import Navbar from "./components/Navbar";
import Tracker from "./components/Tracker";
import Dashboard from "./components/Dashboard";
import AccountForm from "./components/AccountForm";
import { Route, Switch } from "react-router-dom";

/**
 * The main app entry point. If you plan to add a component that will utilize
 * NavLink, be sure to pass the location prop so renders are correctly updated.
 */
class App extends Component {
  render() {
    return (
      <div>
        <Navbar location={this.props.location} />
        <div style={{ padding: "20px 5px 20px 20px" }}>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/tracker" component={Tracker} />
            <Route exact path="/account" component={AccountForm} />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.object
};

export default App;
