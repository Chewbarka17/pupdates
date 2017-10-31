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

//mport NewStackNav from '../Navbar/newStackNav';

class ViewDogsScreen extends React.Component {
  // static navigationOptions = {
  //   drawerLabel: 'Dogs',
  //   drawerIcon: ({tintColor}) => {
  //     return (
  //       <MaterialIcons
  //         name="pets"
  //         size={24}
  //         style={{color: tintColor}}
  //       >
  //       </MaterialIcons>
  //     );
  //   }
  // }

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
  }

  componentDidMount() {
    this.props.actions.getAllUnseenDogs(this.props.uid);
    this.getGeolocation();
    this.handleLocation()
    
  }

  getGeolocation() {
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
  }

  handleLocation() {
    console.log('this.state.dogIndex ', this.state.dogIndex)    
    const nextDog = this.props.viewDogs.unseenDogs[this.state.dogIndex]
    // let nextDogIndex = this.props.viewDogs.unseenDogs.indexOf(dogInfo)
    // if (nextDogIndex === 0) {
    //   nextDogIndex = -1;
    // } 
    // const nextDog = this.props.viewDogs.unseenDogs[nextDogIndex+1]
    // console.log('after: this is the index', nextDogIndex);
    console.log('dog Array is ', JSON.stringify(this.props.viewDogs.unseenDogs))
    console.log('next dog is ', nextDog)
    //const nextDog = this.props.unseenDogs.indexOf(dogInfo)
    //console.log('nextDog index is ', nextDog)

    axios.get(`http://localhost:8000/api/users/${nextDog.owner}`)
      .then(({data}) => {
        console.log('in handle location, ', data);
        this.compareLocation(data[0].coords);
      })
      .catch(err => {
        console.log(err);
      })
  }

  compareLocation(userOfInterestLocation) {
    let value = '';
    axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${this.state.latitude},${this.state.longitude}&destinations=${userOfInterestLocation[0]},${userOfInterestLocation[1]}&key=AIzaSyB1S52rdgtYi-52GK2b149DGxAZb_rKGdY`)
      .then(({data}) => {
        console.log('this is data', data.rows[0].elements[0].distance.text);
        value = data.rows[0].elements[0].distance.text;
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
    console.log('this is nope ', cardData)
    this.props.actions.updateDogsSeen(this.props.uid, cardData._id);
    this.state.dogIndex === this.props.viewDogs.unseenDogs.length ? null : this.handleLocation(cardData)
    this.setState({flag: false});
  }

  // press buttons
  yup() {
    if (this.refs['swiper'].props.cards[0]) {
      this.state.dogIndex === this.props.viewDogs.unseenDogs.length ? null : this.handleLocation(cardData)
      this.props.actions.getAllUnseenDogs(this.props.uid);
      this.props.actions.updateDogsSeen(this.props.uid, this.refs['swiper'].props.cards[0]._id)
      this.props.actions.updateLikedDogs(this.props.uid, this.refs['swiper'].props.cards[0]._id)
      this.setState({flag: false});
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
      this.setState({flag: false});
      this.state.dogIndex === this.props.viewDogs.unseenDogs.length ? null : this.handleLocation(cardData)
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
    console.log("need to show dog's profile");
    console.log("this.props:", this.props);
    console.log("this.props.navigation:", this.props.navigation); // undefined
    console.log("this.props.navigate:", this.props.navigate); // navigate function
    console.log("cardData:", cardData)
    // const { navigate } = this.props.navigation;
    //navigate('LikedDogProfile', this.refs['swiper'].props.cards[0]);
    this.props.navigate('LikedDogProfile', cardData);
  }

//<TabBar />

  render() {
    // {console.log('what is state: ', this.state)};
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
                  <View style={{padding:13, borderLeftWidth:1,borderColor:'#e3e3e3', alignItems:'center', justifyContent:'space-between'}}><Icon name='place' size={20} color="#777" /><Text style={{fontSize:16, fontWeight:'200', color:'#555'}}>{
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
        <View>
          {/* <MaterialIcons
            name="menu"
            size={24}
            onPress={() => this.props.navigation.navigate('DrawerOpen')}
          >
          </MaterialIcons> */}
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