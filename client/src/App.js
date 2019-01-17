import React, { Component } from "react";
import PropTypes from "prop-types";
import Navbar from "./components/Navbar";
import Tracker from "./components/Tracker";
import Dashboard from "./components/Dashboard";
import AccountForm from "./components/AccountForm";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import SplashPage from "./components/SplashPage";
import LoginPanel from "./components/LoginPanel";
import RegisterPanel from "./components/RegisterPanel";
import styles from "./App.module.css";

/**
 * The main app entry point. If you plan to add a component that will utilize
 * NavLink, be sure to pass the location prop so renders are correctly updated.
 */
class App extends Component {
  render() {
    return (
      <>
        <Navbar location={this.props.location} />
        <div className={styles.page_container}>
          {!this.props.isLoggedIn ? (
            <Switch>
              <Route exact path="/" component={SplashPage} />
              <Route exact path="/login" render={props => <LoginPanel history={props.history} />} />
              <Route exact path="/register" component={RegisterPanel} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/tracker" component={Tracker} />
              <Route exact path="/account" component={AccountForm} />
            </Switch>
          )}
        </div>
      </>
    );
  }
}

App.propTypes = {
  location: PropTypes.object
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

export default connect(mapStateToProps)(App);
