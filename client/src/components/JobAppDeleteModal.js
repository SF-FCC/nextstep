import React, { Component } from 'react';
import styles from "./JobAppDeleteModal.module.css";
import { connect } from "react-redux";

class JobAppDeleteModal extends Component {
  render() {
    return (
      <div className={styles.JobAppDeleteModal__outerContainer}>
        <div className={styles.JobAppDeleteModal__innerContainer}>
          <div className={styles.JobAppDeleteModal}>
            <span>X</span>
            <h1>Are you sure?</h1>
            <h4>This cannot be undone</h4>
            <button>Cancel</button>
            <button className={"delete_button"}>Delete</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(JobAppDeleteModal);
