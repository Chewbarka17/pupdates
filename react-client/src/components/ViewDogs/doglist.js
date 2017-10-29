// TODO:
// calculate # of miles away
// X <3 buttons buggy
// viewing dog's profile buggy
// add "woofsies no more dogs" text to the gif
// styling

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
      error: null,
      distance: 0,
      flag: false
    }

    this.handleLocation = this.handleLocation.bind(this);
    this.compareLocation = this.compareLocation.bind(this);
  }

  componentDidMount() {
    this.props.actions.getAllUnseenDogs(this.props.uid);
    // set state based on first dog
    //counter = 0
  }

  handleLocation(dogInfo) {
    console.log('dog info here: ', `http://localhost:8000/api/users/${dogInfo.owner}`);
    axios.get(`http://localhost:8000/api/users/${dogInfo.owner}`)
      .then(({data}) => {
        return this.compareLocation(data[0].coords);
      })
      .catch(err => {
        console.log(err);
      })
  }

  compareLocation(userOfInterestLocation) {
    let value = '';
    axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${this.props.currentCoords[0]},${this.props.currentCoords[1]}&destinations=${userOfInterestLocation[0]},${userOfInterestLocation[1]}&key=YOURAPIKEYHERE`)
      .then(({data}) => {
        console.log('this is data', data.rows[0].elements[0].distance.text);
        value = data.rows[0].elements[0].distance.text;
        this.setState({distance: value, flag: true});
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  // swipe cards
  handleYup(cardData) {
    // set state unseen dogs at counter, counter++
    this.props.actions.updateDogsSeen(this.props.uid, cardData._id);
    this.props.actions.updateLikedDogs(this.props.uid, cardData._id);
  }

  handleNope(cardData) {
    this.props.actions.updateDogsSeen(this.props.uid, cardData._id);
  }

  // press buttons
  yup() {
    if (this.refs['swiper'].props.cards[0]) {
      this.props.actions.getAllUnseenDogs(this.props.uid);
      this.props.actions.updateDogsSeen(this.props.uid, this.refs['swiper'].props.cards[0]._id)
      this.props.actions.updateLikedDogs(this.props.uid, this.refs['swiper'].props.cards[0]._id)
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
    if (this.refs['swiper'].props.cards[0]) {
      this.props.actions.getAllUnseenDogs(this.props.uid);
      this.props.actions.updateDogsSeen(this.props.uid, this.refs['swiper'].props.cards[0]._id)
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

  navigateToProfile() {
    const { navigate } = this.props.navigation;
    navigate('DogProfile', this.refs['swiper'].props.cards[0]);
  }

  render() {
    {console.log('what is state: ', this.state)};
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
                  <View style={{padding:13, borderLeftWidth:1,borderColor:'#e3e3e3', alignItems:'center', justifyContent:'space-between'}}><Icon name='place' size={20} color="#777" /><Text style={{fontSize:16, fontWeight:'200', color:'#555'}}>{
                    this.state.flag ? this.state.distance : this.handleLocation(cardData)
                    }</Text></View>
                </View>
              </View>
            </View>
          )}
          handleYup={(cardData) => (this.handleYup(cardData))}
          handleNope={(cardData) => (this.handleNope(cardData))}
          /* {...this.handleState(cardData)} */

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
    currentCoords: store.Owners.user.coords,
  }
}

const viewDogsDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(viewDogActions, dispatch),
  }
};

export default connect(viewDogsState, viewDogsDispatch)(ViewDogsScreen);