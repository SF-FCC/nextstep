import React, { Component } from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import { requestLogin } from "../actions";
import { NavLink } from "react-router-dom";
import styles from "./LoginPanel.module.css";

/**
 * The panel that allows users to login via email and password
 */
class LoginPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  submitLogin = e => {
    e.preventDefault();
    this.props
      .requestLogin(this.state.email, this.state.password)
      .then(() => {
        // This doesn't wait for state to finish updating currently
        this.props.history.push("/");
      })
      .catch(e => {
        // TODO possible to pass failures here in order to keep errors local... much like this pattern
        // do nothing
      });
  };

  handleInputChange = state => e => {
    this.setState({ [state]: e.target.value });
  };

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={this.submitLogin}>
          <label className={styles.label}>
            Email
            <input
              className={styles.field}
              type="text"
              onChange={this.handleInputChange("email")}
              required
            />
          </label>
          <label className={styles.label}>
            Password
            <input
              className={styles.field}
              type="password"
              onChange={this.handleInputChange("password")}
              required
            />
          </label>
          {this.props.loginError && <p>{this.props.loginError}</p>}
          <input className={styles.login_button} type="submit" value="Login" />
        </form>
        <div className={styles.footer}>
          New to NextStep?
          <NavLink to="/register" className={styles.sign_up_highlight}>
            {" "}
            Sign up for free!
          </NavLink>
        </div>
      </div>
    );
  }
}

LoginPanel.propTypes = {
  /** The history object from router. Allows programmatic redirect */
  history: PropType.object
};

const mapDispatchToProps = dispatch => {
  return {
    requestLogin: (email, password) => {
      return dispatch(requestLogin(email, password));
    }
  };
};

const mapStateToProps = state => {
  return {
    loginError: state.user.loginError
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPanel);
