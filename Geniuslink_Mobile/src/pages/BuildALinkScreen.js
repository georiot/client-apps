import React from 'react';
import {
  ScrollView,
  View,
  Image,
  Button,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import { TabNavigator } from "react-navigation";
import TopNavigation from '../navbars/TopNavigationBar';
import styles from '../styles/index';
import * as constants from '../constants';

export class CreateSimpleLinkScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: ({ tintColor }) => (
      <Image
        source={require('../../assets/images/link_simple.png')}
        style={[style.icon, {tintColor: tintColor}]}
      />
    ),
  };

  state = { url: 'Update me with a real url'};
  setUrl( t)
  {
    this.state.url = t;
  }
  render() {
    return (
      <View style={styles.global.container}>
          <ScrollView style={styles.global.main} contentContainerStyle={styles.global.scrollViewMain}>
          <Text>Add an url to create a random shortlink on the geni.us domain. HI P</Text>
          <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, width:300}}
              onChangeText={(url) => this.setState({url})}
              value={this.state.url}
            />
          <Button
            style={{fontSize: 20}}
            onPress={() => alert("yey")} // <-- closed tag here
            title="Create">
          </Button>
          
          </ScrollView>
      </View>
    );
  }
}

export class CreateSplitDestinationLinkScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: ({ tintColor }) => (
      <Image
        source={require('../../assets/images/link_absplit.png')}
        style={[style.icon, {tintColor: tintColor}]}
      />
    ),
  };

  state = { url: 'split destination test'};
  setUrl( t)
  {
    this.state.url = t;
  }
  render() {
    return (
      <Text>Hi there! This is the split destination screen</Text>
    );
  }
}

export class CreateUserChoiceLandingPageScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: ({ tintColor }) => (
      <Image
        source={require('../../assets/images/link_userchoice.png')}
        style={[style.icon, {tintColor: tintColor}]}
      />
    ),
  };

  state = { url: 'User Choice landing page'};
  setUrl( t)
  {
    this.state.url = t;
  }
  render() {
    return (
      <Text>Hello! This is the user choice landing page screen</Text>
    );
  }
}

export default (MainScreenNavigator = TabNavigator(
  {
    // do not change the order of the navigation
    SimpleLink: { screen: CreateSimpleLinkScreen },
    SplitDestination: { screen: CreateSplitDestinationLinkScreen },
    UserChoiceLandingPage: { screen: CreateUserChoiceLandingPageScreen }
  },
  {
    initialRouteName: 'SimpleLink',
    tabBarPosition: "top",
    tabBarOptions: {
      showLabel: true,
      activeBackgroundColor: 'white',
      inactiveBackgroundColor: 'white',
      activeTintColor: '#59595b',
      inactiveTintColor: '#59595b',
      style: {
        height: constants.topNavBarHeight,
        backgroundColor: 'white',
        borderBottomColor: '#afafaf',
        borderBottomWidth: 0.5,
        elevation: 0 // only for Android --> might need to remove for iOS
      },
      tabStyle: {
        top: constants.buttonTopOffset-2,
        height: constants.topNavBarHeight,
        margin: 0,
        padding: 0
      },
      indicatorStyle: { // not for iOS?
        backgroundColor: '#00b9ee'
      }
    }
  }  
));

const style = StyleSheet.create({
  icon: {
    width: constants.buttonSize*1.3,
    height: constants.buttonSize*1.3,
  },
});