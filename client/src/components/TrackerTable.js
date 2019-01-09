import React, { Component } from "react";
import styles from "./TrackerTable.module.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import JobAppDetail from "./JobAppDetail";
import { setCurrentJobApp, showJobDetail, sortAllJobApps } from "../actions/jobsActions";

/**
 * TODO - when a job status is changed to applied there should be a form for collecting the date
 *
 * TODO - when the job status form is complete, change the <td>DATE APPLIED</td> id to the name used in the db to store the created on date (right now it is sorting by the date of the 'created' field
 */

class TrackerTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSortBy: null
    };
    this.sortTableBy = this.sortTableBy.bind(this);
    this.handleSortRequest = this.handleSortRequest.bind(this);
    this.capitalize = this.capitalize.bind(this);
  }
  sortTableBy(sortType) {
    let jobsCopy = this.props.jobApps.slice();

    if (this.state.currentSortBy === sortType) {
      this.setState({ currentSortBy: null });
      this.props.sortAllJobApps(jobsCopy.reverse());
    } else {
      let res = jobsCopy.sort((acc, job) => {
        return String(acc[sortType]).toLowerCase() > String(job[sortType]).toLowerCase() ? 1 : -1;
      });
      this.setState({ currentSortBy: sortType });
      this.props.sortAllJobApps(res);
    }
  }
  capitalize(str) {
    if (str) return str[0].toUpperCase() + str.slice(1);
  }
  handleSortRequest(e) {
    if (e.target.id) this.sortTableBy(e.target.id);
  }
  handleShowJobAppDetail(jobApp) {
    this.props.setCurrentJobApp(jobApp);
    this.props.showJobDetail();
  }
  render() {
    let filteredJobApps;
    let jobApps = this.props.jobApps.slice();

    if (this.props.showArchived) {
      filteredJobApps = jobApps.filter(jobApp => !jobApp.active);
    } else {
      filteredJobApps = jobApps.filter(jobApp => jobApp.active);
    }

    return (
      <>
        {this.props.isShowingJobDetail && <JobAppDetail currentJobApp={this.props.currentJobApp} />}
        <table className={styles.tracker__table}>
          {!this.props.showArchived && (
            <thead className={styles.tracker__table_heading}>
              <tr onClick={this.handleSortRequest}>
                <th id="company_name">COMPANY</th>
                <th id="job_title">JOB TITLE</th>
                <th id="current_status">STATUS</th>
                <th id="job_location" className={"mobile_hide"}>
                  LOCATION
                </th>
                <th id="created" className={"mobile_hide"}>
                  DATE APPLIED
                </th>
              </tr>
            </thead>
          )}
          <tbody className={styles.tracker__table_body}>
            {filteredJobApps.map(jobApp => (
              <tr key={jobApp.id} onClick={this.handleShowJobAppDetail.bind(this, jobApp)}>
                <td>{jobApp.company_name}</td>
                <td>{jobApp.job_title}</td>
                <td>{this.capitalize(jobApp.current_status)}</td>
                <td className={"mobile_hide"}>{jobApp.job_location}</td>
                <td className={"mobile_hide"}>{jobApp.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

TrackerTable.propTypes = {
  jobApps: PropTypes.array,
  showArchived: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    isShowingJobDetail: state.toggleDisplays.isShowingJobDetail,
    currentJobApp: state.jobApp.currentJobApp,
    allJobApps: state.jobApp.jobApps
  };
};

const mapDispatchToProps = dispatch => ({
  setCurrentJobApp: job => dispatch(setCurrentJobApp(job)),
  showJobDetail: () => dispatch(showJobDetail()),
  sortAllJobApps: allJobApps => dispatch(sortAllJobApps(allJobApps))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackerTable);
