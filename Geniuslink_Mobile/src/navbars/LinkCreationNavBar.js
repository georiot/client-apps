import React from 'react';
import {
  Image,
  View
} from 'react-native';
import styles from '../styles/index';
import * as constants from '../constants';
import * as screens from '../../App';

const topButtonSideOffset = constants.topButtonSideOffset;
const bottomButtonSideOffset = constants.bottomButtonSideOffset;

export class BottomNavigation extends React.Component {
  render() {
    return (
      <View>
            <View style={styles.navbar.navSeparator} />
            <View style={styles.navbar.bottomNavBar}>                             
                <Image style={[styles.button.bottomButtonMenu, {left: 0*bottomButtonSideOffset}]} source={require('../images/button-placeholder.png')} resizeMode='contain' />
                <Image style={[styles.button.bottomButtonMenu, {left: 1*bottomButtonSideOffset}]} source={require('../images/button-placeholder.png')} resizeMode='contain' />
                <Image style={[styles.button.bottomButtonMenu, {left: 2*bottomButtonSideOffset}]} source={require('../images/button-placeholder.png')} resizeMode='contain' />
            </View>
      </View>
    );
  }
}