// TODO:
// calculate # of miles away
// click on dog's pic to view their profile
// render userid dynamically ("59e570f1e46ed4333725a612")

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
    this.props.actions.getAllUnseenDogs("59e570f1e46ed4333725a612");
    console.log("this.props.viewDogs.unseenDogs", this.props.viewDogs.unseenDogs);
  }

  Card(x) {
    return (
      <View style={styles.card}>
        <Image
          source ={{uri: x.pictures[0]}}
          resizeMode="contain"
          style ={{width:350, height:350}}
        />
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
  
  // swipe cards
  handleYup(cardData) {
    this.props.actions.updateDogsSeen("59e570f1e46ed4333725a612", cardData._id);
    this.props.actions.updateLikedDogs("59e570f1e46ed4333725a612", cardData._id);
    console.log("swipe yup dog id: ", cardData._id);
  }

  handleNope(cardData) {
    this.props.actions.updateDogsSeen("59e570f1e46ed4333725a612", cardData._id);
    console.log("swipe nope dog id: ", cardData._id);
  }

  // press buttons
  yup() {
    // console.log("press yup dog arr: ", this.refs['swiper'].props.cards);
    // console.log("press yup dog obj: ", this.refs['swiper'].props.cards[0]);
    // console.log("press yup dogid: ", this.refs['swiper'].props.cards[0]._id);
    this.props.actions.getAllUnseenDogs("59e570f1e46ed4333725a612");
    this.props.actions.updateDogsSeen("59e570f1e46ed4333725a612", this.refs['swiper'].props.cards[0]._id)
    this.props.actions.updateLikedDogs("59e570f1e46ed4333725a612", this.refs['swiper'].props.cards[0]._id)
    this.refs['swiper']._goToNextCard();
  }

  nope() {
    // console.log("press nope dog arr: ", this.refs['swiper'].props.cards);
    // console.log("press nope dog obj: ", this.refs['swiper'].props.cards[0]);
    // console.log("press nope dogid: ", this.refs['swiper'].props.cards[0]._id);
    this.props.actions.getAllUnseenDogs("59e570f1e46ed4333725a612");
    this.props.actions.updateDogsSeen("59e570f1e46ed4333725a612", this.refs['swiper'].props.cards[0]._id)
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

  render() {
    return (
      <View style={styles.container}>
        <SwipeCards
          ref = {'swiper'}
          cards={this.props.viewDogs.unseenDogs}
          containerStyle = {{  backgroundColor: '#f7f7f7', alignItems:'center', margin:20}}
          renderCard={(cardData) => (this.Card(cardData))}
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
    viewDogs: store.ViewDogs
  }
}

const viewDogsDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(viewDogActions, dispatch),
  }
};

export default connect(viewDogsState, viewDogsDispatch)(ViewDogsScreen);