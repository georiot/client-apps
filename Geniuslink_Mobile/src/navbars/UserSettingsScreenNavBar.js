import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import styles from '../styles/index';
import * as constants from '../constants';

const topButtonSideOffset = constants.topButtonSideOffset;
const bottomButtonSideOffset = constants.bottomButtonSideOffset;

export default class UserSettingsScreenNavBar extends React.Component {

  render() {
   
    return (
      <View>
        <View style={styles.navbar.topNavBar}>
            <Text style={style.header}>@natashapetrus</Text>
            <Image style={[styles.button.topButtonMenu, {left: topButtonSideOffset}]} source={require('../../assets/images/options_lighttheme.png')} resizeMode='contain' />
        </View>
        <View style={styles.navbar.navSeparator} />
      </View>
    );
  }
}

{/* specific style */}
const style = StyleSheet.create({
    header: {
        textAlign: 'left',
        color: '#59595b',
        fontFamily:'OpenSans_Semibold',
        fontSize: 18,
        top:constants.buttonTopOffset,
        left: -topButtonSideOffset
    }
  });