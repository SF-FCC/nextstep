import React, { Component } from "react";

export default class LoginPanel extends Component {
  constructor(props) {
    super(props);
  }

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
        <form action="/auth/login" method="POST">
          <label>
            Email
            <input type="text" name="email" required />
          </label>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}
