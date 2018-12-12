import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleJobForm } from '../actions';
import JobForm from './JobForm';

class Tracker extends Component {
  constructor(props) {
    super(props)
    this.handleToggleJob = this.handleToggleJob.bind(this);
  }
  handleToggleJob() {
    this.props.dispatch(toggleJobForm());
  }
  render() {
    return (
      <div>
        <h2>Job Applications</h2>
        <button onClick={this.handleToggleJob}>Add Job</button>
        {/* add table here */}
        {this.props.showJobForm && <JobForm />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    showJobForm: state.toggleDisplays.showJobForm,
  }
}

export default connect(mapStateToProps)(Tracker);
