import React from 'react';
import { StyleSheet } from 'react-native';
import * as constants from '../constants';

const buttonSize = constants.buttonSize;

const styles = StyleSheet.create({
  topButtonMenu: {
    height: buttonSize,
    width: buttonSize,
  },

  bottomButtonMenu: {
    height: buttonSize,
    width: buttonSize
  },
  
  general: {
    width: 200,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#00b9ee',
    alignContent: 'center',
    justifyContent: 'center'
  },

  generalButtonText: {
      textAlign: 'center',
      color: 'white',
      fontFamily: 'OpenSans_Regular',
      fontSize: 15
  }
});

module.exports = styles;