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
import { listLinks } from '../backend/genius-api.js';

export default class LinksAndGroupsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return listLinks('0831700ddf234e2cb07cfc005464f1f5', '3320582798ae432eaf577b9139552056')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.Results),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
          <View style={styles.global.container}>
            <LinksAndGroupsScreenNavBar />
            <ScrollView style={styles.global.main} contentContainerStyle={styles.global.scrollViewMain}>
              <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <Text>{rowData.ShortUrlCode}     {rowData.ProductUrl}</Text>}/>
            </ScrollView>
        </View>
      );
    }
  }
}