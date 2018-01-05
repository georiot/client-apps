import React from 'react';
import CreateSimpleLinkScreen from '../pages/CreateSimpleLinkScreen';
import CreateSplitDestinationLinkScreen from '../pages/CreateSplitDestinationLinkScreen';
import CreateUserChoiceLandingPageLinkScreen from '../pages/CreateUserChoiceLandingPageLinkScreen';
import { TabNavigator, TabBarTop } from "react-navigation";
import * as constants from '../constants';

export default LinkCreationScreensNavigator = TabNavigator(
    {
      // do not change the order of the navigation
      SimpleLink: {
        screen: CreateSimpleLinkScreen,
      },
      SplitDestination: {
        screen: CreateSplitDestinationLinkScreen
      },
      UserChoiceLandingPage: {
        screen: CreateUserChoiceLandingPageLinkScreen
      }
    },
    {
      initialRouteName: 'SimpleLink',
      tabBarPosition: "top",
      tabBarComponent: TabBarTop, // to ensure display of indicator in iOS
      swipeEnabled: true,
      tabBarOptions: {
        showLabel: true,
        activeBackgroundColor: 'white',
        inactiveBackgroundColor: 'white',
        activeTintColor: '#59595b',
        inactiveTintColor: '#59595b',
        style: {
          height: constants.topNavBarHeight,
          backgroundColor: 'white',
          borderBottomColor: '#afafaf',
          borderBottomWidth: 0.5,
          elevation: 0 // for Android
        },
        tabStyle: {
          top: constants.buttonTopOffset-2,
          height: constants.topNavBarHeight,
          margin: 0,
          padding: 0
        },
        indicatorStyle: { // for Android
          backgroundColor: '#00b9ee'
        }
      }
    }  
  );