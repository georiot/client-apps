import React from 'react';
import FacebookStatsScreen from '../pages/FacebookStatsScreen';
import SettingsScreen from '../pages/SettingsScreen';
import { StackNavigator } from "react-navigation";

export default FacebookStatsAndSettingsNavigator = StackNavigator(
  {
    FacebookStats: {
      screen: FacebookStatsScreen,
    },
    Settings: {
      screen: SettingsScreen
    }
  },
);