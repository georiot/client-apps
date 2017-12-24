import React from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import SearchBar from 'react-native-searchbar';
import TopNavigation from '../navbars/TopNavigationBar';
import styles from '../styles/index';
import * as constants from '../constants';

const topButtonSideOffset = constants.topButtonSideOffset;
const bottomButtonSideOffset = constants.bottomButtonSideOffset;

const items = [
  1337,
  'janeway',
  {
    lots: 'of',
    different: {
      types: 0,
      data: false,
      that: {
        can: {
          be: {
            quite: {
              complex: {
                hidden: [ 'gold!' ],
              },
            },
          },
        },
      },
    },
  },
  [ 4, 2, 'tree' ],
];

export default class LinksAndGroupsScreen extends React.Component {
  render() {
    return (
      <View style={styles.global.container}>
          <View style={[styles.navbar.topNavBar, {top:2*constants.buttonTopOffset-2}]}>
            <TouchableWithoutFeedback onPress={() => this.searchBar.show()}>
                <Image style={[styles.button.topButtonMenu, {top:constants.buttonTopOffset-(2*constants.buttonTopOffset-2), left: -topButtonSideOffset}]} source={require('../images/button-placeholder.png')} resizeMode='contain' />
            </TouchableWithoutFeedback>
            {/* The following 2 images are invisible --> for a more uniform formatting */}
            <Image style={[styles.global.logo, {opacity:0, top:constants.buttonTopOffset-(2*constants.buttonTopOffset-2)}]} source={require('../images/geniuslink-simpler.png')} resizeMode='contain' />
            <Image style={[styles.button.topButtonMenu, {opacity:0, top:constants.buttonTopOffset-(2*constants.buttonTopOffset-2), left: topButtonSideOffset}]} source={require('../images/button-placeholder.png')} resizeMode='contain' />
                  <SearchBar
                    ref={(ref) => this.searchBar = ref}
                    data={items}
                    width='100%'
                    heightAdjust={-constants.buttonTopOffset}
                    placeholder='Search by keyword or tag'
                    animate={false}
                    //onBack={()=> Keyboard.dismiss()}
                    clearOnBlur
                    //showOnLoad
                  />
          </View>
        <View style={styles.navbar.navSeparator} />
          <ScrollView style={styles.global.main} contentContainerStyle={styles.global.scrollViewMain}>
            <Text>This is the Links and Groups screen</Text>
          </ScrollView>
        </View>
    );
  }
}