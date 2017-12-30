import React, { Component } from "react";
import GeniusStatsScreen from "../pages/GeniusStatsScreen";
import FacebookStatsScreen from "../pages/FacebookStatsScreen";
import LinksAndGroupsScreen from "../pages/LinksAndGroupsScreen";
import UserProfileScreen from "../pages/UserProfileScreen";
import BuildALinkScreen from "../pages/BuildALinkScreen";
import {
  Image,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import { TabNavigator } from "react-navigation";
import { Button, Text, Icon, Footer, FooterTab } from "native-base";

import styles from '../styles/index';
import * as constants from '../constants';

const topButtonSideOffset = constants.topButtonSideOffset;
const bottomButtonSideOffset = constants.bottomButtonSideOffset;

export default (MainScreenNavigator = TabNavigator(
  {
    // do not change the order of the navigation
    GeniusStats: {
      screen: GeniusStatsScreen,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Image
            source={require('../../assets/images/geniusIcon.png')}
            style={[styles.button.bottomButtonMenu, {tintColor: tintColor}]}
          />
        )
      }
    },
    FacebookStats: {
      screen: FacebookStatsScreen,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Image
            source={require('../../assets/images/facebookIcon.png')}
            style={[styles.button.bottomButtonMenu, {tintColor: tintColor}]}
          />
        )
      }
    },
    BuildALink: {
      screen: BuildALinkScreen,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Image
            source={require('../../assets/images/plusButton.png')}
            style={[styles.button.bottomButtonMenu, {tintColor: tintColor}]}
          />
        )
      }
    },
    LinksAndGroups: {
      screen: LinksAndGroupsScreen,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Image
            source={require('../../assets/images/simpleLink.png')}
            style={[styles.button.bottomButtonMenu, {tintColor: tintColor}]}
          />
        )
      }
    },
    UserProfile: {
      screen: UserProfileScreen,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Image
            source={require('../../assets/images/userButton.png')}
            style={[styles.button.bottomButtonMenu, {tintColor: tintColor}]}
          />
        )
      }
    }
  },
  {
    tabBarPosition: "bottom",
    lazy: true,
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      showLabel: true,
      activeBackgroundColor: 'white',
      inactiveBackgroundColor: 'white',
      activeTintColor: 'black',
      inactiveTintColor: '#59595b',
      style: {
        height: constants.bottomNavBarHeight,
        backgroundColor: 'white',
        borderTopWidth: 0.5,
        borderTopColor: '#59595b'
      },
      tabStyle: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: constants.bottomNavBarHeight,
        margin: 0,
        padding: 0
      },
      indicatorStyle: { // not for iOS?
        backgroundColor: 'white'
      }
    }
    // for custom icons --> can't use tinting & indicator feature
    // tabBarComponent: props => {
    //   return (
    //     <View>
    //         <View style={styles.navbar.navSeparator} />
    //         <View style={styles.navbar.bottomNavBar}>
    //             <TouchableWithoutFeedback onPress={() => props.navigation.navigate("GeniusStats")}>
    //                 <Image
    //                     style={[styles.button.bottomButtonMenu, {left: -2*bottomButtonSideOffset}]}
    //                     source={require('../../assets/images/geniusIcon.png')}
    //                     resizeMode='contain'

    //                 />
    //             </TouchableWithoutFeedback>
    //             <TouchableWithoutFeedback onPress={() => props.navigation.navigate("FacebookStats")}>
    //               <Image
    //                   style={[styles.button.bottomButtonMenu, {left: -1*bottomButtonSideOffset}]}
    //                   source={require('../../assets/images/facebookIcon.png')}
    //                   resizeMode='contain'
    //               />
    //             </TouchableWithoutFeedback>
    //             <TouchableWithoutFeedback onPress={() => props.navigation.navigate("BuildALink")}>
    //               <Image
    //                   style={[styles.button.bottomButtonMenu, {left: 0*bottomButtonSideOffset}]}
    //                   source={require('../../assets/images/plusButton.png')}
    //                   resizeMode='contain'
    //               />
    //             </TouchableWithoutFeedback>
    //             <TouchableWithoutFeedback onPress={() => props.navigation.navigate("LinksAndGroups")}>
    //               <Image
    //                   style={[styles.button.bottomButtonMenu, {left: 1*bottomButtonSideOffset}]}
    //                   source={require('../../assets/images/simpleLink.png')}
    //                   resizeMode='contain'
    //               />
    //             </TouchableWithoutFeedback>
    //             <TouchableWithoutFeedback onPress={() => props.navigation.navigate("UserProfile")}>
    //               <Image
    //                   style={[styles.button.bottomButtonMenu, {left: 2*bottomButtonSideOffset}]}
    //                   source={require('../../assets/images/userButton.png')}
    //                   resizeMode='contain'
    //               />
    //             </TouchableWithoutFeedback>
    //         </View>
    //   </View>
    //   );
    // }
  }
));