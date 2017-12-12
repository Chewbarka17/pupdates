import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, 
         Text, 
         FlatList, 
         StyleSheet, 
         Image, } from 'react-native';
import { List, 
         ListItem, 
         Avatar } from 'react-native-elements';
import { GOOGLE_API } from 'react-native-dotenv';

import axios from 'axios';

import Swipeout from 'react-native-swipeout';
import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import ViewDogProfileScreen from '../Profiles/viewDogProfile';
import corgiGif from '../../../images/profileCoolCorgiCropped.gif';
import * as dogActions from '../../actions/Profiles/dogProfileActions';
import * as ownerActions from '../../actions/Profiles/ownerActions';

class ViewOwnerProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };

    this.ownerProfile = null;
    this.handlePressToEditUser = this.handlePressToEditUser.bind(this);
    this.handlePressToAddDog = this.handlePressToAddDog.bind(this);
    this.handleGeolocation = this.handleGeolocation.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.logout = this.logout.bind(this);
  }
  
  componentDidMount() {
    this.handleGeolocation();
    this.props.dogActions.getOwnersDogs(this.props.userId);
  }

  // edit user navigates to edit owner profile form
  handlePressToEditUser() {
    this.props.navigation.navigate('EditOwnerProfile');
  }
  
  // edit add a dog navigates to add dog form
  handlePressToAddDog() {
    this.props.navigation.navigate('AddDogProfile');
  }

  // retrieve user geolocation
  handleGeolocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        })
        this.getLocation(position);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  // retrieve address of geolocation coordinates
  getLocation(position) {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${GOOGLE_API}`)
      .then(({data}) => {
        this.props.ownerActions.updateOwners(
          this.props.user.name, 
          this.props.user.age, 
          data.results[0],
          this.props.user.bio,
          this.props.user._id,
          [position.coords.latitude, position.coords.longitude],
          this.props.user.picture,
        )
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // logout button functionality
  logout() {
    this.props.ownerActions.logOut()
  }
  
  // react native specific
  _keyExtractor(item, index) {
    return item._id
  };

  render () {
    const { user, profilePic, dogs } = this.props;
    return (
      <View style={styles.container}>

        <View style={[styles.boxContainer, styles.boxOne]}>
          <Image
            style={styles.corgiImage}
            source={corgiGif}
          />
        </View>

        <View style={[styles.boxContainer, styles.boxTwo]}>
          <Avatar
            xlarge
            rounded
            source={{uri: profilePic}}
            activeOpacity={0.7}
          />
        </View>

        <View style={[styles.boxContainer, styles.boxThree]}>          
          <Text style={styles.titleText}>
           {user.name}, {user.age}
          </Text>

          <Button
            containerStyle={styles.editDogContainer}
            onPress={this.handlePressToEditUser}
          >
            <Icon
              name='mode-edit'
              size={20}
              color="#9e9e9e"
            />
          </Button>
        </View>

        <View style={[styles.boxContainer, styles.boxFour]}>
         
         { user.age ?
         <Text style={styles.baseText}>
         </Text> : null
         }

         { user.bio ?
         <Text style={styles.baseText}>
           {user.bio}
         </Text> : null
         }

         <Text style={styles.baseText}>
           {user.location.split(',')[1]}
         </Text>

        </View>

        <View style={[styles.boxContainer, styles.boxFive]}>

           <FlatList
           data={dogs}
           keyExtractor={this._keyExtractor}
           renderItem={({ item }) => 
             <Swipeout right={[{
               text: 'Delete',
               backgroundColor: 'red',
               onPress: (event) => {
                 this.props.dogActions.deleteDogs(item._id, this.props.userId);
               }
             }]}
               autoClose={true}
               backgroundColor='transparent'
             >
             <ListItem containerStyle={styles.listItemLines}
               roundAvatar
               onPress={() =>
                 this.props.navigation.navigate('ViewDogProfile', item)
               }
               title={item.name}
               avatar={{ uri: `${item.pictures[0]}` }}
               id={item.id}
             />
             </Swipeout>
           }
         />
        </View>

        <View style={[styles.boxContainer, styles.boxSix]}>

          <Button
            containerStyle={styles.addDogContainer}
            style={styles.addDogButton}
            onPress={this.handlePressToAddDog}
          >
            Add Dog
          </Button>

          <Button
            containerStyle={styles.logoutContainer}
            style={styles.logoutButton}
            onPress={() => this.logout()}
          >
            Logout
          </Button>

        </View>
      </View>
    )
  }
}

ViewOwnerProfile.PropTypes = {
  dogs: PropTypes.array,
  user: PropTypes.object,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  boxContainer: {
    flex: 1,
  },
  boxOne: {
    flex: 5,
    backgroundColor: '#117bae',
    marginRight: -20,
    marginLeft: -20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxTwo: {
    flex: 3,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:15,
  },
  boxThree: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
    paddingLeft: 65
  },
  boxFour: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  boxFive: {
    flex: 1,
    backgroundColor: 'white',
  },
  boxSix: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 10,
  },
  baseText: {
    fontFamily: 'Avenir',
    fontSize: 17,
    color: '#898989',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3f3f3f',
  },
  addDogButton: {
    fontSize: 19, 
    color: 'white', 
    justifyContent:'center', 
    alignItems:'center',
  },
  editDogContainer: {
    height:30, 
    width: 65, 
    overflow:'hidden', 
    borderRadius:25, 
    backgroundColor:'white', 
    justifyContent:'center', 
    alignItems:'center',
  },
  addDogContainer: {
    height:30, 
    width: 160, 
    overflow:'hidden', 
    borderRadius:25, 
    backgroundColor: '#f44e64', 
    justifyContent:'center', 
    alignItems:'center',
  },
  logoutContainer: {
    height:35, 
    width: 250, 
    overflow:'hidden', 
    borderRadius:20, 
    backgroundColor: 'white', 
    justifyContent:'center', 
    alignItems:'center',
  },
  logoutButton: {
    fontSize: 18, 
    color: '#92aefc', 
    justifyContent:'center', 
    alignItems:'center',
  },
  corgiImage: {
    width: 235, 
    height: 140,
  },
  listItemLines: {
    borderTopWidth: 0, 
    borderBottomWidth: 0,
  }
});

const viewOwnerState = (store) => {
  return {
    dogs: store.Dogs.dogs,
    user: store.Owners.user,
    userId: store.Owners.user._id,
    location: store.Owners.userLocation,
    profilePic: store.Owners.user.picture,
  }
}

const viewOwnerDispatch = (dispatch) => {
  return {
    dogActions: bindActionCreators(dogActions, dispatch),
    ownerActions: bindActionCreators(ownerActions, dispatch),
  }
};

export default connect(viewOwnerState, viewOwnerDispatch)(ViewOwnerProfile);