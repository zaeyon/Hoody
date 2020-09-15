import currentUser from './currentUser';
import search from './search'
import feedList from './feedList'
import keyword from './keyword';

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  currentUser,
  search,
  feedList,
  keyword,
});

export default rootReducer;
