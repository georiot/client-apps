import React from 'react';
import {
  ScrollView,
  View,
  Text
} from 'react-native';
import LinksAndGroupsScreenNavBar from '../navbars/LinksAndGroupsScreenNavBar';
import styles from '../styles/index';
import * as constants from '../constants';

export default class LinksAndGroupsScreen extends React.Component {
  render() {
    return (
      <View style={styles.global.container}>
          <LinksAndGroupsScreenNavBar />
          <ScrollView style={styles.global.main} contentContainerStyle={styles.global.scrollViewMain}>
            <Text>This is the Links and Groups screen</Text>
          </ScrollView>
        </View>
    );
  }
}