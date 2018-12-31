import React, { Component } from 'react';
import getCompanyDictionary from '../data/getCompanyDictionary';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CompaniesDropdown from './CompaniesDropdown';
import styles from './SearchForm.module.css';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      dropDownValues: [],
      companyDictionary: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.resetDropdown = this.resetDropdown.bind(this);
  }
  handleInputChange(e) {
    this.setState({ value: e.target.value }, () => {
      this.setState({ companyDictionary: getCompanyDictionary(this.props.jobApps) }, () => {
        if (this.state.value === '') {
          this.setState({ dropDownValues: [] });
        } else {
          let results = this.state.companyDictionary[this.state.value];
          this.setState({ dropDownValues: results || ['no results']})
        }
      })
    });
  }
  resetDropdown() {
    this.setState({ 
      value: '',
      dropDownValues: [],
    });
  }
  render() {
    return (
      <form className={this.props.className}>
        <input
          className={styles.input}
          onChange={this.handleInputChange} 
          placeholder="company search"
          value={this.state.value} />
        {this.state.dropDownValues && 
          <CompaniesDropdown 
            resetDropdown={this.resetDropdown}
            companyNames={this.state.dropDownValues}
          />
        )}
      </form>
    );
  }

SearchForm.propTypes = {
  jobApps: PropTypes.array,
  className: PropTypes.string
};
SearchForm.defaultProps = {
  className: ""
};

const mapStateToProps = state => {
  return {
    jobApps: state.jobApp.jobApps
  };
};

export default connect(mapStateToProps)(SearchForm);
