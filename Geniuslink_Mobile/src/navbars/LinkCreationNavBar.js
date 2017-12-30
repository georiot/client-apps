import React from 'react';
import {
  Image,
  View
} from 'react-native';
import styles from '../styles/index';
import * as constants from '../constants';


const topButtonSideOffset = constants.topButtonSideOffset;
const bottomButtonSideOffset = constants.bottomButtonSideOffset;

export default class LinkCreationNavBar extends React.Component {
  render() {
    
     return (
       <View>
         <View style={styles.navbar.topNavBar}> 
             <Image style={[styles.button.topButtonMenu, {left: -topButtonSideOffset}]} source={require('../../assets/images/button-placeholder.png')} resizeMode='contain' />
             <Image style={styles.button.topButtonMenu} source={require('../../assets/images/button-placeholder.png')} resizeMode='contain' />
             <Image style={[styles.button.topButtonMenu, {left: topButtonSideOffset}]} source={require('../../assets/images/button-placeholder.png')} resizeMode='contain' />
         </View>
         <View style={styles.navbar.navSeparator} />
       </View>
     );
   }
}