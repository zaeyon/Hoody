import currentUser from './currentUser';
import search from './search'
import feedList from './feedList'

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  currentUser,
  search,
  feedList,
});

export default rootReducer;
