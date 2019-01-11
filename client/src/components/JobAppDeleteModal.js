import React, { Component } from "react";
import styles from "./JobAppDeleteModal.module.css";
import g_styles from "../globals.module.css";
import { connect } from "react-redux";
import { deleteJobApp, hideJobDetail } from "../actions";

class JobAppDeleteModal extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteJobApp = this.handleDeleteJobApp.bind(this);
  }
  handleDeleteJobApp() {
    this.props.hideDeleteConfirmation();
    this.props.deleteJobApp(this.props.jobAppId);
    this.props.hideJobDetail();
  }
  render() {
    return (
      <div className={styles.JobAppDeleteModal__outerContainer}>
        <div className={styles.JobAppDeleteModal__innerContainer}>
          <div className={styles.JobAppDeleteModal}>
            <div className={styles.JobAppDeleteModal__header}>
              <span
                className={styles.JobAppDeleteModal__closeForm}
                onClick={this.props.hideDeleteConfirmation}
              >
                x
              </span>
              <h1>Are you sure?</h1>
              <h4>This cannot be undone!</h4>
            </div>
            <div className={styles.JobAppDeleteModal__buttonContainer}>
              <button
                className={g_styles.cancel_button}
                onClick={this.props.hideDeleteConfirmation}
              >
                Cancel
              </button>
              <button className={g_styles.primary_button} onClick={this.handleDeleteJobApp}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
};

const mapDispatchToProps = dispatch => {
  return {
    deleteJobApp: id => dispatch(deleteJobApp(id)),
    hideJobDetail: () => dispatch(hideJobDetail())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobAppDeleteModal);
