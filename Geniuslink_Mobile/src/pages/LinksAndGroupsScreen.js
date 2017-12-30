import React from 'react';
import {
  ListView,
  ScrollView,
  Text,
  View,
  StyleSheet
} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from 'react-native-table-component'
import LinksAndGroupsScreenNavBar from '../navbars/LinksAndGroupsScreenNavBar';
import styles from '../styles/index';
import * as constants from '../constants';
import { getLinksList, getGroupsList } from '../backend/genius-api.js';

export default class LinksAndGroupsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    var key = '36f712e665aa475c889d3e3cae55eefa';
    var secret = 'ed16131bc5764ff9bd4c8b147fc48f0c';

    var getLinks = getLinksList(key, secret);
    var getGroups = getGroupsList(key, secret);

    var afterEndpoints = Promise.all([getLinks, getGroups])
      .then(values => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.setState({
          isLoading: false,
          allLinks: ds.cloneWithRows(values[0].slice(0,3)),
          allGroups: ds.cloneWithRows(values[1].slice(0,3))
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
        <ScrollView style={styles.global.main} scrollEnabled={false}
        //contentContainerStyle={styles.global.scrollViewMain}
        >
          {/* need to change formatting later using constants,
              need to change ListView to FlatList --> ListView is to be deprecated */}
          
          <Text style={style.header}>Top Links</Text>
          <View style={{height: 10}} />
          <View style={style.section}>
            <ListView
              initialListSize={3}
              dataSource={this.state.allLinks}
              renderRow={(r) =>
                <View>
                  <Table borderStyle={{borderWidth: 0}}>
                    <Col data={r.ProductDisplayName1.length > 40? [r.ProductDisplayName1.slice(0, 25)+'...'] : [r.ProductDisplayName1]} textStyle={style.title}/>
                    <Col data={[r.ShortUrlCode]} textStyle={style.subtitle}/>
                  </Table>
                  <View style={{height: 10}} />
                </View>
                }/>
          </View>
          
          <View style={{height: 25}} />

          <Text style={style.header}>Top Groups</Text>
          <View style={{height: 10}} />
          <View style={style.section}>
            <ListView
              initialListSize={3}
              dataSource={this.state.allGroups}
              renderRow={(r) =>
                <View>
                    <Table borderStyle={{borderWidth: 0}}>
                      <Col data={r.Name.length > 40? [r.Name.slice(0, 25)+'...'] : [r.Name]} textStyle={style.title}/>
                      <Col data={[r.Id]} textStyle={style.subtitle}/>
                    </Table>
                    <View style={{height: 10}} />
                  </View>
              }/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

{/* specific style */}
const style = StyleSheet.create({
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

  subtitle: {
    fontFamily: 'OpenSans_Light',
    fontSize: 14,
    color: '#9e9e9e'
  },

  section: {
    height: (constants.dimensions.height-constants.topNavBarHeight-constants.bottomNavBarHeight)/2-95,
  }
});