import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Animated,
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

import LikedDogProfile from '../Likes/likedDogProfile';

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

  // for card flip =======
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }

  // card flip function ============
  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
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
          style={{width: 550, height: 490}}
          source={require('../../../images/noMoreCryingCorgi.gif')}
        />
      </View>
    )
  }

  render() {    
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }
   
   return (
      <View style={styles.container}>

        {/* dog card */}
        <SwipeCards
          nopeText = {'GRRR!'}
          yupText = {'WOOF!'}
          fontWeight = {'bold'}
          ref = {'swiper'}
          cards={this.props.unseenDogs}
          containerStyle = {{ backgroundColor: 'white', alignItems:'center', margin:20 }}
          nopeText={"Grrr!"}
          yupText= {"Woof!"}
          renderCard={(cardData) => (
            <View>
              <Animated.View style={[styles.card, frontAnimatedStyle]}>
                <Image
                  source ={{uri: cardData.pictures[0]}}
                  style ={{width:348, height:420, borderRadius:10}}
                />
                <View style={{width:350, height:70, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                  <View style={{flexDirection:'row', margin:15, marginTop:20,}} >
                    <Text style={{fontFamily:'Avenir', fontSize:24, fontWeight:'bold', color:'#444'}}>{cardData.name} </Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <View style={{padding:13, borderLeftWidth:1,borderColor:'#e3e3e3', alignItems:'center', justifyContent:'space-between'}}>
                      <Icon name='place' size={20} color="#777" />
                      <Text style={{fontFamily:'Avenir', fontSize:16, fontWeight:'300', color:'#a0a0a0'}}>
                        {
                          this.props.distance
                        }
                      </Text>
                    </View>
                  </View>
                </View>
              </Animated.View>

              <Animated.View style={[styles.card, styles.flipCardBack, backAnimatedStyle]}>
                <Image
                  style={styles.dogProfilePic}
                  source={{uri: cardData.pictures[0]}}
                />
                <Text style={styles.titleText}>
                  {cardData.name}
                </Text>
                <Text style={styles.baseText}>
                  {cardData.breed}
                </Text>
                <Text style={styles.baseText}>
                  {cardData.gender}, {cardData.age} years old
                </Text>
                <Text style={styles.baseText}>
                  {cardData.bio}
                </Text>
              </Animated.View>

            </View>
          )}
          handleYup={(cardData) => (this.handleYup(cardData))}
          handleNope={(cardData) => (this.handleNope(cardData))}
          renderNoMoreCards={() => this.noMore()}
        />

        {/* three buttons */}
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <TouchableOpacity
            style = {styles.buttons}
            onPress = {() => this.nope()}
          >
            <Icon 
              name='close'
              size={40}
              color="#5a7bf4"
              style={{}}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.buttonSmall}
            onPress={() => this.flipCard()}
          >
            <Icon 
              name='info-outline'
              size={25}
              color="#88c994"
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
              color="#f44e64"
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
    backgroundColor: 'white',
  },
  buttons:{
    width:80, 
    height:80, 
    borderWidth:10, 
    borderColor:'#e7e7e7', 
    justifyContent:'center', 
    alignItems:'center',
    borderRadius:40,
    marginTop: 8,
    margin: 20,
  },
  buttonSmall: {
    width:55, 
    height:55, 
    borderWidth:10, 
    borderColor:'#e7e7e7', 
    justifyContent:'center', 
    alignItems:'center',
    borderRadius:40
  },
   card: {
    flex: 1,
    alignItems: 'center',
    alignSelf:'center',
    borderWidth:2,
    borderColor:'#e3e3e3',
    width: 350,
    height: 490,
    backgroundColor: 'white',
    marginTop: 0,
    borderRadius: 10,
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor:'#ededed',
    position:'absolute',
    top:0,
  },
  baseText: {
    fontFamily: 'Avenir',
    fontSize: 17,
    color: '#898989',
  },
  titleText: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#3f3f3f',
  },
  dogProfilePic: {
    width: 348,
    height: 350
  },
 
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