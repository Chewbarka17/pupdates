import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import Button from 'react-native-button';

import * as dogActions from '../../actions/Profiles/dogProfileActions';

class viewDogProfile extends Component {
  static navigationOptions = {
    title: 'Dog Profile',
  };
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
  }

  componentWillMount() {
    this.props.actions.showDog(this.props.navigation.state.params)
  }

  handlePress() {
    const { navigate } = this.props.navigation
    navigate('EditDogProfile', this.props.navigation.state.params);
  }

  render () {
    const { 
      name, 
      age, 
      breed, 
      gender, 
      bio,
      pictures,
    } = this.props.dog;

    return (
      <View style={styles.container}>
      <View style={[styles.boxContainer, styles.boxOne]}>
        <Image
          style={{width: 220, height: 220, borderRadius: 110}}
          source={{uri: pictures[0]}}
        />
        </View>
        <View style={[styles.boxContainer, styles.boxTwo]}>
          <Text style={styles.titleText}>
            { name }
          </Text>
          <Text style={styles.baseText}>
            Breed: { breed }
          </Text>
          <Text style={styles.baseText}>
            Gender: { gender }
          </Text>
          <Text style={styles.baseText}>
            Age: { age }
          </Text>
          <Text style={styles.baseText}>
            Bio: { bio }
          </Text>
        </View>
        <View style={[styles.boxContainer, styles.boxThree]}>
          <Button
            onPress={this.handlePress}
            containerStyle={{height:45, width: 250, overflow:'hidden', borderRadius:20, backgroundColor: '#f44e64', justifyContent:'center', alignItems:'center'}}
            style={{fontSize: 16, color: 'white', justifyContent:'center', alignItems:'center'}}
          >
            Edit
          </Button>
        </View>
      </View>
    )
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
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxTwo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxThree: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseText: {
    fontFamily: 'Avenir',
    fontSize: 17,
    color: '#898989',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#3f3f3f',
  },
});

const dogState = (store) => {
  return {
    dog: store.Dogs.dogInfo
  }
}

const dogDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(dogActions, dispatch),
  }
};

export default connect(dogState, dogDispatch)(viewDogProfile);