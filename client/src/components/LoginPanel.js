import React, { Component } from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import { requestLogin } from "../actions";
import { NavLink } from "react-router-dom";

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
      <div
        style={{
          left: "50%",
          width: "200px",
          marginLeft: "-100px",
          position: "absolute",
          textAlign: "center",
          border: "1px solid black",
          backgroundColor: "white"
        }}
      >
        <h1>Login</h1>
        <form onSubmit={this.submitLogin}>
          <label>
            Email
            <input type="text" onChange={this.handleInputChange("email")} required />
          </label>
          <label>
            Password
            <input type="password" onChange={this.handleInputChange("password")} required />
          </label>
          {this.props.loginError && <p>{this.props.loginError}</p>}
          <input type="submit" value="Login" />
        </form>
        <NavLink to="/register">Register</NavLink>
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
