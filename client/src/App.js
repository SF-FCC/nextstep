import React, { Component } from "react";
import Navbar from "./components/Navbar";
import "./App.css";

/**
 * The main app entry point
 */
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="page-container">{this.props.children}</div>
      </div>
    );
  }
}

export default App;
