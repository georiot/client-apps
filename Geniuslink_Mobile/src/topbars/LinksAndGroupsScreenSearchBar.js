import React from 'react';
import {
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import SearchBar from 'react-native-searchbar';
import styles from '../styles/index';
import * as constants from '../constants';

export default class LinksAndGroupsScreenSearchBar extends React.Component {
    render() {
      return (
        <View>
            <TouchableWithoutFeedback onPress={() => this.searchBar.show()}>
                <View style={[styles.navbar.topNavBar, {top:2*constants.buttonTopOffset-2}]}>
                    <Image style={[styles.button.topButtonMenu, {top:constants.buttonTopOffset-(2*constants.buttonTopOffset-2), left: -constants.topButtonSideOffset}]} source={require('../../assets/images/search-light.png')} resizeMode='contain' />
                    {/* The following 2 images are invisible --> for a more uniform formatting */}
                    <Image style={[styles.global.logo, {opacity:0, top:constants.buttonTopOffset-(2*constants.buttonTopOffset-2)}]} source={require('../../assets/images/geniuslink-light.png')} resizeMode='contain' />
                    <Image style={[styles.button.topButtonMenu, {opacity:0, top:constants.buttonTopOffset-(2*constants.buttonTopOffset-2), left: constants.topButtonSideOffset}]} source={require('../../assets/images/button-placeholder.png')} resizeMode='contain' />
                    <SearchBar
                    ref={(ref) => this.searchBar = ref}
                    data={null}
                    width='100%'
                    heightAdjust={-constants.buttonTopOffset}
                    placeholder='Search by keyword or tag'
                    //backButton={<Image style={[styles.button.topButtonMenu, {top:constants.buttonTopOffset-constants.buttonTopOffset-3}]} source={require('../../assets/images/back_lighttheme.png')} />}
                    iconColor='#59595b'
                    textColor='#59595b'
                    backCloseSize={20}
                    fontFamily='OpenSans_Regular'
                    fontSize={15}
                    animate={false}
                    clearOnBlur
                    />
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.navbar.navSeparator} />
        </View>
        );
    }
}