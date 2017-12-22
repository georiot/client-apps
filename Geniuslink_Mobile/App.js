import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>

        <Text>Try and see a change.</Text>
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
  return fetch('https://api.geni.us/v1/links/list', {
    method: 'GET',
    headers: {
      'X-Api-Key': '0831700ddf234e2cb07cfc005464f1f5',
      'X-Api-Secret': '3320582798ae432eaf577b9139552056',
      Accept: 'application/json'
    }
  }).then(response => response.json())
    .then(responseJson => {
      return responseJson.Results;
    });
}
