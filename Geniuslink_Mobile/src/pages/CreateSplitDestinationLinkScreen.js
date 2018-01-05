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

let ABSplitIndex = 0;
export default class CreateSplitDestinationLinkScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: ({ tintColor }) => (
      <Image
        source={require('../../assets/images/ABSplitLink.png')}
        style={[style.icon, {tintColor: tintColor, top: Platform.OS == 'ios' ? constants.iOStabBarTopPosition: 0}]}
      />
    ),
    header: null
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