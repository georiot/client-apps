import React from 'react';
import { StyleSheet } from 'react-native';
import * as constants from '../constants';

const buttonSize = constants.buttonSize;
const buttonTopOffset = constants.buttonTopOffset;

const styles = StyleSheet.create({
  topButtonMenu: {
    height: buttonSize,
    width: buttonSize,
    top: buttonTopOffset
  },

  bottomButtonMenu: {
    height: buttonSize,
    width: buttonSize
  },
});

module.exports = styles;