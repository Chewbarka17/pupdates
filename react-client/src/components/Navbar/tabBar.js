import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import CustomTabBar from './customNavbar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Login from '../Authentication/Login/login';
import Splash from '../Splash/splashPageView';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ownerActions from '../../actions/Profiles/ownerActions';

import ViewDogs from '../ViewDogs/doglist';
import ChatList from '../Chat/chatList';
import LikedDogs from '../Likes/likedDogsView';
import ViewOwnerProfile from '../Profiles/viewOwnerProfile';

class TabBar extends React.Component {
  static navigationOptions = {
    title: 'Back',
  };

  constructor(props) {
    super(props);
    this.state = {
      flag0: true,
      flag1: true,
      flag2: true,
      flag3: true,
    }
    this.changeState = this.changeState.bind(this);
  }

  // function to set state
  changeState(flag) {
    this.setState(() => {
      const newState = {}
      newState[flag] = !this.state[flag]
      return newState;
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    
    if (this.props.loggedIn) {
      return (
        <ScrollableTabView
          locked={true} // this needs to be true because of swiping dog cards
          style={{marginTop: 24, backgroundColor: 'white'}}
          initialPage={0}
          renderTabBar={() => <CustomTabBar hack={this.changeState}/>}
        >

          <ScrollView tabLabel="md-person" style={styles.tabView}>
            <View>
              <ViewOwnerProfile navigation={this.props.navigation} hack={this.state.flag0}/>
            </View>
          </ScrollView>

          <ScrollView tabLabel="md-paw" style={styles.tabView} scrollEnabled={ false }>
            <View>
              <ViewDogs navigate={navigate} hack={this.state.flag1}/>
            </View>
          </ScrollView>

          <ScrollView tabLabel="ios-heart" style={styles.tabView}>
            <View>
              <LikedDogs navigate={navigate} hack={this.state.flag2}/>
            </View>
          </ScrollView>

          <ScrollView tabLabel="ios-chatbubbles" style={styles.tabView}>
            <View>
              <ChatList navigate={navigate} hack={this.state.flag3}/>
            </View>
          </ScrollView>

        </ScrollableTabView> 
      )
    } else {
      return (
        <View> 
          <Splash />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  card: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});

const loggedInState = (store) => {
  return {
    loggedIn: store.Owners.loggedIn,
  }
}

const loggedInDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(ownerActions, dispatch),
  }
};

export default connect(loggedInState, loggedInDispatch)(TabBar);

