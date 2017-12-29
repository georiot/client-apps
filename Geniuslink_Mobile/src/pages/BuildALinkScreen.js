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
import LinkCreationNavBar from '../navbars/LinkCreationNavBar'
export default class BuildALinkScreen extends React.Component {
  render() {
    return (
      <View style={styles.global.container}>
          <TopNavigation/>
          <LinkCreationNavBar/>            
          <ScrollView style={styles.global.main} contentContainerStyle={styles.global.scrollViewMain}>
          <Text>This is the GENIUS Link Creation Screen!</Text>
          </ScrollView>
      </View>
    );
  }
}