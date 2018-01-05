import {
    Dimensions
} from 'react-native';

export const dimensions = Dimensions.get('window');
export const topNavBarHeight = 75;
export const bottomNavBarHeight = 60;
export const buttonSize = 35;
export const buttonTopOffset = 15;
export const topButtonSideOffset = 35/100*dimensions.width-1.5*buttonSize;
export const bottomButtonSideOffset = 20/100*dimensions.width-buttonSize;
export const padding = 35;
export const tabBarBottomPosition = -12;
export const iOStabBarTopPosition = -5; // android doesn't need positioning
export const screenHeaderTextTopOffset = -5;
export const screenHeaderTextFontSize = 18;