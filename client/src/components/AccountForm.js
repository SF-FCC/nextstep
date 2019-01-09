import React, { Component } from "react";
import styles from "./AccountForm.module.css";
import g_styles from "../globals.module.css";

/**
 * A panel that allows users to update their account information.
 */
class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordComfirmation: "",
      currentPassword: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAccountCancel = this.handleAccountCancel.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log("submitting...", this.state);
  }
  handleAccountCancel() {
    console.log("canceling account...");
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className={styles.form_container}>
          <h3>Account Settings</h3>
          <label className={styles.separated + " " + styles.label}>
            Email
            <input
              id="email"
              onChange={this.handleChange}
              value={this.state.email}
              className={styles.form_input}
            />
          </label>
          <div className={styles.left_margin}>
            <label className={styles.label}>
              New Password
              <sub className={styles.extra_info}> *Leave blank if you dont want to change it</sub>
              <input
                id="password"
                type="password"
                onChange={this.handleChange}
                value={this.state.password}
                className={styles.form_input}
              />
            </label>
            <label className={styles.label}>
              New Password Comfirmation{" "}
              <input
                id="passwordComfirmation"
                type="password"
                onChange={this.handleChange}
                value={this.state.passwordComfirmation}
                className={styles.form_input}
              />
            </label>
            <label className={styles.label}>
              Current Password{" "}
              <sub className={styles.extra_info}> *needed to alter your password</sub>
              <input
                id="currentPassword"
                type="password"
                onChange={this.handleChange}
                value={this.state.currentPassword}
                className={styles.form_input}
              />
            </label>
          </div>
          <button className={g_styles.primary_button + " " + styles.save_button}>Save</button>
          {
            <p className={styles.cancel_account} onClick={this.handleAccountCancel}>
              Cancel my account
            </p>
          }
        </form>
      </div>
    );
  }
}

export default AccountForm;
