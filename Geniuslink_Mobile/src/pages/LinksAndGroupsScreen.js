import React from 'react';
import {
  ListView,
  ScrollView,
  Text,
  Image,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
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
} from 'react-native-table-component';
import SearchBar from 'react-native-searchbar';
import styles from '../styles/index';
import * as constants from '../constants';
import { getLinksList, getGroupsList } from '../backend/genius-api.js';

export default class LinksAndGroupsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header:
    // change later to no settings navigation (?) 
    // so user can tap anywhere on the header to bring up the search bar
      <View>
          <View style={styles.navbar.topNavBar}>
          <TouchableWithoutFeedback onPress={() => this.searchBar.show()}>
            <View style={[styles.navbar.topNavBarSubComponent, {alignItems: 'flex-start', justifyContent: 'center', top: constants.buttonTopOffset}]}>
              <Image style={styles.button.topButtonMenu} source={require('../../assets/images/search-light.png')} resizeMode='contain' />
              <SearchBar
                    // CONSIDER SWITCHING TO NATIVE-BASE INSTEAD OF USING REACT-NATIVE-SEARCHBAR !!
                    ref={(ref) => this.searchBar = ref}
                    data={null}
                    width='100%'
                    heightAdjust={-constants.buttonTopOffset}
                    placeholder='Search by keyword or tag'
                    //backButton={<Image style={[styles.button.topButtonMenu, {top:constants.buttonTopOffset-constants.buttonTopOffset-3}]} source={require('../../assets/images/back_lighttheme.png')} />}
                    iconColor='#59595b'
                    textColor='#59595b'
                    backCloseSize={20}
                    fontFamily='OpenSans_Regular'
                    fontSize={15}
                    animate={false}
                    clearOnBlur
                    />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
                //onPress={() => navigation.navigate('Settings')} // messes with the search bar, need a fix
                >
                <View style={[styles.navbar.topNavBarSubComponent, {alignItems: 'flex-end'}]}>
                  <Image style={[styles.button.topButtonMenu, {opacity: 0}]} source={require('../../assets/images/optionsButton-light.png')} resizeMode='contain' />
                </View>
          </TouchableWithoutFeedback>
          </View>
          <View style={styles.navbar.navSeparator} />
        </View>
  });

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
          allLinks: ds.cloneWithRows(values[0].slice(0,7)),
          allGroups: ds.cloneWithRows(values[1].slice(0,7))
        }, function() {});
      });

    return afterEndpoints;
  }

  render() {
    let linksContent;
    let groupsContent;
    if (this.state.isLoading) {
      linksContent = (
        <ActivityIndicator size='large' color='#afafaf' />
      );
      groupsContent = (
        <ActivityIndicator size='large' color='#afafaf' />
      );
    }
    else{
      linksContent = (
        <ListView
        initialListSize={3}
        dataSource={this.state.allLinks}
        renderRow={(r) =>
          <View>
            <Table borderStyle={{borderWidth: 0}}>
              <Col data={r.ProductDisplayName1.length > 30? [r.ProductDisplayName1.slice(0, 29)+'...'] : [r.ProductDisplayName1]} textStyle={style.title}/>
              <Col data={[r.ShortUrlCode]} textStyle={style.subtitle}/>
            </Table>
            <View style={{height: 10}} />
          </View>
          }/>
      );
      groupsContent = (
              <ListView
                  initialListSize={3}
                  dataSource={this.state.allGroups}
                  renderRow={(r) =>
                    <View>
                        <Table borderStyle={{borderWidth: 0}}>
                          <Col data={r.Name.length > 30? [r.Name.slice(0, 29)+'...'] : [r.Name]} textStyle={style.title}/>
                          <Col data={[r.Id]} textStyle={style.subtitle}/>
                        </Table>
                        <View style={{height: 10}} />
                      </View>
                  }/>
      );
    }

    return (
      <View style={styles.global.container}>
        <ScrollView style={styles.global.main} scrollEnabled={false}
        //contentContainerStyle={styles.global.scrollViewMain}
        >
          <View // need another view for padding for scrolling to work
              style={styles.global.scrollViewInsideView}>
              {/* need to change formatting later using constants,
                  need to change ListView to FlatList --> ListView is to be deprecated */}
              
              <Text style={style.header}>Recent Links</Text>
              <View style={{height: 10}} />
              <View style={style.section}>
                {linksContent}
              </View>
              
              <View style={{height: 25}} />

              <Text style={style.header}>Recent Groups</Text>
              <View style={{height: 10}} />
              <View style={style.section}>
                {groupsContent}
              </View>
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