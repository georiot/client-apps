import React from 'react';
import {
  ScrollView,
  View,
  Text
} from 'react-native';
import TopNavigation from '../common/TopNavigationBar';
import styles from '../styles/index';
import * as constants from '../constants';

const topButtonSideOffset = constants.topButtonSideOffset;
const bottomButtonSideOffset = constants.bottomButtonSideOffset;

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.global.container}>
          <ScrollView style={styles.global.main} contentContainerStyle={styles.global.scrollViewMain}>
            <Text>This is the login page</Text>
          </ScrollView>
      </View>
    );
  }
}