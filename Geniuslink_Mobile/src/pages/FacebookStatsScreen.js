import React from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';
import styles from '../styles/index';
import * as constants from '../constants';

export default class FacebookStatsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header:
      <View>
        <View style={styles.navbar.topNavBar}>
          <View style={[styles.navbar.topNavBarSubComponent, {alignItems: 'flex-start', justifyContent: 'center', top: constants.buttonTopOffset}]}>
            <Image style={[styles.global.logo, {opacity: 0}]} source={require('../../assets/images/geniuslink-light.png')} resizeMode='contain' resizeMethod='scale' />
          </View>
          <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Settings')}
                >
                <View style={[styles.navbar.topNavBarSubComponent, {alignItems: 'flex-end'}]}>
                  <Image style={styles.button.topButtonMenu} source={require('../../assets/images/optionsButton-light.png')} resizeMode='contain' />
                </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.navbar.navSeparator} />
      </View>
  });

  render() {
    return (
      <View style={styles.global.container}>
          <ScrollView style={styles.global.main} contentContainerStyle={styles.global.scrollViewMain}>
            <View // need another view for padding for scrolling to work
                style={styles.global.scrollViewInsideView}>
              <Text style={style.header}>Facebook Campaign</Text>
              <Text style={style.title}>Connect your Facebook profile to access campaign stats here.</Text>
              
              <View style={{alignItems:'center'}}>
                  <Image
                      style={{width:constants.dimensions.width*0.7, top:-2*constants.padding}}
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