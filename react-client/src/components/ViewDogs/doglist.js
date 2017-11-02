import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
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
  constructor(props) {
    super(props);

    this.handleYup = this.handleYup.bind(this);
    this.handleNope = this.handleNope.bind(this);
    this.noMore = this.noMore.bind(this);
  }

  componentDidMount() {
    this.props.actions.getAllUnseenDogs(this.props.uid, this.props.coords);
  }
  
  // swipe cards
  handleYup(cardData) {
    this.props.actions.updateLikedDogs(this.props.uid, cardData._id)
    if (this.props.unseenDogs[1]) {
      this.props.actions.findDistance(this.props.coords, this.props.unseenDogs[1]);
    }
  }

  handleNope(cardData) {
    this.props.actions.updateDogsSeen(this.props.uid, cardData._id, this.props.coords);
    if (this.props.unseenDogs[1]) {
      this.props.actions.findDistance(this.props.coords, this.props.unseenDogs[1]);
    }
  }

  // press buttons
  yup() {
    if (this.props.unseenDogs.length > 0) {
      this.handleYup(this.props.unseenDogs[0]);
      this.refs['swiper']._goToNextCard();
    } else {
      Alert.alert(
        'Woofsies',
        'No more dogs',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
  }

  nope() {
    if (this.props.unseenDogs.length > 0) {
      this.handleNope(this.props.unseenDogs[0]);
      this.refs['swiper']._goToNextCard();
    } else {
      Alert.alert(
        'Woofsies',
        'No more dogs',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
  }

  noMore() {
    return (
      <View>
        <Image
          style={{width: 550, height: 300}}
          source={require('./cryingCorgi.gif')}
        />
      </View>
    )
  }

  navigateToProfile(cardData) {
    this.props.navigate('LikedDogProfile', cardData);
  }

  render() {
    return (
      <View style={styles.container}>
        <SwipeCards
          ref = {'swiper'}
          cards={this.props.unseenDogs}
          containerStyle = {{  backgroundColor: '#f7f7f7', alignItems:'center', margin:20}}
          renderCard={(cardData) => (
            <View
              style={styles.card}
            >
              <TouchableOpacity
                onPress = {() => this.navigateToProfile(cardData)}
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
                  <View style={{padding:13, borderLeftWidth:1,borderColor:'#e3e3e3', alignItems:'center', justifyContent:'space-between'}}>
                    <Icon name='place' size={20} color="#777" />
                    <Text style={{fontSize:16, fontWeight:'200', color:'#555'}}>{
                    // this.state.flag ? this.state.distance : this.handleLocation(cardData)
                    this.props.distance
                    }</Text></View>
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
              size={40}
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
    unseenDogs: store.ViewDogs.unseenDogs,
    uid: store.Owners.user._id,
    coords: store.Owners.user.coords,
    distance: store.ViewDogs.distance,
  }
}

const viewDogsDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(viewDogActions, dispatch),
  }
};

export default connect(viewDogsState, viewDogsDispatch)(ViewDogsScreen);