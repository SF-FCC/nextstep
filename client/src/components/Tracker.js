import React, { Component } from "react";
import { connect } from "react-redux";
import { showJobForm, getAllJobApps } from "../actions";
import JobForm from "./JobForm";
import styles from "./Tracker.module.css";

/**
 * Tracker displays the jobs in a sortable table.
 * Has a searchbar
 *
 * TODO - when a job status is changed to applied there should be a form for collecting the date
 */

const TrackerTable = ({ jobApps }) => (
  <table className={styles.tracker__table}>
    <tbody className={styles.tracker__table_heading}>
      <tr>
        <td>COMPANY</td>
        <td>JOB TITLE</td>
        <td>STATUS</td>
        <td className={"mobile_hide"}>LOCATION</td>
        <td className={"mobile_hide"}>DATA APPLIED</td>
      </tr>
    </tbody>
    <tbody className={styles.tracker__table_body}>
      {jobApps.map(jobApp => (
        <tr key={jobApp.id}>
          <td>{jobApp.company_name}</td>
          <td>{jobApp.job_title}</td>
          <td>{jobApp.current_status}</td>
          <td className={"mobile_hide"}>{jobApp.job_location}</td>
          <td className={"mobile_hide"}>{null}</td>
        </tr>))}
    </tbody>
  </table>
)

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
