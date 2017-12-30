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
  TouchableOpacity
} from 'react-native';
import {
  Gravatar,
  GravatarApi
} from 'react-native-gravatar';
import UserProfileScreenNavBar from '../navbars/UserProfileScreenNavBar';
import styles from '../styles/index';
import * as constants from '../constants';

export default class UserProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.global.container}>
          <UserProfileScreenNavBar />
          <ScrollView style={styles.global.main} contentContainerStyle={styles.global.scrollViewMain}>
            <View // need another view for padding for scrolling to work
              style={[styles.global.scrollViewInsideView, {alignContent:'center'}]}>
                <Gravatar options={{
                    email: 'np@geni.us',
                    parameters: { "size": "1000", "d": "mm" },
                    secure: true
                  }}
                  style={style.round} />
                  <View style={{height: 25}} />
                  <Text style={[style.header, {fontSize: 22}]}>Natasha Petrus</Text>
                  <Text style={style.body}>np@geni.us</Text>
                  <Text style={style.body}>Power Plan, $499/mo.</Text>
                  <View style={{height: 10}} />
                  <View style={styles.button.general}>           
                    <Text style={styles.button.generalButtonText}
                        onPress={() => Linking.openURL('https://my.geni.us/account/plans')}>
                        Change Your Plan
                    </Text>
                  </View>

                  <View style={{height: 25}} />
                  <Text style={style.header}>Refer a friend</Text>
                  <View style={{height: 5}} />
                  <TouchableOpacity
                    style={[styles.button.general, {backgroundColor: '#9e9e9e'}]}
                    onPress={() => Clipboard.setString('https://geni.us/X574j')}> 
                    <View style={{flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>    
                      <Text style={[styles.button.generalButtonText, {color: 'black'}]}>
                          https://geni.us/X574j
                      </Text>
                      <Image source={require('../../assets/images/clipboard_lighttheme_2.png')}
                          style={{height: 25, width: 25}}
                          resizeMode='contain' />
                    </View>
                  </TouchableOpacity>
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