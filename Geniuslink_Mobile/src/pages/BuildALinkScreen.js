import React from 'react';
import {
  ScrollView,
  View,
  Button,
  Text
} from 'react-native';
import TopNavigation from '../navbars/TopNavigationBar';
import styles from '../styles/index';
import * as constants from '../constants';
import LinkSelection from '../navbars/LinkCreationNavBar'
export default class GeniusStatsScreen extends React.Component {
  render() {
    return (
      <View style={styles.global.container}>
          <TopNavigation />
          <LinkSelection />
          <ScrollView style={styles.global.main} contentContainerStyle={styles.global.scrollViewMain}>
            <Text>This is the GENIUS Link Creation Screen!</Text>
          </ScrollView>
      </View>
    );
  }
}