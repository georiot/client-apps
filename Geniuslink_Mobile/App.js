import React, { Component } from "react";
import Login from './src/pages/LoginPage.js';
import Home from './src/pages/HomePage.js';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: false, // set to true to see splash screen
      authenticated: true, // set to true to see home page, false to see login page
    };
  }

  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       this.setState({ loading: false, authenticated: true });
  //     } else {
  //       this.setState({ loading: false, authenticated: false });
  //     }
  //   });
  // }

  render() {
    if (this.state.loading) return null; // null --> change to render loading/splash screen etc

    if (!this.state.authenticated) {
      return <Login onLoginPress={() => this.setState({authenticated: true})}/>;
    }

    return <Home onLogoutPress={() => this.setState({authenticated: false})}/>;
  }
}
