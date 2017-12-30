import * as Expo from "expo";
import React, { Component } from "react";
import Login from './src/pages/LoginPage.js';
import Home from './src/pages/HomePage.js';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: false, // set to true to see splash screen
      authenticated: true, // set to true to see home page, false to see login page
      isReady: false // to wait for fonts to load, do not change
    };
  }

  componentWillMount() {
    this.loadFonts();
  }
  
  async loadFonts() {
    await Expo.Font.loadAsync({
      OpenSans_Bold: require("./assets/fonts/OpenSans-Bold.ttf"),
      OpenSans_BoldItalic: require("./assets/fonts/OpenSans-BoldItalic.ttf"),
      OpenSans_ExtraBold: require("./assets/fonts/OpenSans-ExtraBold.ttf"),
      OpenSans_ExtraBoldItalic: require("./assets/fonts/OpenSans-ExtraBoldItalic.ttf"),
      OpenSans_Italic: require("./assets/fonts/OpenSans-Italic.ttf"),
      OpenSans_Light: require("./assets/fonts/OpenSans-Light.ttf"),
      OpenSans_LightItalic: require("./assets/fonts/OpenSans-LightItalic.ttf"),
      OpenSans_Regular: require("./assets/fonts/OpenSans-Regular.ttf"),
      OpenSans_Semibold: require("./assets/fonts/OpenSans-Semibold.ttf"),
      OpenSans_SemiboldItalic: require("./assets/fonts/OpenSans-SemiboldItalic.ttf")
    });
    this.setState({ isReady: true });
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
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    if (this.state.loading) return null; // null --> change to render loading/splash screen etc

    if (!this.state.authenticated) {
      return <Login onLoginPress={() => this.setState({authenticated: true})}/>;
    }

    return <Home onLogoutPress={() => this.setState({authenticated: false})}/>;
  }
}
