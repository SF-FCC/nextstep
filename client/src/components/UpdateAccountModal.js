import React, { Component } from "react";
import styles from "./UpdateAccountModal.module.css";
import g_styles from "../globals.module.css";
import { connect } from "react-redux";
import { deleteAccount } from "../actions/userActions";

class UpdateAccountModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordValue: ''
    }
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handlePasswordChange(e) {
    this.setState({ passwordValue : e.target.value });
  }
  handleFormSubmit() {
    this.props.hideUpdateAccountModal();
    this.props.deleteAccount(this.props.userEmail, this.state.passwordValue);
  }
  render() {
    return (
      <div className={styles.UpdateAccountModal__outerContainer}>
        <div className={styles.UpdateAccountModal__innerContainer}>
          <div className={styles.UpdateAccountModal}>
            <span 
              className={g_styles.close_form} 
              onClick={this.props.hideUpdateAccountModal} >
              X
            </span>
            <h1>{this.props.message}</h1>
            <form>
              <label>password
              <input
                onChange={this.handlePasswordChange}
                type="password"
                value={this.state.passwordValue} />
              </label>
            </form>
            <button 
              onClick={this.props.hideUpdateAccountModal}
              className={g_styles.cancel_button}>
              Cancel
            </button>
            <button 
              type="button"
              onClick={this.handleFormSubmit} 
              className={g_styles.primary_button}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userEmail: state.user.email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteAccount: (email, pw) => dispatch(deleteAccount(email, pw)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateAccountModal);

