import React, { Component } from 'react';
import getCompanyDictionary from '../data/getCompanyDictionary';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CompaniesDropdown from './CompaniesDropdown';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      dropDownValues: null,
      companyDictionary: {}
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.resetDropdown = this.resetDropdown.bind(this);
  }
  handleInputChange(e) {
    this.setState({ value: e.target.value }, () => {
      this.setState({ companyDictionary: getCompanyDictionary(this.props.jobApps) }, () => {
        this.setState({ dropDownValues: this.state.companyDictionary[this.state.value] })
      })
    });
  }
  resetDropdown() {
    this.setState({ 
      value: '',
      dropDownValues: null,
    });
  }
  render() {
    return (
      <form>
        <input onChange={this.handleInputChange} value={this.state.value} />
        {this.state.dropDownValues && 
          <CompaniesDropdown 
            resetDropdown={this.resetDropdown}
            companyNames={this.state.dropDownValues} />}
      </form>
    )
  }
}

SearchForm.propTypes = {
  jobApps: PropTypes.array,
}

const mapStateToProps = state => {
  return {
    jobApps: state.jobApp.jobApps,
  };
};

export default connect(mapStateToProps)(SearchForm);
