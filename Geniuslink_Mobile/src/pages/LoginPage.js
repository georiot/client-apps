import React from 'react';
import {
  ScrollView,
  View,
  Button,
  Image,
  Text,
  TextInput
} from 'react-native';
import styles from '../styles/index';
import * as constants from '../constants';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.global.container}>
                <Image style={{width: '50%', top: 100}} source={require('../../assets/images/geniuslink-light.png')} resizeMode='contain' />
                <TextInput
                    style={{width: 75/100*constants.dimensions.width, height: 50, top: -50, paddingLeft:10, fontFamily:'OpenSans_Regular'}}
                    placeholder='  Username or email' />
                <TextInput
                    secureTextEntry
                    style={{width: 75/100*constants.dimensions.width, height: 50, top: -50, paddingLeft:10, fontFamily:'OpenSans_Regular'}}
                    placeholder='  Password' />
                <View style={styles.button.general}>           
                    <Text style={styles.button.generalButtonText}
                        onPress={this.props.onLoginPress}>
                        Sign In
                    </Text>
                  </View>
                <View style={{padding:200}} />
      </View>
    );
  }
}