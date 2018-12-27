import React, { Component } from "react";
import { connect } from "react-redux";
import { showJobForm, getAllJobApps } from "../actions";
import JobForm from "./JobForm";
import styles from "./Tracker.module.css";
import TrackerTable from "./TrackerTable";

// TODO: add search bar
// TODO: fix button animation so text animates the same speed

/**
 * Tracker displays the jobs in a sortable table.
 */

class Tracker extends Component {
  constructor(props) {
    super(props);
    this.handleShowJobForm = this.handleShowJobForm.bind(this);
  }
  componentDidMount() {
    this.props.getAllJobApps();
  }
  handleShowJobForm() {
    this.props.showJobForm();
  }
  render() {
    return (
      <div>
        <div className={styles.header}>
          <h2>Job Applications</h2>
          <button className={styles.button_Blue} onClick={this.handleShowJobForm}>
            <span className={styles.plus}>+</span> ADD JOB
          </button>
        </div>
        {this.props.jobApps && 
          <TrackerTable jobApps={this.props.jobApps} showArchived={false} />}
        {this.props.jobApps && 
          <TrackerTable jobApps={this.props.jobApps} showArchived={true} />}
        {this.props.isShowingJobForm && <JobForm />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isShowingJobForm: state.toggleDisplays.isShowingJobForm,
  jobApps: state.jobApp.jobApps
});

const mapDispatchToProps = dispatch => ({
  showJobForm: () => dispatch(showJobForm()),
  getAllJobApps: () => dispatch(getAllJobApps())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracker);
