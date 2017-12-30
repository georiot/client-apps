import React, { Component } from "react";
import GeniusStatsScreen from "../pages/GeniusStatsScreen";
import FacebookStatsScreen from "../pages/FacebookStatsScreen";
import LinksAndGroupsScreen from "../pages/LinksAndGroupsScreen";
import UserSettingsScreen from "../pages/UserSettingsScreen";
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
    GeniusStats: { screen: GeniusStatsScreen },
    FacebookStats: { screen: FacebookStatsScreen },
    BuildALink: { screen: BuildALinkScreen },
    LinksAndGroups: { screen: LinksAndGroupsScreen },
    UserSettings: { screen: UserSettingsScreen }
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      return (
        <View>
            <View style={styles.navbar.navSeparator} />
            <View style={styles.navbar.bottomNavBar}>
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate("GeniusStats")}>
                    <Image
                        style={[styles.button.bottomButtonMenu, {left: -2*bottomButtonSideOffset}]}
                        source={require('../../assets/images/genius_lighttheme.png')}
                        resizeMode='contain'

                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate("FacebookStats")}>
                  <Image
                      style={[styles.button.bottomButtonMenu, {left: -1*bottomButtonSideOffset}]}
                      source={require('../../assets/images/facebook_lighttheme.png')}
                      resizeMode='contain'
                  />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate("BuildALink")}>
                  <Image
                      style={[styles.button.bottomButtonMenu, {left: 0*bottomButtonSideOffset}]}
                      source={require('../../assets/images/createlink_lighttheme.png')}
                      resizeMode='contain'
                  />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate("LinksAndGroups")}>
                  <Image
                      style={[styles.button.bottomButtonMenu, {left: 1*bottomButtonSideOffset}]}
                      source={require('../../assets/images/simplelink_lighttheme.png')}
                      resizeMode='contain'
                  />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate("UserSettings")}>
                  <Image
                      style={[styles.button.bottomButtonMenu, {left: 2*bottomButtonSideOffset}]}
                      source={require('../../assets/images/user_lighttheme.png')}
                      resizeMode='contain'
                  />
                </TouchableWithoutFeedback>
            </View>
      </View>
      );
    }
  }
));