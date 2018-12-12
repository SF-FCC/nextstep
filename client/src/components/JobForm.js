import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { sources } from '../data';
import styles from './JobForm.module.css';

const SourceOptionsList = ({ companyNames, handleClick }) => {
  if (companyNames) {
    return (
      <ul>
        {companyNames.map(companyArr => {
          return (
            <li key={companyArr[1]} 
                onClick={handleClick.bind(this, companyArr)}>
              <span>{companyArr[1] + ' - '}</span>
              <span>{companyArr[0]}</span>
            </li>
          )
        })}
      </ul>
    )
  } else {
    return (
      <ul>
      </ul>
    )
  }
}

const DisplaySource = ({ sourceSymbol, source, reset }) => (
  <div onClick={reset}>
    <span>{sourceSymbol + ' - '}</span>
    <span>{source}</span>
  </div>
)

class JobForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobPostingUrl: '',
      company: '',
      jobTitle: '',
      status: 'interested',
      location: '',
      source: '',
      sourceSymbol: '',
      sourceOptions: null,
      displaySourceForm: true,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSourceOptionSelect = this.handleSourceOptionSelect.bind(this);
    this.resetSourceOptionSelect = this.resetSourceOptionSelect.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }
  handleSourceOptionSelect(companyName) {
    this.setState({sourceSymbol: companyName[1]});
    this.setState({source: companyName[0]});
    this.setState({displaySourceForm: !this.state.displaySourceForm});
  }
  resetSourceOptionSelect() {
    this.setState({displaySourceForm: !this.state.displaySourceForm});
    this.setState({
      sourceSymbol: '',
      source: '',
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log('handling submit...', this.state);
    this.setState({
      jobPostingUrl: '',
      company: '',
      jobTitle: '',
      status: 'interested',
      location: '',
      source: '',
      sourceSymbol: '',
      sourceOptions: null,
      displaySourceForm: true,
    });
    this.props.hideForm();
  }
  toggleForm(e) {
    e.target.id === 'hide' && this.props.hideForm();
  }
  handleChange(e) {
    if (e.target.id === 'source') {
      this.setState({sourceOptions: sources[e.target.value.toLowerCase()]});
    }
    this.setState({[e.target.id]: e.target.value});
  }
  render() {
    return (
      <div id="hide" onClick={this.toggleForm} className={styles.formOuterContainer}>
      <div className={styles.formInnerContainer}>
        <h1 className={styles.h1}>Add New Job
          <span id="hide" onClick={this.toggleForm}>X</span>
        </h1>
        <form onSubmit={this.handleSubmit}>
          <label>Job Posting URL
            <input 
              id="jobPostingUrl"
              onChange={this.handleChange}
              placeholder="Search Companies..."
              value={this.state.jobPostingUrl} /></label>
          <label>Company
            <input 
              id="company"
              onChange={this.handleChange}
              value={this.state.company} /></label>
          <label>Job Title
            <input 
              id="jobTitle"
              onChange={this.handleChange}
              value={this.state.jobTitle} /></label>
          <label>Status
            <select 
              id="status"
              value={this.state.status}
              onChange={this.handleChange}>
              <option value="interested">Interested</option>
              <option value="applied">Applied</option>
              <option value="phoneCall">Phone Call</option>
              <option value="assignment">Assignment</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="accepted">Accepted</option>
              <option value="withdrawn">Withdrawn</option>
              <option value="expired">Expired</option>
              <option value="notAFit">Not A Fit</option>
            </select>
          </label>
          <label>Location
            <input 
              id="location"
              onChange={this.handleChange}
              value={this.state.location} /></label>
          <label>Source
            {this.state.displaySourceForm 
              ? 
                <div>
                  <input 
                    id="source"
                    placeholder="Where did you find this job?"
                    onChange={this.handleChange}
                    value={this.state.source} />
                    <SourceOptionsList
                      handleClick={this.handleSourceOptionSelect}
                      companyNames={this.state.sourceOptions} />
                </div>
              : 
                <DisplaySource 
                  reset={this.resetSourceOptionSelect}
                  sourceSymbol={this.state.sourceSymbol}
                  source={this.state.source} />}
          </label>
          <button>submit</button>
        </form>
      </div>
      </div>
    )
  }
}

JobForm.propTypes = {
  hideForm: PropTypes.func,
}

export default JobForm;
