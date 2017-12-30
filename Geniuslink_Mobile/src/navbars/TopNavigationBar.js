import React from 'react';
import {
  Image,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import styles from '../styles/index';
import * as constants from '../constants';

const topButtonSideOffset = constants.topButtonSideOffset;
const bottomButtonSideOffset = constants.bottomButtonSideOffset;


export default class TopNavigation extends React.Component {

  render() {
   
    return (
      <View>
        <View style={styles.navbar.topNavBar}>
          <Image style={[styles.global.logo, {left: -topButtonSideOffset}]} source={require('../../assets/images/geniuslink-simpler.png')} resizeMode='contain' />
          <TouchableWithoutFeedback onPress={ ()=> alert("IHateThisThing")}>
              <Image style={[styles.button.topButtonMenu, {opacity:0}]} source={require('../../assets/images/button-placeholder.png')} resizeMode='contain' />
          </TouchableWithoutFeedback>
            <Image style={[styles.button.topButtonMenu, {left: topButtonSideOffset}]} source={require('../../assets/images/options_lighttheme.png')} resizeMode='contain' />
        </View>
        <View style={styles.navbar.navSeparator} />
      </View>
    );
  }
}