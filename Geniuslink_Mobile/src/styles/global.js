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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  main: {
    flex: 1,
    padding: 35, // might need to remove this to enable scrolling
    width: dimensions.width,
    height: dimensions.height-(topNavBarHeight+bottomNavBarHeight)
  },

  scrollViewMain: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  logo: {
    position: 'relative',
    width: '30%',
    top: buttonTopOffset,
  }
});

module.exports = styles;