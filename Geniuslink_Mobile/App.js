import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  var PageOne = React.createClass({
    _handlePress() {
      this.props.navigator.push({id: 2,});
    },
  
    render() {
      return (
        <View style={[styles.container, {backgroundColor: 'green'}]}>
         </View>
      )
    },
  });
  
  var PageTwo = React.createClass({
    _handlePress() {
      this.props.navigator.pop();
    },
  
    render() {
      return (
        <View style={[styles.container, {backgroundColor: 'purple'}]}>
         </View>
      )
    },
  });
  
  var SampleApp = React.createClass({
    _renderScene(route, navigator) {
      if (route.id === 1) {
        return <PageOne navigator={navigator} />
      } else if (route.id === 2) {
        return <PageTwo navigator={navigator} />
      }
    },
  
    render() {
      return (
        <Navigator
          initialRoute={{id: 1, }}
          renderScene={this._renderScene} />
      );
    }
  });
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


