// TODO:
// X <3 buttons buggy
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

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      distance: 0,
      flag: false,
      latitude: '',
      longitude: '',
      dogIndex: 0
    }

    this.handleLocation = this.handleLocation.bind(this);
    this.compareLocation = this.compareLocation.bind(this);
    this.getGeolocation = this.getGeolocation.bind(this);
    this.handleYup = this.handleYup.bind(this);
    this.handleNope = this.handleNope.bind(this);
    this.noMore = this.noMore.bind(this);
  }

  componentDidMount() {
    this.props.actions.getAllUnseenDogs(this.props.uid);
    this.getGeolocation((err, data) => {
      this.handleLocation();
    });
    
  }

  getGeolocation(callback) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        })
        console.log('this is the position', this.state);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    callback(null, 'finished')
  }

  handleLocation() {
    console.log('this is the dog ', this.refs['swiper'].props.cards[this.state.dogIndex]);
    const dog = this.refs['swiper'].props.cards[this.state.dogIndex];
    if (dog) {
      axios.get(`http://localhost:8000/api/users/${dog.owner}`)
        .then(({data}) => {
          console.log('in handle location, ', data);
          this.compareLocation(data[0].coords);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      this.noMore();
    }
  }

  compareLocation(userOfInterestLocation) {
    // console.log('this is the dogs location', userOfInterestLocation);
    let value = '';
    axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${this.state.latitude},${this.state.longitude}&destinations=${userOfInterestLocation[0]},${userOfInterestLocation[1]}&key=AIzaSyB1S52rdgtYi-52GK2b149DGxAZb_rKGdY`)
      .then(({data}) => {
        console.log('this is data', data.rows[0].elements[0].distance.text);
        value = data.rows[0].elements[0].distance.text;
        console.log('this is the value ', value);
        this.setState({distance: value, flag: true, dogIndex: this.state.dogIndex+1});
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  // swipe cards
  handleYup(cardData) {
    console.log('this is yup ', cardData);
    this.props.actions.updateDogsSeen(this.props.uid, cardData._id);
    this.props.actions.updateLikedDogs(this.props.uid, cardData._id);
    this.state.dogIndex === this.props.viewDogs.unseenDogs.length ? null : this.handleLocation(cardData)
    this.setState({flag: false});
  }

  handleNope(cardData) {
    console.log('this is uid ', this.state.dogIndex)
    this.props.actions.updateDogsSeen(this.props.uid, cardData._id);
    this.state.dogIndex === this.props.viewDogs.unseenDogs.length ? null : this.handleLocation(cardData)
    this.setState({flag: false});
  }

  // press buttons
  yup() {
    if (this.refs['swiper'].props.cards[this.state.dogIndex]) {
      this.handleYup(this.refs['swiper'].props.cards[this.state.dogIndex]);
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
    if (this.refs['swiper'].props.cards[this.state.dogIndex]) {
      this.handleNope(this.refs['swiper'].props.cards[this.state.dogIndex]);
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
    console.log(this.props.viewDogs.unseenDogs);
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
                    this.state.distance
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