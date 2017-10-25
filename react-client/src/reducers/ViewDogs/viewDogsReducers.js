import action from '../../actions/ViewDogs/viewDogsActions';

const initialState = {
  unseenDogs: [],
  likedDogs: [],
  seenDogs: [],
  fetched: false,
  seenUpdated: false,
  likedUpdated: false,
  error: null
}

const viewDogReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'FETCH_ALL_UNSEEN_DOGS_FULFILLED': {
      console.log('Im in the reducers');
      return Object.assign({}, state, {
        fetched: true,
        unseenDogs: action.payload // [{dog}, {dog}, {dog},...]
      }); 
    }

    case 'FETCH_ALL_UNSEEN_DOGS_REJECTED': {
      console.log('Im in the reducers');
      return Object.assign({}, state, {
        error: action.payload
      });
    }

    // case 'UPDATE_SEEN_DOGS_FULFILLED': { // adds a dog to dogsSeen
    //   return Object.assign({}, state, {
    //     seenUpdated: true,
    //     seenDogs: action.payload // dogsSeen: ["1234dogid56789", "98765dogid56789"]
    //   });
    // }

    // case 'UPDATE_SEEN_DOGS_REJECTED': {
    //   return Object.assign({}, state, {
    //     error: action.payload
    //   });
    // }

    // case 'UPDATE_LIKED_DOGS_FULFILLED': { // adds a dog to dogsLiked
    //   return Object.assign({}, state, {
    //     likedUpdated: true,
    //     likedDogs: action.payload // dogsLiked: ["1234dogid56789", "98765dogid56789"]
    //   });
    // }

    // case 'UPDATE_LIKED_DOGS_REJECTED': {
    //   return Object.assign({}, state, {
    //     error: action.payload
    //   });
    // }
  }
  return state;
}

export default viewDogReducer; 