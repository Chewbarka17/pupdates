import axios from 'axios';
import { AsyncStorage } from 'react-native';
//import { StackNavigator, NavigationActions } from 'react-navigation';

export const getOwnerFromDB = (fb, navigate, callback) => (dispatch) => {
  axios.get(`http://localhost:8000/api/fbuser/${fb.id}`)
    .then(({ data }) => {
      if (data.length === 0) {
        callback('User doesn\'t exist in collection');
      } else {
        dispatch({ type: 'GET_OWNER_FROM_MONGO_FULFILLED', payload: data[0] });
        AsyncStorage.setItem('mongoOwner', JSON.stringify(data), (error) => {
          if (error) {
            alert('Failure! Could not save user to async storage', error);
          }
        });
         navigate('TabBar');
        // const navigateToTabBar = NavigationActions.navigate({
        //   routeName: 'TabBar'
        // });
        // this.props.navigation.dispatch(navigateToTabBar);
      }
    })
    .catch((err) => {
      callback('User doesn\'t exist in collection');
    });
};

export const addOwnerToDB = (fb, navigate) => (dispatch) => {
  const user = {
    fb_id: fb.id,
    name: fb.name,
    picture: fb.picture.data.url,
    age: null,
    location: '',
    bio: '',
    rating: null,
  };
  axios.post('http://localhost:8000/api/users', user)
    .then(({ data }) => {
      dispatch({ type: 'POST_OWNER_FROM_MONGO_FULFILLED', payload: data });
      AsyncStorage.setItem('mongoOwner', JSON.stringify(data), (error) => {
        if (error) {
          alert('Failure! Could not save user to async storage', error);
        }
      });
      navigate('TabBar');
    })
    .catch((err) => {
      dispatch({ type: 'POST_OWNER_FROM_MONGO_REJECTED', payload: err });
      console.log(err);
    });
};

export const saveAwsSecretSauce = (accessKeyId, secretAcessKey, sessionToken) => (dispatch) => {
  const aws = {
    accessKeyId,
    secretAcessKey,
    sessionToken,
  };
  dispatch({ type: 'AWS_SECRET_SAUCE_FULFILLED', payload: aws });
};

// export const postOwners = (name, age, location, bio) => (dispatch) => {
//   console.log('axios post', typeof age, age);
//   axios.post('http://localhost:8000/api/users', {
//     name,
//     age,
//     location,
//     bio,
//     picture: 'http://www.readersdigest.ca/wp-content/uploads/2011/01/4-ways-cheer-up-depressed-cat.jpg',
//     rating: 4,
//   })
//     .then((response) => {
//       console.log('owner action', typeof response.data.age);
//       dispatch({ type: 'POST_OWNER_FULFILLED', payload: response.data });
//     })
//     .catch((err) => {
//       dispatch({ type: 'POST_OWNER_REJECTED', payload: err });
//     });
// };

export const updateOwners = (name, age, location, bio, userid, coords) => (dispatch) => {
  console.log('update owners location', location);
  location.formatted_address ? location = location.formatted_address : location;
  axios.patch('http://localhost:8000/api/users', {
    userid,
    name,
    age,
    location,
    bio,
    coords,
    picture: 'http://www.readersdigest.ca/wp-content/uploads/2011/01/4-ways-cheer-up-depressed-cat.jpg', // to be changed
    rating: 4, // to be changed
  })
    .then((response) => {
      dispatch({ type: 'UPDATE_OWNER_FULFILLED', payload: response.data });
      AsyncStorage.setItem('mongoOwner', JSON.stringify(response.data), (error) => {
        if (error) {
          console.log('Failure! Could not save user to async storage during update', error);
        }
      });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_OWNER_REJECTED', payload: err });
    });
};
