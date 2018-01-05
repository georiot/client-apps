import React from 'react';
import { StyleSheet } from 'react-native';
import * as constants from '../constants';

const dimensions = constants.dimensions;
const topNavBarHeight = constants.topNavBarHeight;
const bottomNavBarHeight = constants.bottomNavBarHeight;

const styles = StyleSheet.create({
    topNavBar: {
      backgroundColor: '#fff',
      left: 0,
      alignItems: 'center',
      justifyContent: 'center',
      width: dimensions.width,
      height: topNavBarHeight,
      flexDirection:'row'
    },

    topNavBarSubComponent: {
      width: dimensions.width/2,
      height: topNavBarHeight,
      justifyContent: 'flex-end',
      padding: 10,
      paddingBottom: 10
    },
  
    bottomNavBar: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      left: 0,
      width: dimensions.width,
      height: bottomNavBarHeight,
      flexDirection:'row'
    },
  
    navSeparator: {
      borderWidth: 0.5,
      borderColor:'#afafaf',
      width: dimensions.width,
      margin: 0
    }
});

module.exports = styles;