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
import { getReportsClicksTrendByResolution, getLinkErrors } from '../backend/genius-api.js';

export default class GeniusStatsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    var key = '36f712e665aa475c889d3e3cae55eefa';
    var secret = 'ed16131bc5764ff9bd4c8b147fc48f0c';

    var getLifetimeStats = getReportsClicksTrendByResolution(key, secret);
    var getTotalLinkErrors = getLinkErrors(key, secret);

    var afterEndpoints = Promise.all([getLifetimeStats, getTotalLinkErrors])
      .then(values => {
        this.setState({
          isLoading: false,
          lifetimeClicks: values[0][0]['Value'].Clicks,
          totalLinkErrors: values[1]
        }, function() {});
      });

    return afterEndpoints;
  }

  render() {
    return (
      <View style={styles.global.container}>
          <TopNavigation/>
          <ScrollView style={styles.global.main} contentContainerStyle={styles.global.scrollViewMain}>
            <View style={{flexDirection: 'row'}}>
              {/* stat 1 */}
              <View style={{alignContent: 'center', justifyContent: 'center'}}>
                <Text style={styles.global.lifetimeStatsTextHeader}>Total clicks</Text>
                <View style={styles.global.lifetimeStats}>
                  <Text style={styles.global.lifetimeStatsTextBody}>{this.state.isLoading? '?' : this.state.lifetimeClicks}</Text>
                </View>
              </View>
              {/* separator */}
              <View style={{width: 50}} />
              {/* stat 2 */}
              <View style={{alignContent: 'center', justifyContent: 'center'}}>
                <Text style={styles.global.lifetimeStatsTextHeader}>Total link errors</Text>
                <View style={styles.global.lifetimeStats}>
                  <Text style={styles.global.lifetimeStatsTextBody}>{this.state.isLoading? '?' : this.state.totalLinkErrors}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
      </View>
    );
  }
}