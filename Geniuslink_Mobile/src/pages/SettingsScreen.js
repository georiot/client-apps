import React from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  Linking,
  Clipboard,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Gravatar,
  GravatarApi
} from 'react-native-gravatar';
import { NavigationActions } from 'react-navigation';
import styles from '../styles/index';
import * as constants from '../constants';

export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header:
      <View>
          <View style={styles.navbar.topNavBar}>
            <View style={[styles.navbar.topNavBarSubComponent, {justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection: 'row'}]}>
                  <TouchableWithoutFeedback
                    onPress={() => navigation.dispatch(NavigationActions.back({key: null}))}>
                    <Image style={styles.button.topButtonMenu} source={require('../../assets/images/backButton-light.png')} resizeMode='contain' />
                  </TouchableWithoutFeedback>
                  <Text style={style.header}>Options</Text>
            </View>
            <View style={[styles.navbar.topNavBarSubComponent, {alignItems: 'flex-end'}]} />
          </View>
          <View style={styles.navbar.navSeparator} />
        </View>
  });

  // static navigationOptions = ({ navigation }) => ({
  //   header:
  //     <View>
  //         <View style={[styles.navbar.topNavBar, {justifyContent:'flex-start'}]}>
  //           <View style={{paddingLeft: constants.buttonSize/2, paddingRight: constants.buttonSize/2}}>
  //           <TouchableWithoutFeedback
  //                 onPress={() => navigation.dispatch(NavigationActions.back({key: null}))}
  //                 >

  //                 <Image style={styles.button.topButtonMenu} source={require('../../assets/images/backButton-light.png')} resizeMode='contain' />
  //               </TouchableWithoutFeedback>
  //             </View>
  //             <View style={{height: constants.buttonSize/2}} />
  //             <Text style={style.header}>Options</Text>
  //           </View>
  //         <View style={styles.navbar.navSeparator} />
  //       </View>
  // });

  render() {
    return (
      <View style={styles.global.container}>
          <ScrollView style={styles.global.main} contentContainerStyle={styles.global.scrollViewMain}>
            <View // need another view for padding for scrolling to work
              style={[styles.global.scrollViewInsideView, {alignContent:'center'}]}>
                <Text style={style.heading}>Settings here</Text>
            </View>
          </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  round: {
    width:175,
    height:175,
    borderRadius:125
  },

  header: {
    textAlign: 'left',
    color: '#59595b',
    fontFamily:'OpenSans_Regular',
    fontSize: constants.screenHeaderTextFontSize,
    top: constants.screenHeaderTextTopOffset,
    marginLeft: 15
  },

  heading: {
    textAlign: 'center',
    fontFamily: 'OpenSans_Semibold',
    fontSize: 18,
    color: '#59595b'
  },

  body: {
    textAlign: 'center',
    fontFamily: 'OpenSans_Regular',
    fontSize: 15,
    color: '#59595b'
  }
});