import React, { Component } from 'react';
import GeniusStatsScreen from '../pages/GeniusStatsScreen';
import FacebookStatsScreen from '../pages/FacebookStatsScreen';
import LinksAndGroupsScreen from '../pages/LinksAndGroupsScreen';
import BuildALinkScreen from '../pages/BuildALinkScreen';
import UserProfileAndSettingsNavigator from './UserProfileAndSettingsStack';
import GeniusStatsAndSettingsNavigator from './GeniusStatsAndSettingsStack';
import FacebookStatsAndSettingsNavigator from './FacebookStatsAndSettingsStack';
import LinkCreationScreensNavigator from './LinkCreationScreensStack';
import {
  Image,
  View,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';
import { TabNavigator, TabBarBottom, NavigationActions } from "react-navigation";

import styles from '../styles/index';
import * as constants from '../constants';

const topButtonSideOffset = constants.topButtonSideOffset;
const bottomButtonSideOffset = constants.bottomButtonSideOffset;

export default MainScreenNavigator = TabNavigator(
  {
    GeniusStats: {
      screen: GeniusStatsAndSettingsNavigator,
      index: 0,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Image
            source={require('../../assets/images/geniusIcon.png')}
            style={[styles.button.bottomButtonMenu, {tintColor: tintColor, top: constants.tabBarBottomPosition}]}
          />
        )
      }
    },
    FacebookStats: {
      screen: FacebookStatsAndSettingsNavigator,
      index: 1,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Image
            source={require('../../assets/images/facebookIcon.png')}
            style={[styles.button.bottomButtonMenu, {tintColor: tintColor, top: constants.tabBarBottomPosition}]}
          />
        )
      }
    },
    LinkCreation: {
      screen: LinkCreationScreensNavigator,
      index: 2,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Image
            source={require('../../assets/images/plusButton.png')}
            style={[styles.button.bottomButtonMenu, {tintColor: tintColor, top: constants.tabBarBottomPosition}]}
          />
        )
      }
    },
    LinksAndGroups: {
      screen: LinksAndGroupsScreen,
      index: 3,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Image
            source={require('../../assets/images/simpleLink.png')}
            style={[styles.button.bottomButtonMenu, {tintColor: tintColor, top: constants.tabBarBottomPosition}]}
          />
        )
      }
    },
    UserProfileAndSettings: {
      screen: UserProfileAndSettingsNavigator,
      index: 4,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Image
            source={require('../../assets/images/userButton.png')}
            style={[styles.button.bottomButtonMenu, {tintColor: tintColor, top: constants.tabBarBottomPosition}]}
          />
        )
      }
    }
  },
  {
    tabBarComponent: TabBarBottom,
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
    },
    // UNCOMMENT LATER AFTER EVERYTHING HAS NAVIGATORS
    // tabBarComponent: props => {
    //   const {navigation, navigationState} = props
      
    //   const jumpToIndex = index => {
    //     const lastPosition = navigationState.index
    //     const tab = navigationState.routes[index]
    //     const tabRoute = tab.routeName
    //     const firstRoute = tab.routes[0].routeName

    //     const tabAction = NavigationActions.navigate({ routeName: tabRoute });
    //     const firstScreenAction = NavigationActions.reset({ index: 0,
    //       actions: [ NavigationActions.navigate({ routeName: firstRoute }) ]
    //     });
    //     navigation.dispatch(tabAction);
    //     navigation.dispatch(firstScreenAction);
    //   }
    //   return <TabBarBottom {...props} jumpToIndex={jumpToIndex}/>
    // }
  }
);