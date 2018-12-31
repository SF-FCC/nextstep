import React, { Component } from "react";
import getCompanyDictionary from "../data/getCompanyDictionary";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CompaniesDropdown from "./CompaniesDropdown";
import styles from "./SearchForm.module.css";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      dropDownValues: [],
      companyDictionary: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.resetDropdown = this.resetDropdown.bind(this);
  }
  handleInputChange(e) {
    this.setState({ value: e.target.value }, () => {
      this.setState({ companyDictionary: getCompanyDictionary(this.props.jobApps) }, () => {
        if (this.state.value === "") {
          this.setState({ dropDownValues: [] });
        } else {
          let results = this.state.companyDictionary[this.state.value];
          this.setState({ dropDownValues: results || ["no results"] });
        }
      });
    });
  }
  resetDropdown() {
    this.setState({
      value: "",
      dropDownValues: []
    });
  }
  searchIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        id="Capa_1"
        width="1rem"
        height="1rem"
        viewBox="0 0 56.966 56.966"
        className={styles.search_svg}
      >
        <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
      </svg>
    );
  }

  render() {
    return (
      <form className={this.props.className}>
        <label htmlFor="_search" className={styles.search_icon}>
          {this.searchIcon()}
        </label>
        <div className={styles.search_container}>
          <input
            id="_search"
            onChange={this.handleInputChange}
            value={this.state.value}
            className={styles.search_input}
            placeholder="Search Company"
          />
          {this.state.dropDownValues && (
            <CompaniesDropdown
              resetDropdown={this.resetDropdown}
              companyNames={this.state.dropDownValues}
            />
          )}
        </div>
      </form>
    );
  }
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
