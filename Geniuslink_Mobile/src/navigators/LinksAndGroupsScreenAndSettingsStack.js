import React from 'react';
import LinksAndGroupsScreen from '../pages/LinksAndGroupsScreen';
import SettingsScreen from '../pages/SettingsScreen';
import { StackNavigator } from "react-navigation";

export default LinksAndGroupsScreenAndSettingsNavigator = StackNavigator(
  {
    LinksAndGroups: {
      screen: LinksAndGroupsScreen,
    },
    Settings: {
      screen: SettingsScreen
    }
  },
);