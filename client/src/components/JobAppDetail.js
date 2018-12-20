import React, { Component } from "react";
import styles from "./JobAppDetail.module.css";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

class JobAppDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    const { currentJobApp } = this.props;
    return (
      <div>
        <div>
          <h3>{currentJobApp.company_name}</h3>
          <h1 className={styles.bla}>{JSON.stringify(currentJobApp)}</h1>
        </div>
      </div>
    )
  }
}

JobAppDetail.propTypes = {
  currentJobApp: PropTypes.object, 
}

export default connect()(JobAppDetail);
