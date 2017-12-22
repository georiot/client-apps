import React from 'react';
import { ActivityIndicator, ListView, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return listLinks()
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
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    
    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.ShortUrlCode}     {rowData.ProductUrl}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {  
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function listLinks() {
  const baseUrl = 'https://api.geni.us';
  const endpoint = '/v1/links/list';
  const groupId = 0;
  const maxlinks = 100;
  const key = '0831700ddf234e2cb07cfc005464f1f5';
  const secret = '3320582798ae432eaf577b9139552056';

  return fetch(baseUrl + endpoint + '?groupid=' + groupId + '&numberoflinks=' + maxlinks, {
    method: 'GET',
    headers: {
      'X-Api-Key': key,
      'X-Api-Secret': secret,
      Accept: 'application/json',
    }
  }).then(response => response.json());
}
