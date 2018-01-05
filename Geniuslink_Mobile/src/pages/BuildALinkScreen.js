import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Image,
  Button,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import { TabNavigator, TabBarTop } from "react-navigation";
import styles from '../styles/index';
import * as constants from '../constants';

import {createSimpleLink} from '../backend/genius-api';

export class CreateSimpleLinkScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: ({ tintColor }) => (
      <Image
        source={require('../../assets/images/simpleLink.png')}
        style={[style.icon, {tintColor: tintColor, top: Platform.OS == 'ios' ? constants.iOStabBarTopPosition : 0}]}
      />
    ),
  }

  constructor(props) {
    super(props);
    this.state = { url: '' };
  }
  
  state = { url: 'Update me with a real url'};
  
  
    invokeCreateSimpleLink(theUrl)
    {
      var key = '36f712e665aa475c889d3e3cae55eefa';
      var secret = 'ed16131bc5764ff9bd4c8b147fc48f0c';
      var defaultTsid = '33541'; //We need to download this and set it at some point maybe make a setting page
      createSimpleLink(key,secret,theUrl, defaultTsid);
    }

  render() {
    return (
      <View style={styles.global.container}>
          <ScrollView style={styles.global.main}
            contentContainerStyle={{justifyContent: 'center'}}>
            <View // need another view for padding for scrolling to work
              style={styles.global.scrollViewInsideView}>
              <Text style={style.header}>Simple Link</Text>
              <Text style={style.title}>Optimize for iTunes and Amazon or just shorten any link.</Text>
              
              <View style={{height: 25}} />
              <View style={style.textInputBox}>
                <TextInput
                    style={style.textInput}
                    autoCorrect={false}
                    placeholder={'Paste a URL'}
                    placeholderTextColor={'#afafaf'}
                    underlineColorAndroid={'white'}
                    onChangeText={(url) => this.setState({url})}
                    value={this.state.url}
                    clearTextOnFocus
                  />
              </View>
            </View>

          </ScrollView>

          <View style={{height: 15}} />
          <View style={styles.button.general}>           
                <Text style={styles.button.generalButtonText}
                    onPress={() => this.invokeCreateSimpleLink(this.state.url)}>
                    Save
                </Text>
          </View>
          <View style={{height: constants.padding}} />
      </View>
    );
  }
}

let ABSplitIndex = 0;
export class CreateSplitDestinationLinkScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: ({ tintColor }) => (
      <Image
        source={require('../../assets/images/ABSplitLink.png')}
        style={[style.icon, {tintColor: tintColor, top: Platform.OS == 'ios' ? constants.iOStabBarTopPosition: 0}]}
      />
    ),
  }

  constructor(props) {
    super(props);
    this.state = {
      url: '', // still need to map each row to different url --> array?
      rows: []
    };
    this._addRow = this._addRow.bind(this);
  }

  _addRow(){
    this.state.rows.push(ABSplitIndex++);
    this.setState({ rows: this.state.rows });
  }

  render() {
    let rows = this.state.rows.map(() => {
      return <View>
          <View style={{height: 5}} />
          <View style={style.textInputBox}>
            <TextInput
                style={style.textInput}
                autoCorrect={false}
                placeholder={'Paste a URL'}
                placeholderTextColor={'#afafaf'}
                underlineColorAndroid={'white'}
                onChangeText={(url) => this.setState({url})}
                value={this.state.url}
                clearTextOnFocus
              />
          </View>
        </View>
    });

    return (
      <View style={styles.global.container}>
          <ScrollView style={styles.global.main}
            contentContainerStyle={{justifyContent: 'center'}}>
            <View // need another view for padding for scrolling to work
              style={styles.global.scrollViewInsideView}>
              <Text style={style.header}>A/B Split</Text>
              <Text style={style.title}>Automatically spread traffic across destinations.</Text>
              
              <View style={{height: 25}} />
              <View style={style.textInputBox}>
                <TextInput
                    style={style.textInput}
                    autoCorrect={false}
                    placeholder={'Paste a URL'}
                    placeholderTextColor={'#afafaf'}
                    underlineColorAndroid={'white'}
                    onChangeText={(url) => this.setState({url})}
                    value={this.state.url}
                    clearTextOnFocus
                  />
              </View>
              <View style={{height: 5}} />
              <View style={style.textInputBox}>
                <TextInput
                    style={style.textInput}
                    autoCorrect={false}
                    placeholder={'Paste a URL'}
                    placeholderTextColor={'#afafaf'}
                    underlineColorAndroid={'white'}
                    onChangeText={(url) => this.setState({url})}
                    value={this.state.url}
                    clearTextOnFocus
                  />
              </View>

              { rows }

              <View style={{height: 5}} />
              <TouchableWithoutFeedback onPress={ this._addRow }>
                  <View style={style.textInputBox}>
                    <Text style={[styles.button.generalButtonText, {color: '#afafaf'}]}>+</Text>
                  </View>
              </TouchableWithoutFeedback>
            </View>
          </ScrollView>

          <View style={{height: 15}} />
          <View style={styles.button.general}>           
                <Text style={styles.button.generalButtonText}
                    onPress={() => Alert.alert('Success!', 'A/B split link created.')}>
                    Save
                </Text>
          </View>
          <View style={{height: constants.padding}} />
      </View>
    );
  }
}

let UserChoiceIndex = 0;
export class CreateUserChoiceLandingPageScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: ({ tintColor }) => (
      <Image
        source={require('../../assets/images/userChoiceLink.png')}
        style={[style.icon, {tintColor: tintColor, top: Platform.OS == 'ios' ? constants.iOStabBarTopPosition: 0}]}
      />
    ),
  }

  constructor(props) {
    super(props);
    this.state = {
      url: '', // still need to map each row to different url --> array?
      rows: []
    };
    this._addRow = this._addRow.bind(this);
  }

  _addRow(){
    this.state.rows.push(UserChoiceIndex++);
    this.setState({ rows: this.state.rows });
  }

  render() {
    let rows = this.state.rows.map(() => {
      return <View>
          <View style={{height: 5}} />
          <View style={style.textInputBox}>
            <TextInput
                style={style.textInput}
                autoCorrect={false}
                placeholder={'Paste a URL'}
                placeholderTextColor={'#afafaf'}
                underlineColorAndroid={'white'}
                onChangeText={(url) => this.setState({url})}
                value={this.state.url}
                clearTextOnFocus
              />
          </View>
        </View>
    });

    return (
      <View style={styles.global.container}>
          <ScrollView style={styles.global.main}
            contentContainerStyle={{justifyContent: 'center'}}>
            <View // need another view for padding for scrolling to work
              style={styles.global.scrollViewInsideView}>
              <Text style={style.header}>User Choice Landing Page</Text>
              <Text style={style.title}>Let visitors choose from a list of destinations you set.</Text>
              
              <View style={{height: 25}} />
              <View style={style.textInputBox}>
                <TextInput
                    style={style.textInput}
                    autoCorrect={false}
                    placeholder={'Paste a URL'}
                    placeholderTextColor={'#afafaf'}
                    underlineColorAndroid={'white'}
                    onChangeText={(url) => this.setState({url})}
                    value={this.state.url}
                    clearTextOnFocus
                  />
              </View>
              <View style={{height: 5}} />
              <View style={style.textInputBox}>
                <TextInput
                    style={style.textInput}
                    autoCorrect={false}
                    placeholder={'Paste a URL'}
                    placeholderTextColor={'#afafaf'}
                    underlineColorAndroid={'white'}
                    onChangeText={(url) => this.setState({url})}
                    value={this.state.url}
                    clearTextOnFocus
                  />
              </View>

              { rows }

              <View style={{height: 5}} />
              <TouchableWithoutFeedback onPress={ this._addRow }>
                  <View style={style.textInputBox}>
                    <Text style={[styles.button.generalButtonText, {color: '#afafaf'}]}>+</Text>
                  </View>
              </TouchableWithoutFeedback>
            </View>
          </ScrollView>

          <View style={{height: 15}} />
          <View style={styles.button.general}>           
                <Text style={styles.button.generalButtonText}
                    onPress={() => Alert.alert('Success!', 'Link to a landing page created.')}>
                    Save
                </Text>
          </View>
          <View style={{height: constants.padding}} />
      </View>
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
    tabBarPosition: "top",
    tabBarComponent: TabBarTop, // to ensure display of indicator in iOS
    swipeEnabled: true,
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
        elevation: 0 // for Android
      },
      tabStyle: {
        top: constants.buttonTopOffset-2,
        height: constants.topNavBarHeight,
        margin: 0,
        padding: 0
      },
      indicatorStyle: { // for Android
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
  textInputBox: {
    width: constants.dimensions.width-80,
    height: 40,
    borderColor: '#afafaf',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center'
  },
  textInput: {
    color: '#59595b',
    paddingLeft: 10,
    textAlign: 'left'
  },
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