// TODO:
// calculate # of miles away
// styling

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Avatar } from 'react-native-elements';
import SwipeCards from 'react-native-swipe-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import * as viewDogActions from '../../actions/ViewDogs/viewDogsActions';

class ViewDogsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Dogs',
    drawerIcon: ({tintColor}) => {
      return (
        <MaterialIcons
          name="pets"
          size={24}
          style={{color: tintColor}}
        >
        </MaterialIcons>
      );
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      error: null
    }
  }

  componentDidMount() {
    this.props.actions.getAllUnseenDogs(this.props.uid);
  }
  
  // swipe cards
  handleYup(cardData) {
    this.props.actions.updateDogsSeen(this.props.uid, cardData._id);
    this.props.actions.updateLikedDogs(this.props.uid, cardData._id);
  }

  handleNope(cardData) {
    this.props.actions.updateDogsSeen(this.props.uid, cardData._id);
  }

  // press buttons
  yup() {
    this.props.actions.getAllUnseenDogs(this.props.uid);
    this.props.actions.updateDogsSeen(this.props.uid, this.refs['swiper'].props.cards[0]._id)
    this.props.actions.updateLikedDogs(this.props.uid, this.refs['swiper'].props.cards[0]._id)
    this.refs['swiper']._goToNextCard();
  }

  nope() {
    this.props.actions.getAllUnseenDogs(this.props.uid);
    this.props.actions.updateDogsSeen(this.props.uid, this.refs['swiper'].props.cards[0]._id)
    this.refs['swiper']._goToNextCard();
  }

  noMore() {
    return (
      <View style={styles.card} >
        <Text>No More Dogs</Text>
        <Image
          style={{width: 380, height: 140}}
          source={require('./sadCorgi.gif')}
        />
      </View>
    )
  }

  navigateToProfile() {
    const { navigate } = this.props.navigation;
    navigate('DogProfile', this.refs['swiper'].props.cards[0]);
  }

  render() {
    return (
      <View style={styles.container}>
        <SwipeCards
          ref = {'swiper'}
          cards={this.props.viewDogs.unseenDogs}
          containerStyle = {{  backgroundColor: '#f7f7f7', alignItems:'center', margin:20}}
          renderCard={(cardData) => (
            <View 
              style={styles.card}
            >
            <TouchableOpacity
              onPress = {() => this.navigateToProfile()}
            >
              <Image
                source ={{uri: cardData.pictures[0]}}
                resizeMode="contain"
                style ={{width:350, height:350}}
              />
              </TouchableOpacity>
              <View style={{width:350, height:70, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <View style={{flexDirection:'row', margin:15, marginTop:25,}} >
                  <Text style={{fontSize:20, fontWeight:'300', color:'#444'}}>{cardData.name} </Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{padding:13, borderLeftWidth:1,borderColor:'#e3e3e3', alignItems:'center', justifyContent:'space-between'}}><Icon name='place' size={20} color="#777" /><Text style={{fontSize:16, fontWeight:'200', color:'#555'}}>{cardData.location} miles</Text></View>
                </View>
              </View>
            </View>
          )}
          handleYup={(cardData) => (this.handleYup(cardData))}
          handleNope={(cardData) => (this.handleNope(cardData))}
          renderNoMoreCards={() => this.noMore()}
        />
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <TouchableOpacity
            style = {styles.buttons}
            onPress = {() => this.nope()}
          >
            <Icon 
              name='close'
              size={45}
              color="#888"
              style={{}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.buttons}
            onPress = {() => this.yup()}
          >
            <Icon
              name='favorite-border'
              size={36}
              color="#888"
              style={{marginTop:5}}
            />
          </TouchableOpacity>
        </View>
        <View>
          <MaterialIcons
            name="menu"
            size={24}
            onPress={() => this.props.navigation.navigate('DrawerOpen')}
          >
          </MaterialIcons>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  buttons:{
    width:80, 
    height:80, 
    borderWidth:10, 
    borderColor:'#e7e7e7', 
    justifyContent:'center', 
    alignItems:'center',
    borderRadius:40
  },
  buttonSmall:{
    width:50, 
    height:50, 
    borderWidth:10, 
    borderColor:'#e7e7e7', 
    justifyContent:'center', 
    alignItems:'center',
    borderRadius:25
  },
   card: {
    flex: 1,
    alignItems: 'center',
    alignSelf:'center',
    borderWidth:2,
    borderColor:'#e3e3e3',
    width: 350,
    height: 420,
  }
 
});

const viewDogsState = (store) => {
  return {
    viewDogs: store.ViewDogs,
    uid: store.Owners.user._id,
  }
}

const viewDogsDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(viewDogActions, dispatch),
  }
};

export default connect(viewDogsState, viewDogsDispatch)(ViewDogsScreen);