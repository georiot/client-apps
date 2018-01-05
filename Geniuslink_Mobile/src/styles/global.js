import React from 'react';
import { StyleSheet } from 'react-native';
import * as constants from '../constants';

const dimensions = constants.dimensions;
const topNavBarHeight = constants.topNavBarHeight;
const bottomNavBarHeight = constants.bottomNavBarHeight;
const buttonTopOffset = constants.buttonTopOffset;

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    padding: 0,
    margin: 0,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  main: {
    flex: 1,
    width: dimensions.width
  },

  scrollViewMain: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },

  scrollViewInsideView: {
    padding: constants.padding
  },

  logo: {
    width: dimensions.width/3
  }
});

module.exports = styles;