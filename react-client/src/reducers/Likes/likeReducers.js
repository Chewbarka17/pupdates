import action from '../../actions/Likes/likeActions';

const initialState = {
  likedDogs: [],
  fetched: false,
  removed: false,
  error: null
}

const dogReducer = (state=initialState, action) => {
  // console.log('what is actions', action);
  switch(action.type) {
    case 'FETCH_LIKED_DOGS_FULFILLED': {
      return Object.assign({}, state, {

      }); 
    }

    case 'FETCH_LIKED_DOGS_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload
      });
    }

    case 'REMOVE_LIKED_DOGS_FULFILLED': {
      return Object.assign({}, state, {

      }) 
    }

    case 'REMOVE_LIKE_DOGS_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload
      });
    }

  }
  return state;
}

export default dogReducer; 