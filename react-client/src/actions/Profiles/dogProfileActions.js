import axios from 'axios';

// Get a dog by dogid to update dog profile picture
export const getADog = (dogid, callback) => (dispatch) => {
  axios.get(`https://serene-atoll-31576.herokuapp.com/api/dogs/${dogid}`)
    .then((response) => {
      dispatch({ type: 'FETCH_DOG_FULFILLED', payload: response.data });
      callback(response.data);
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_DOG_REJECTED', payload: err });
    });
};

// takes ownerid to get owner's dogs
export const getOwnersDogs = ownerid => (dispatch) => {
  axios.get(`https://serene-atoll-31576.herokuapp.com/api/users/dogs/${ownerid}`)
    .then(({ data }) => {
      dispatch({ type: 'FETCH_OWNERS_DOGS_FULFILLED', payload: data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_OWNERS_DOGS_FAILED', payload: err });
    });
};

// posts new dog with all info. Callback used to resolve async call for pictures
export const postDogs = (name, age, breed, gender, bio, owner, pictures, callback) => (dispatch) => {
  axios.post('https://serene-atoll-31576.herokuapp.com/api/dogs', {
    name,
    age,
    breed,
    gender,
    bio,
    owner,
    pictures,
  })
    .then((response) => {
      dispatch({ type: 'POST_DOG_FULFILLED', payload: response.data });
      callback(response.data);
    })
    .catch((err) => {
      dispatch({ type: 'POST_DOG_REJECTED', payload: err });
    });
};

// update dog with new info
export const updateDogs = (name, age, breed, gender, bio, dogid, pictures) => (dispatch) => {
  axios.patch(`https://serene-atoll-31576.herokuapp.com/api/dogs/${dogid}`, {
    name,
    age,
    breed,
    gender,
    bio,
    pictures,
  })
    .then((response) => {
      dispatch({ type: 'UPDATE_DOG_FULFILLED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_DOG_REJECTED', payload: err });
    });
};

// delete dog from dog and user table => could be better with relational database
export const deleteDogs = (dogid, uid) => (dispatch) => {
  axios({
    method: 'delete',
    url: `https://serene-atoll-31576.herokuapp.com/api/dogs/${dogid}`,
    data: {
      owner: uid,
      dogid,
    },
  })
    .then(() => {
      dispatch({ type: 'DELETE_DOG_FULFILLED', payload: dogid });
    })
    .catch((err) => {
      dispatch({ type: 'DELETE_DOG_REJECTED', payload: err });
    });
};

export const showDog = dog => (dispatch) => {
  dispatch({ type: 'SHOW_DOG', payload: dog });
};
