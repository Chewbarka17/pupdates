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

// each card should have:
// dog's name, # of miles away
// click on dog's pic to view their profile

// dummy data ====================================
var image1 = require('./corgi.jpg');
var image2 = require('./samoyed.png');
var image3 = require('./shiba.jpg');

const Cards = [
{
  "id": 1,
  "first_name": "Happy",
  "distance": 38,
  "image": image1
}, {
  "id": 2,
  "first_name": "Snuffles",
  "distance": 49,
  "image": image2
}, {
  "id": 3,
  "first_name": "Rover",
  "distance": 39,
  "image": image3
}];
// dummy data ====================================


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
      cards: Cards,
      unseenDogs: [],
      currentDog: [],
      error: null
    }
  }

  componentDidMount() {
    // console.log("this.props: ", this.props);
    // console.log("this.props.actions: ", this.props.actions); // 3 action functions
    // console.log("this.props.navigation.state: ", this.props.navigation.state);

    // call getAllUnseenDogs action; this.props.actions.getAllUnseenDogs(userid)
    this.props.actions.getAllUnseenDogs("59e570f1e46ed4333725a612");
    console.log("this.props.navigation.state.unseenDogs: ", this.props.navigation.state.unseenDogs); // expecting: [{dog1}, {dog2}, {dog3}]

    //this.getUnseenDogs();

  }

  setStateOfCurrentDog = (x) => {
    this.setState({ currentDog: x }, () => {
      console.log("this.state.currentDog: ", this.state.currentDog)
      
    })
  }

  // getUnseenDogs = () => {
  //   axios.get('http://localhost:8000/api/newdogs/' + '59e570f1e46ed4333725a612')
  //   .then(({ data }) => {
  //     this.setState({ unseenDogs: data }, () => {
  //       console.log("this.state.unseenDogs after get request: ", this.state.unseenDogs); // [{dog1}, {dog2},...]
  //     });
  //   })
  //   .catch((err) => {
  //     console.log('failed to get unseen dogs: ', err)
  //   });
  // }

  Card(x) {
    return (
      <View style={styles.card}>
        <Image source ={{uri: x.pictures[0]}} resizeMode="contain" style ={{width:350, height:350}} />
        <View style={{width:350, height:70, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <View style={{flexDirection:'row', margin:15, marginTop:25,}} >
            <Text style={{fontSize:20, fontWeight:'300', color:'#444'}}>{x.name} </Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={{padding:13, borderLeftWidth:1,borderColor:'#e3e3e3', alignItems:'center', justifyContent:'space-between'}}><Icon name='place' size={20} color="#777" /><Text style={{fontSize:16, fontWeight:'200', color:'#555'}}>{x.location} miles</Text></View>
          </View>
        </View>
      </View>
    )
  }
  
  handleYup(card) {
    console.log(`Yup for ${card.text}`); // undefined
    
    // call updateDogsSeen action; this.props.actions.updateDogsSeen(userid, dogid) how to grab dogid of the card that's being swiped?


    // call updateLikedDogs action; this.props.actions.updateLikedDogs(userid, dogid)
  }

  handleNope(card) {
    console.log(`Nope for ${card.text}`); // undefined
    
    // call updateDogsSeen action; this.props.actions.updateDogsSeen(userid, dogid)
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

  // buttons
  yup(cardData) {
    console.log(this.refs['swiper']);
    console.log("cardData: ", cardData);
    console.log("this.state.currentDog: ", this.state.currentDog);
    // call updateDogsSeen action; this.props.actions.updateDogsSeen(userid, dogid) how to grab dogid of the card that's being swiped?

    // call updateLikedDogs action; this.props.actions.updateLikedDogs(userid, dogid)

    this.refs['swiper']._goToNextCard();
  }

  nope() {
    console.log(this.refs['swiper']);
    // call updateDogsSeen action; this.props.actions.updateDogsSeen(userid, dogid)

    this.refs['swiper']._goToNextCard();
  }

  render() {
    return (
      <View style={styles.container}>
        <SwipeCards
          ref = {'swiper'}
          cards={this.state.unseenDogs}
          containerStyle = {{  backgroundColor: '#f7f7f7', alignItems:'center', margin:20}}
          renderCard={(cardData) => (this.Card(cardData))}
          renderNoMoreCards={() => this.noMore()}
          handleYup={this.handleYup}
          handleNope={this.handleNope} 
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
    viewDogs: store.ViewDogs.seenDogs
  }
}

const viewDogsDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(viewDogActions, dispatch),
  }
};

export default connect(viewDogsState, viewDogsDispatch)(ViewDogsScreen);