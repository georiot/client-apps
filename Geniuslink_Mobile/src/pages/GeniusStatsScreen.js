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

export default class GeniusStatsScreen extends React.Component {

  render() {
    return (
      <View style={styles.global.container}>
          <TopNavigation/>
          <ScrollView style={styles.global.main} contentContainerStyle={styles.global.scrollViewMain}>
            <Text>This is the GENIUS stats screen!!</Text>
          </ScrollView>
      </View>
    );
  }
}