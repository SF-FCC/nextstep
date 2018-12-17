import React, { Component } from "react";
import { connect } from "react-redux";
import { showJobForm } from "../actions";
import JobForm from "./JobForm";

/**
 * TODO what is this and how is it different than dashboard?
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
        <h2>Job Applications</h2>
        <button onClick={this.handleShowJobForm}>Add Job</button>
        {/* add table here */}
        {this.props.isShowingJobForm && <JobForm />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isShowingJobForm: state.toggleDisplays.isShowingJobForm
  };
};

export default connect(mapStateToProps)(Tracker);
