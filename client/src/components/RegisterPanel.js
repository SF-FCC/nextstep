import React, { Component } from "react";
import PropTypes from "prop-types";
import { register } from "../actions";
import { connect } from "react-redux";

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
    if (!this.props.isVisible) return null;
    return (
      <div
        style={{
          left: "50%",
          width: "200px",
          marginLeft: "-100px",
          position: "absolute",
          textAlign: "center",
          border: "1px solid black",
          top: "500%"
        }}
      >
        <h1>Register</h1>
        <form onSubmit={this.submitLogin}>
          <label>
            First
            <input type="text" onChange={this.handleInputChange("first_name")} required />
          </label>
          <label>
            Last
            <input type="text" onChange={this.handleInputChange("last_name")} required />
          </label>
          <label>
            Email
            <input type="text" onChange={this.handleInputChange("email")} required />
          </label>
          <label>
            Password
            <input type="password" onChange={this.handleInputChange("password")} required />
          </label>
          {this.props.registerError && <p>{this.props.registerError}</p>}
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

RegisterPanel.propTypes = {
  isVisible: PropTypes.bool
};

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
