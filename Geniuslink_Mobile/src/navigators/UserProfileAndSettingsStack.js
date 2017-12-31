import React from 'react';
import UserProfileScreen from '../pages/UserProfileScreen';
import SettingsScreen from '../pages/SettingsScreen';
import { StackNavigator } from "react-navigation";

export default UserProfileAndSettingsNavigator = StackNavigator(
  {
    UserProfile: {
      screen: UserProfileScreen,
    },
    Settings: {
      screen: SettingsScreen
    }
  },
);