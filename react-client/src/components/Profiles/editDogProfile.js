import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

import uploadProfilePicture from '../../components/Profiles/util/uploadProfilePictureUtil';
import * as dogActions from '../../actions/Profiles/dogProfileActions';

import Button from 'react-native-button';

class EditDogProfile extends Component {
  static navigationOptions = {
    title: 'EditDogProfile',
  };
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      age: '',
      breed: '',
      gender: '',
      bio: '',
      image: null,
      picture: '',
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
    const { name, age, breed, gender, bio, picture } = this.state;
    const { params } = this.props.navigation.state;
    let nameCheck = name || params.name;
    let ageCheck = age || params.age;
    let breedCheck = breed || params.breed;
    let genderCheck = gender || params.gender;
    let bioCheck = bio || params.bio;
    let pictureCheck = picture || params.pictures[0];
    let dogid = params._id;

    this.props.actions.getADog(dogid, (data) => {
      if (this.state.image) {
        uploadProfilePicture(this.props.awsSauce, dogid, this.state.image, (err, result) => {
          if (err) {
            console.log('upload profile picture', err);
          }
          if (result) {
            pictureCheck = result.Location;
          }
          this.props.actions.updateDogs(nameCheck, ageCheck, breedCheck, genderCheck, bioCheck, dogid, pictureCheck, data[0])
          this.navigateToTabBar();
        });
      } else {
        this.props.actions.updateDogs(nameCheck, ageCheck, breedCheck, genderCheck, bioCheck, dogid, pictureCheck, data[0])
        this.navigateToTabBar();
      }
    });
  }


  navigateToTabBar() {
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const pictureSelected = this.state.image;
    return (
      <View style={styles.container}>
      <Text></Text>
      <View style={[styles.boxContainer, styles.boxOne]}>
        {pictureSelected !== null ? (
          <Image
            style={{width: 150, height: 150, borderRadius: 75}}
            source={{uri: pictureSelected.path}}
          />
        ) : (
          <Image
          style={{width: 150, height: 150, borderRadius: 75}}
          source={{uri: params.pictures[0]}}
          />
        )}
        <Text></Text>
      <Button
        onPress={this.selectProfilePhoto}
        containerStyle={{height:30, width: 130, overflow:'hidden', borderRadius:20, backgroundColor: '#828be5', justifyContent:'center', alignItems:'center'}}
        style={{fontSize: 16, color: 'white', justifyContent:'center', alignItems:'center'}}
      >
        Edit Picture
      </Button>
      </View>
      <View style={[styles.boxContainer, styles.boxTwo]}>
        <FormLabel>Name</FormLabel>
        <FormInput
          editable
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={params.name || 'enter'}
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
          placeholder={params.age ? params.age.toString() : 'enter'}
          returnKeyType="next"
          id="age"
          onChangeText={age => this.setState({ age })}
        />
        <FormLabel>Breed</FormLabel>
        <FormInput
          editable
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={params.breed || 'enter'}
          returnKeyType="next"
          id="zipcode"
          onChangeText={breed => this.setState({ breed })}
        />
        <FormLabel>Gender</FormLabel>
        <FormInput
          editable
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={params.gender || 'enter'}
          returnKeyType="next"
          id="gender"
          onChangeText={gender => this.setState({ gender })}
        />
        <FormLabel>Bio</FormLabel>
        <FormInput
          editable
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={params.bio || 'enter'}
          returnKeyType="next"
          id="bio"
          onChangeText={bio => this.setState({ bio })}
        />
        </View>
        <View style={[styles.boxContainer, styles.boxThree]}>
          <Button
          containerStyle={{height:35, width: 250, overflow:'hidden', borderRadius:20, backgroundColor: '#f44e64', justifyContent:'center', alignItems:'center'}}
          style={{fontSize: 20, color: 'white', justifyContent:'center', alignItems:'center'}}
          onPress={this.handleSubmit}
          >
            Save
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  boxContainer: {
    flex: 1,
  },
  boxOne: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxTwo: {
    flex: 4,
  },
  boxThree: {
    flex: 1,
    //flexWrap: 'wrap'
    justifyContent: 'center',
    alignItems: 'center',
  }
});

  const dogState = (store) => {
    return {
      awsSauce: store.Owners.awsSauce,
    }
  }

  const dogDispatch = (dispatch) => {
    return {
      actions: bindActionCreators(dogActions, dispatch),
    }
  };

  export default connect(dogState, dogDispatch)(EditDogProfile);
