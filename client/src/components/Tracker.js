import React, { Component } from "react";
import { connect } from "react-redux";
import { showJobForm, getAllJobApps } from "../actions";
import JobForm from "./JobForm";
import styles from "./Tracker.module.css";

/**
 * Tracker displays the jobs in a sortable table.
 * Has a searchbar
 */

class Tracker extends Component {
  constructor(props) {
    super(props);
    this.handleShowJobForm = this.handleShowJobForm.bind(this);
  }
  handleShowJobForm() {
    this.props.dispatch(showJobForm());
  }
  render() {
    return (
      <div>
        <div className={styles.header}>
          <h2>Job Applications</h2>
          <button onClick={this.handleShowJobForm}>Add Job</button>
        </div>
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
            <tr>
              <td>JobTracks</td>
              <td>software engineer	</td>
              <td>Applied</td>
              <td className={"mobile_hide"}>san francisco</td>
              <td className={"mobile_hide"}>Wed, 19th Dec 2018</td>
            </tr>
            <tr>
              <td>Forkable</td>
              <td>Software Engineer</td>
              <td>Applied</td>
              <td className={"mobile_hide"}>San Francisco, Remote</td>
              <td className={"mobile_hide"}>Wed, 19th Dec 2018</td>
            </tr>
            <tr>
              <td>LinkedIn</td>
              <td>Software Engineer - Fullstack	</td>
              <td>Interested</td>
              <td className={"mobile_hide"}>San Francisco</td>
              <td className={"mobile_hide"}></td>
            </tr>
          </tbody>
        </table>
        {this.props.isShowingJobForm && <JobForm />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isShowingJobForm: state.toggleDisplays.isShowingJobForm,
  };
};

export default connect(mapStateToProps)(Tracker);
