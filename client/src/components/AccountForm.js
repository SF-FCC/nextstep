import React, { Component } from "react";
import styles from "./AccountForm.module.css";
import g_styles from "../globals.module.css";
import UpdateAccountModal from "./UpdateAccountModal";
import { connect } from "react-redux";
import { updateEmail } from "../actions";

/**
 * A panel that allows users to update their account information.
 */

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirmation: "",
      currentPassword: "",
      showUpdateAccountModal: false,
      invalidPassword: false,
      passwordMissmatchAlert: false,
      passwordTooShortAlert: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAccountCancel = this.handleAccountCancel.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  componentDidMount() {
    this.setState({email: this.props.userEmail });
  }
  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value }, () => {
      if (!this.state.currentPassword || this.state.currentPassword.length > 3) {
        this.setState({ invalidPassword: false });
      }

      if (this.state.password.length === 0 && 
          this.state.passwordConfirmation.length === 0) {
        this.setState({ passwordTooShortAlert: false });
      }
      
      if (this.state.password.length > 3 && 
          this.state.passwordConfirmation.length > 3) {
        this.setState({ passwordTooShortAlert: false });
      }

      if (this.state.password === this.state.passwordConfirmation) {
        this.setState({ passwordMissmatchAlert: false });
      }
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.currentPassword.length < 4) {
      this.setState({ invalidPassword: true });
    } 
    
    if (this.state.currentPassword.length && this.state.password) {
      if (this.state.password !== this.state.passwordConfirmation) {
        console.log('new passwords must match')
        this.setState({ passwordMissmatchAlert: true})
      } else if (this.state.password.length < 4 || 
                 this.state.passwordConfirmation.length < 4) {
        console.log('new password is too short');
        this.setState({ passwordTooShortAlert: true });
      } else {
        console.log('updating password...')
      }
    }

    if (this.state.email !== this.props.userEmail 
        && this.state.currentPassword.length > 3) {
      this.props.updateEmail(
        this.props.userEmail,
        this.state.email,
        this.state.currentPassword)
    }
  }
  handleAccountCancel() {
    this.setState({ showUpdateAccountModal: true });
  }
  hideModal() {
    this.setState({ showUpdateAccountModal: false});
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
              <input
                id="password"
                type="password"
                onChange={this.handleChange}
                value={this.state.password}
                className={styles.form_input}
              />
            </label>
            <label className={styles.label}>
              New Password Confirmation{" "}
              {this.state.passwordMissmatchAlert &&
                <sub className={styles.extra_info_alert}> 
                  *Password must match
                </sub>}
              {this.state.passwordTooShortAlert && 
                <sub className={styles.extra_info_alert}>
                  *New password is too short
                </sub>}
              <input
                id="passwordConfirmation"
                type="password"
                onChange={this.handleChange}
                value={this.state.passwordConfirmation}
                className={styles.form_input}
              />
            </label>
            <label className={styles.label}>
              Current Password{" "}
              {this.state.invalidPassword &&
                <sub className={styles.extra_info_alert}>
                  *must enter current password
                </sub>}
              <input
                id="currentPassword"
                type="password"
                onChange={this.handleChange}
                value={this.state.currentPassword}
                className={styles.form_input}
              />
            </label>
          </div>
          <button className={g_styles.primary_button + " " + styles.save_button}>
            Save
          </button>
          {<p 
            className={styles.cancel_account}
            onClick={this.handleAccountCancel}>
              Cancel my account
            </p>}
        </form>
        {this.state.showUpdateAccountModal &&
          <UpdateAccountModal hideModal={this.hideModal} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userEmail: state.user.email,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateEmail: (email, newEmail, pw) => dispatch(updateEmail(email, newEmail, pw)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm);
