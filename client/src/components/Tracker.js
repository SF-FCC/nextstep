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
 *
 * TODO - when the job status form is complete, change the <td>DATE APPLIED</td> id to the name used in the db to store the created on date (right now it is sorting by the date of the 'created' field
 */

class TrackerTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSortBy: null, 
      jobApps: props.jobApps,
    }
    this.sortTableBy = this.sortTableBy.bind(this);
    this.handleSortRequest = this.handleSortRequest.bind(this);
  }
  sortTableBy(sortType) {
    let jobsCopy = this.state.jobApps.slice();

    if (this.state.currentSortBy === sortType) {
      this.setState({
        currentSortBy: null,
        jobApps: jobsCopy.reverse(),
      });
    } else {
      let res = jobsCopy.sort((acc, job) => {
        return acc[sortType].toLowerCase() > job[sortType].toLowerCase();
      });

      this.setState({
        currentSortBy: sortType,
        jobApps: res
      });
    }
  }
  handleSortRequest(e) {
    if (e.target.id) this.sortTableBy(e.target.id);
  }
  render() {
    return (
      <table className={styles.tracker__table}>
        <tbody className={styles.tracker__table_heading}>
          <tr onClick={this.handleSortRequest}>
            <td id='company_name'>COMPANY</td>
            <td id='job_title'>JOB TITLE</td>
            <td id='current_status'>STATUS</td>
            <td id='job_location' className={"mobile_hide"}>LOCATION</td>
            <td id='created' className={"mobile_hide"}>DATE APPLIED</td>
          </tr>
        </tbody>
        <tbody className={styles.tracker__table_body}>
          {this.state.jobApps.map(jobApp => (
            <tr key={jobApp.id}>
              <td>{jobApp.company_name}</td>
              <td>{jobApp.job_title}</td>
              <td>{jobApp.current_status}</td>
              <td className={"mobile_hide"}>{jobApp.job_location}</td>
              <td className={"mobile_hide"}>{jobApp.created}</td>
            </tr>))}
        </tbody>
      </table>
    )
  }
}

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
