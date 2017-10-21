import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
//import Nav from './dogentry';
import SwipeCards from 'react-native-swipe-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


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

  constructor(props){
    super(props)
    this.state = {
      cards: Cards
    }
  }

  Card(x){
    return (
      <View style={styles.card}>
        <Image source ={x.image} resizeMode="contain" style ={{width:350, height:350}} />
        <View style={{width:350, height:70, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        <View style={{flexDirection:'row', margin:15, marginTop:25,}} >
        <Text style={{fontSize:20, fontWeight:'300', color:'#444'}}>{x.first_name} </Text>
        </View>
        <View style={{flexDirection:'row'}}>
        <View style={{padding:13, borderLeftWidth:1,borderColor:'#e3e3e3', alignItems:'center', justifyContent:'space-between'}}><Icon name='place' size={20} color="#777" /><Text style={{fontSize:16, fontWeight:'200', color:'#555'}}>{x.distance} miles</Text></View>
        </View>
        </View>
      </View>
    )
  }
    handleYup (card) {
    console.log(`Yup for ${card.text}`)
  }

  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  }
  noMore(){
    return (
      <View style={styles.card} >
        <Text>No More Cards</Text>
      </View>
    )
  }

  yup(){
    console.log(this.refs['swiper'])
this.refs['swiper']._goToNextCard()  }

nope(){
    console.log(this.refs['swiper'])
this.refs['swiper']._goToNextCard()  }

  render() {
    return (
            <View style={styles.container}>
      <SwipeCards
        ref = {'swiper'}
        cards={this.state.cards}
        containerStyle = {{  backgroundColor: '#f7f7f7', alignItems:'center', margin:20}}
        renderCard={(cardData) => this.Card(cardData)}
        renderNoMoreCards={() => this.noMore()}
        handleYup={this.handleYup}
        handleNope={this.handleNope} />
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
        <TouchableOpacity style = {styles.buttons} onPress = {() => this.nope()}>
        <Icon name='close' size={45} color="#888" style={{}} />
        </TouchableOpacity>
        <TouchableOpacity style = {styles.buttons} onPress = {() => this.yup()}>
        <Icon name='favorite-border' size={36} color="#888" style={{marginTop:5}} />
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

export default ViewDogsScreen;