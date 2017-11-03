import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

export const getOwnerFromDB = (fb, callback) => (dispatch) => {
  axios.get(`http://localhost:8000/api/fbuser/${fb.id}`)
    .then(({ data }) => {
      if (data.length === 0) {
        console.log('User doesn\'t exist in collection');
      } else {
        dispatch({ type: 'GET_OWNER_FROM_MONGO_FULFILLED', payload: data[0] });
      }
    })
    .catch((err) => {
      console.log('User doesn\'t exist in collection', err);
    });
};

export const addOwnerToDB = fb => (dispatch) => {
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
    })
    .catch((err) => {
      dispatch({ type: 'POST_OWNER_FROM_MONGO_REJECTED', payload: err });
    });
};

export const saveAwsSecretSauce = (accessKeyId, secretAccessKey, sessionToken) => (dispatch) => {
  const aws = {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    sessionToken: sessionToken,
  };
  dispatch({ type: 'AWS_SECRET_SAUCE_FULFILLED', payload: aws });
};

export const updateOwners = (name, age, location, bio, userid, coords, picture) => (dispatch) => {
  location.formatted_address ? location = location.formatted_address : location;
  axios.patch('http://localhost:8000/api/users', {
    userid,
    name,
    age,
    location,
    bio,
    coords,
    picture,
    rating: 4,
  })
    .then((response) => {
      dispatch({ type: 'UPDATE_OWNER_FULFILLED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_OWNER_REJECTED', payload: err });
    });
};

export const logOut = () => (dispatch) => {
  dispatch({type: 'OWNER_LOGGED_OUT_FULFILLED', payload: false });
}

export const logOutFailure = (error) => (dispatch) => {
  dispatch({type: 'OWNER_LOGGED_OUT_REJECTED', payload: error });
}