import React from 'react';
import LinkCreationScreensNavigator from '../navigators/LinkCreationScreensStack';
import LinkCreationResultScreen from '../pages/LinkCreationResultScreen';
import { StackNavigator } from "react-navigation";

export default LinkCreationAndResultScreensNavigator = StackNavigator(
  {
    LinkCreation: {
      screen: LinkCreationScreensNavigator,
    },
    LinkCreationResult: {
      screen: LinkCreationResultScreen
    }
  },
);