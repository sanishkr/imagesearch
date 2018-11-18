import movies from './movies_reducer';
import favorites from './fav_reducer';
import user from './user_reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    movies,
    favorites,
    user
})
export default rootReducer;