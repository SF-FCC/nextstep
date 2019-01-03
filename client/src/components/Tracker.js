import React, { Component } from "react";
import { connect } from "react-redux";
import { showJobForm, getAllJobApps } from "../actions";
import JobForm from "./JobForm";
import styles from "./Tracker.module.css";
import g_styles from "../globals.module.css";
import TrackerTable from "./TrackerTable";
import SearchForm from "./SearchForm";

// TODO: add search bar
// TODO: fix button animation so text animates the same speed

/**
 * Tracker displays the jobs in a sortable table.
 */

class Tracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showArchived: false
    };
    this.handleShowJobForm = this.handleShowJobForm.bind(this);
    this.toggleShowArchived = this.toggleShowArchived.bind(this);
  }
  componentDidMount() {
    this.props.getAllJobApps();
  }
  handleShowJobForm() {
    this.props.showJobForm();
  }
  toggleShowArchived() {
    this.setState({ showArchived: !this.state.showArchived });
  }
  render() {
    return (
      <div>
        <div className={styles.header}>
          <h2>Job Applications</h2>
          <SearchForm jobApps={this.props.jobApps} className={styles.hide_mobile} />
          <button
            className={g_styles.primary_button + " " + styles.add_job_button}
            onClick={this.handleShowJobForm}
          >
            <span className={styles.plus}>+</span>&nbsp;ADD&nbsp;JOB
          </button>
        </div>
        <SearchForm jobApps={this.props.jobApps} className={styles.show_mobile} />
        {this.props.jobApps && <TrackerTable jobApps={this.props.jobApps} showArchived={false} />}

        <p onClick={this.toggleShowArchived} className={styles.archived}>
          archived
        </p>

        {this.props.jobApps && this.state.showArchived && (
          <TrackerTable jobApps={this.props.jobApps} showArchived={true} />
        )}
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
