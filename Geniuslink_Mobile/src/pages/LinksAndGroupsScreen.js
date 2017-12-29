import React from 'react';
import {
  ListView,
  ScrollView,
  Text,
  View
} from 'react-native';
import LinksAndGroupsScreenNavBar from '../navbars/LinksAndGroupsScreenNavBar';
import styles from '../styles/index';
import * as constants from '../constants';
import { listLinks, listGroups } from '../backend/genius-api.js';

export default class LinksAndGroupsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    var key = '0831700ddf234e2cb07cfc005464f1f5';
    var secret = '3320582798ae432eaf577b9139552056';

    var getLinks = listLinks(key, secret);
    var getGroups = listGroups(key, secret);

    var afterEndpoints = Promise.all([getLinks, getGroups])
      .then(values => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.setState({
          isLoading: false,
          allLinks: ds.cloneWithRows(values[0]),
          allGroups: ds.cloneWithRows(values[1])
        }, function() {});
      });

    return afterEndpoints;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.global.container}>
          <LinksAndGroupsScreenNavBar />
          <ScrollView style={styles.global.main} contentContainerStyle={styles.global.scrollViewMain}>
            <Text>This is the Links and Groups screen</Text>
          </ScrollView>
        </View>
      );
    }

    return (
      <View style={styles.global.container}>
        <LinksAndGroupsScreenNavBar />
        <ScrollView style={styles.global.main} scrollEnabled={false} contentContainerStyle={styles.global.scrollViewMain}>
          {/* need to change formatting later using constants,
              need to change ListView to FlatList --> ListView is to be deprecated */}
          
          <Text>Top Links</Text>
          <View style={{height: 180}}>
            <ListView
              dataSource={this.state.allLinks}
              renderRow={(r) => <Text>{r.ShortUrlCode} {r.ProductUrl}</Text>}/>
          </View>
          
          <View style={{height: 25}} />

          <Text>Top Groups</Text>
          <View style={{height: 180}}>
            <ListView
              dataSource={this.state.allGroups}
              renderRow={(r) => <Text>{r.Name} {r.Description} {r.Id}</Text>}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}