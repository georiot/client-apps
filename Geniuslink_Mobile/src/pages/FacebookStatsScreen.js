import React from 'react';
import {
  ScrollView,
  View,
  Text
} from 'react-native';
import TopNavigation from '../navbars/TopNavigationBar';
import styles from '../styles/index';
import * as constants from '../constants';

const topButtonSideOffset = constants.topButtonSideOffset;
const bottomButtonSideOffset = constants.bottomButtonSideOffset;

export default class FacebookStatsScreen extends React.Component {
  render() {
    return (
      <View style={styles.global.container}>
          <TopNavigation />
          <ScrollView style={styles.global.main} contentContainerStyle={styles.global.scrollViewMain}>
            <View // need another view for padding for scrolling to work
                style={styles.global.scrollViewInsideView}>
              <Text>This is the FACEBOOK stats screen</Text>
            </View>
          </ScrollView>
      </View>
    );
  }
}