import React, { Component } from 'react';
import styles from "./JobAppDeleteModal.module.css";
import { connect } from "react-redux";

class JobAppDeleteModal extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>Are you sure? {this.props.jobAppId}</h1>
        </div>
      </div>
    )
  }
}

export default connect()(JobAppDeleteModal);
