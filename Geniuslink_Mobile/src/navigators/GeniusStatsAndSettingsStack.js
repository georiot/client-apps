import React from 'react';
import GeniusStatsScreen from '../pages/GeniusStatsScreen';
import SettingsScreen from '../pages/SettingsScreen';
import { StackNavigator } from "react-navigation";

export default GeniusStatsAndSettingsNavigator = StackNavigator(
  {
    GeniusStats: {
      screen: GeniusStatsScreen,
    },
    Settings: {
      screen: SettingsScreen
    }
  },
);