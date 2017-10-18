import { combineReducers } from 'redux';
import Dogs from './Profiles/dogReducers';
import Likes from './Likes/likeReducers';
import Owners from './Profiles/ownerReducers';

const PupdatesReducers = combineReducers({
  Dogs,
  Likes,
  Owners,
});

export default PupdatesReducers;
