import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput
} from 'react-native';
import TopNavigation from '../navbars/TopNavigationBar';
import styles from '../styles/index';
import * as constants from '../constants';
import {createSimpleLink} from '../backend/genius-api';
import LinkCreationNavBar from '../navbars/LinkCreationNavBar'
export default class BuildALinkScreen extends React.Component {
 
  state = { url: 'Update me with a real url'};


  invokeCreateSimpleLink(theUrl)
  {
    var key = '';
    var secret = '';
    var defaultTsid = '2531'; //We need to download this and set it at some point maybe make a setting page
    createSimpleLink(key,secret,theUrl, defaultTsid);
    
  }

  render() {
    return (
      <View style={styles.global.container}>
          <TopNavigation/>
          <LinkCreationNavBar/>            
          <ScrollView style={styles.global.main} contentContainerStyle={styles.global.scrollViewMain}>
          <Text>Add an url to create a random shortlink on the geni.us domain. HI P</Text>
          <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, width:300}}
              onChangeText={(url) => this.setState({url})}
              value={this.state.url}
            />
          <Button
            style={{fontSize: 20}}
            onPress={()=>this.invokeCreateSimpleLink(this.state.url)} // <-- closed tag here
            title="Create">
          </Button>
          
          </ScrollView>
      </View>
    );
  }
}