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
          <ScrollView style={styles.global.main} contentContainerStyle={styles.global.scrollViewMain}>
                <Image style={{width: '50%', top: 100}} source={require('../../assets/images/geniuslink-simpler.png')} resizeMode='contain' />
                <TextInput
                    style={{width: 75/100*constants.dimensions.width, height: 50, top: -50}}
                    placeholder='  Username or email' />
                <TextInput
                    style={{width: 75/100*constants.dimensions.width, height: 50, top: -50}}
                    placeholder='  Password' />
                <Button 
                        onPress={this.props.onLoginPress}
                        title="Log in"
                        style={{top: -200}}
                    />
                <View style={{margin:200}} />
          </ScrollView>
      </View>
    );
  }
}