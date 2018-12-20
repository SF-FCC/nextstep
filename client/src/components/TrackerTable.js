import React, { Component } from "react";
import styles from "./TrackerTable.module.css";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import JobAppDetail from "./JobAppDetail";
import { setCurrentJobApp, showJobDetail } from "../actions";

/**
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
  handleShowJobAppDetail(jobApp) {
    this.props.setCurrentJobApp(jobApp);
    this.props.showJobDetail(); 
  }
  render() {
    return (
      <div>
        {this.props.isShowingJobDetail 
          && <JobAppDetail currentJobApp={this.props.currentJobApp} />}
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
              <tr 
                key={jobApp.id}
                onClick={this.handleShowJobAppDetail.bind(this, jobApp)}>
                <td>{jobApp.company_name}</td>
                <td>{jobApp.job_title}</td>
                <td>{jobApp.current_status}</td>
                <td className={"mobile_hide"}>{jobApp.job_location}</td>
                <td className={"mobile_hide"}>{jobApp.created}</td>
              </tr>))}
          </tbody>
        </table>
      </div>
    )
  }
}

TrackerTable.propTypes = {
  jobApps: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    isShowingJobDetail: state.toggleDisplays.isShowingJobDetail,
    currentJobApp: state.jobApp.currentJobApp,
  }
};

const mapDispatchToProps = dispatch => ({
  setCurrentJobApp: (job) => dispatch(setCurrentJobApp(job)),
  showJobDetail: () => dispatch(showJobDetail()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TrackerTable);
