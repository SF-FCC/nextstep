import React, { Component } from "react";
import styles from "./UpdateAccountModal.module.css";
import g_styles from "../globals.module.css";
import { connect } from "react-redux";
import { deleteAccount } from "../actions";

class UpdateAccountModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordValue: ""
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handlePasswordChange(e) {
    this.setState({ passwordValue: e.target.value });
  }
  handleFormSubmit() {
    this.props.hideModal();
    this.props.deleteAccount(this.props.userEmail, this.state.passwordValue);
  }
  render() {
    return (
      <div className={styles.UpdateAccountModal__outerContainer}>
        <div className={styles.UpdateAccountModal__innerContainer}>
          <div className={styles.UpdateAccountModal}>
            <div className={styles.UpdateAccountModal__header}>
              {/* <h1 className={styles.UpdateAccountModal__messageHeader}>{this.props.message}</h1> */}
              <span
                className={styles.UpdateAccountModal__closeModal}
                onClick={this.props.hideModal}
              >
                X
              </span>
            </div>
            <form>
              <label className={styles.UpdateAccountModal__label}>
                Please re-enter your password to confirm these changes
              </label>
              <input
                className={styles.UpdateAccountModal__input}
                onChange={this.handlePasswordChange}
                type="password"
                value={this.state.passwordValue}
              />
            </form>
            <div className={styles.UpdateAccountModal__buttonContainer}>
              <button onClick={this.props.hideModal} className={g_styles.cancel_button}>
                Cancel
              </button>
              <button
                type="button"
                onClick={this.handleFormSubmit}
                className={g_styles.primary_button}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userEmail: state.user.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteAccount: (email, pw) => dispatch(deleteAccount(email, pw))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateAccountModal);
