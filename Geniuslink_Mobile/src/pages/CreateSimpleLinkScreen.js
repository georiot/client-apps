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
import styles from '../styles/index';
import * as constants from '../constants';
import { createSimpleLink } from '../backend/genius-api';

export default class CreateSimpleLinkScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: ({ tintColor }) => (
      <Image
        source={require('../../assets/images/simpleLink.png')}
        style={[style.icon, {tintColor: tintColor, top: Platform.OS == 'ios' ? constants.iOStabBarTopPosition : 0}]}
      />
    ),
    header: null
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
                    onPress={() => [this.invokeCreateSimpleLink(this.state.url),
                                    this.setState({url: ''}),
                                    this.props.navigation.navigate('LinkCreationResult')]}>
                    Save
                </Text>
          </View>
          <View style={{height: constants.padding}} />
      </View>
    );
  }
}

// move to a stylesheet -- shared between link creation pages
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