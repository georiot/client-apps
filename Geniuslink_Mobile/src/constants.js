import {
    Dimensions
} from 'react-native';

export const dimensions = Dimensions.get('window');
export const topNavBarHeight = 75;
export const bottomNavBarHeight = 60;
export const buttonSize = 30;
export const buttonTopOffset = 15;
export const topButtonSideOffset = 35/100*dimensions.width-1.5*buttonSize;
export const bottomButtonSideOffset = 20/100*dimensions.width-buttonSize;