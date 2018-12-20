import React, { Component } from "react";
import { connect } from "react-redux";
import { showJobForm, getAllJobApps } from "../actions";
import JobForm from "./JobForm";
import styles from "./Tracker.module.css";
import TrackerTable from "./TrackerTable";

/**
 * Tracker displays the jobs in a sortable table.
 * Has a searchbar
 *
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
          <button onClick={this.handleShowJobForm}>Add Job</button>
        </div>
        {this.props.jobApps && <TrackerTable jobApps={this.props.jobApps} />}
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
  getAllJobApps: () => dispatch(getAllJobApps()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Tracker);
