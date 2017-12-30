import React from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';
import FacebookStatsScreenNavBar from '../navbars/FacebookStatsScreenNavBar';
import styles from '../styles/index';
import * as constants from '../constants';

const topButtonSideOffset = constants.topButtonSideOffset;
const bottomButtonSideOffset = constants.bottomButtonSideOffset;

export default class FacebookStatsScreen extends React.Component {
  render() {
    return (
      <View style={styles.global.container}>
          <FacebookStatsScreenNavBar />
          <ScrollView style={styles.global.main} contentContainerStyle={styles.global.scrollViewMain}>
            <View // need another view for padding for scrolling to work
                style={styles.global.scrollViewInsideView}>
              <Text style={style.header}>Facebook Campaign</Text>
              <Text style={style.title}>Connect your Facebook profile to access campaign stats here.</Text>
              
              <View style={{alignItems:'center'}}>
                  <Image
                      style={{width:constants.dimensions.width-5*constants.padding, top:-2*constants.padding}}
                      resizeMethod='scale'
                      resizeMode='contain'
                      source={require('../../assets/images/facebook-placeholder.png')}
                    />
              </View>
            </View>
          </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  header: {
    fontFamily: 'OpenSans_Semibold',
    fontSize: 22,
    color: '#59595b'
  },
  title: {
    fontFamily: 'OpenSans_Regular',
    fontSize: 15,
    color: '#59595b'
  },
});