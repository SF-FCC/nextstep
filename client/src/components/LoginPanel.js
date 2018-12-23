import React, { Component } from "react";
import { connect } from "react-redux";
import { requestLogin } from "../actions";

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
    this.props.onLoginClick(this.state.email, this.state.password);
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
          border: "1px solid black"
        }}
      >
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
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginClick: (email, password) => {
      dispatch(requestLogin(email, password));
    }
  };
};

const mapStateToProps = state => {
  return {
    loginError: state.userInfo.loginError
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPanel);
