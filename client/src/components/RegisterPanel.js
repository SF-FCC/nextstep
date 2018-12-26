import React, { Component } from "react";
import { register } from "../actions";
import { connect } from "react-redux";
import styles from "./RegisterPanel.module.css";
import { NavLink } from "react-router-dom";

/**
 * The panel that allows users to register via email and password
 */
class RegisterPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      first_name: "",
      last_name: ""
    };
  }

  submitLogin = e => {
    e.preventDefault();
    this.props.onRegisterClick(
      this.state.email,
      this.state.password,
      this.state.first_name,
      this.state.last_name
    );
  };

  handleInputChange = state => e => {
    this.setState({ [state]: e.target.value });
  };

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Register</h1>
        <form onSubmit={this.submitLogin}>
          <label className={styles.label}>
            First
            <input
              className={styles.field}
              type="text"
              onChange={this.handleInputChange("first_name")}
              required
            />
          </label>
          <label className={styles.label}>
            Last
            <input
              className={styles.field}
              type="text"
              onChange={this.handleInputChange("last_name")}
              required
            />
          </label>
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
          <label className={styles.label}>
            Confirm Password
            <input
              className={styles.field}
              type="password"
              onChange={this.handleInputChange("password")}
              required
            />
          </label>
          {this.props.registerError && <p>{this.props.registerError}</p>}
          <input className={styles.register_button} type="submit" value="Register" />
        </form>
        <div className={styles.footer}>
          Already have an account?
          <NavLink to="/login" className={styles.sign_up_highlight}>
            {" "}
            Sign in!
          </NavLink>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRegisterClick: (email, password, first_name, last_name) => {
      dispatch(register({ email, password, first_name, last_name }));
    }
  };
};

const mapStateToProps = state => {
  return {
    registerError: state.user.registerError
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPanel);
