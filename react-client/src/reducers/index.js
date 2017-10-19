import { combineReducers } from 'redux';
import Dogs from './Profiles/dogReducers';
import Likes from './Likes/likeReducers';
import Messages from './MessageReducers/ChatRoomReducers';
import Owners from './Profiles/ownerReducers';

const PupdatesReducers = combineReducers({
  Dogs,
  Likes,
  Messages,
  Owners,
});

export default PupdatesReducers;
