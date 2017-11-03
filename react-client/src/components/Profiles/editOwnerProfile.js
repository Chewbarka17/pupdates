import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import uploadProfilePicture from '../../components/Profiles/util/uploadProfilePictureUtil';
import * as ownerActions from '../../actions/Profiles/ownerActions';

class EditOwnerProfile extends Component {
  static navigationOptions = {
    title: 'EditProfile',
  };
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      age: '',
      bio: '',
      image: null,
      picture: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectProfilePhoto = this.selectProfilePhoto.bind(this);
    this.navigateToTabBar = this.navigateToTabBar.bind(this);
  };

  selectProfilePhoto() {
    ImagePicker.openPicker({
      width: 256,
      height: 256,
      cropping: true
    }).then(image => {
      this.setState({image: image});
    }).catch(err => {
      console.log('Image not selected', err);``
    });
  }

  handleSubmit() {
    const { name, age, bio, picture } = this.state;
    let nameCheck = name || this.props.name;
    let ageCheck = age || this.props.age;
    let bioCheck = bio || this.props.bio;
    let pictureCheck = picture || this.props.picture;

    // image is the image obj
    // picture contains a url of the picture in MongoDB
    // should really be called pictureURL
    if (this.state.image) {
      uploadProfilePicture(this.props.awsSauce, this.props.userId, this.state.image, (err, data) => {
        if (err) {
          console.log('upload profile picture', err);
        }
        if (data) {
          pictureCheck = data.Location;
        }
        this.props.actions.updateOwners(nameCheck, ageCheck, this.props.location, bioCheck, this.props.userId, this.props.coords, pictureCheck, (data) => {
          this.navigateToTabBar();
        });
      });
    } else {
      this.props.actions.updateOwners(nameCheck, ageCheck, this.props.location, bioCheck, this.props.userId, this.props.coords, pictureCheck, (data) => {
        this.navigateToTabBar();
      });
    }
  }

  navigateToTabBar() {
    const navigateToTabBar = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'TabBar'})
      ]
    });
    this.props.navigation.dispatch(navigateToTabBar);
  }

  render() {
    console.log('rendering edit owner profile')
    const { navigate } = this.props.navigation;
    const pictureSelected = this.state.image;
    return (
      <View>
        <FormLabel>Name</FormLabel>
        <FormInput
          editable
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={this.props.name || 'enter your name'}
          returnKeyType="next"
          id="name"
          onChangeText={name => this.setState({ name })}
        />
        <FormLabel>Age</FormLabel>
        <FormInput
          editable
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={this.props.age ? this.props.age.toString() : 'enter your age'}
          returnKeyType="next"
          id="age"
          onChangeText={age => this.setState({ age })}
        />
        <FormLabel>Bio</FormLabel>
        <FormInput
          editable
          autoCorrect={true}
          underlineColorAndroid="transparent"
          placeholder={this.props.bio || 'enter a bio'}
          returnKeyType="next"
          id="bio"
          onChangeText={bio => this.setState({ bio })}
        />
        {pictureSelected !== null ? (
          <Image
            style={{width: 200, height: 200}}
            source={{uri: pictureSelected.path}}
          />
        ) : (
          <Image
          style={{width: 200, height: 200}}
          source={{uri: this.props.picture}}
          />
        )}
        <Button
          title='Choose profile picture'
          onPress={this.selectProfilePhoto}
          color="#ffffff"
          backgroundColor='#397af8'
        />
        <Button
          title="Save"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

const ownerState = (store) => {
  return {
    name: store.Owners.user.name,
    age: store.Owners.user.age,
    location: store.Owners.user.location,
    bio: store.Owners.user.bio,
    userId: store.Owners.user._id,
    coords: store.Owners.user.coords,
    picture: store.Owners.user.picture,
    user: store.Owners.user,
    awsSauce: store.Owners.awsSauce
  }
}


const ownerDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(ownerActions, dispatch),
  }
};

export default connect(ownerState, ownerDispatch)(EditOwnerProfile);
