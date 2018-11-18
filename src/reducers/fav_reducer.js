import { ADD_FAV, REM_FAV } from '../actions';

export default function addToFavorite(state=[],action){
    switch(action.type){
        case ADD_FAV:
            console.log("Added  To Favorite ",action.movie);
            let  favoriteMovies = [...state,action.movie];
            return favoriteMovies;
        case REM_FAV:
            console.log("Removed from Favorite ",action.movie);
            favoriteMovies = state.filter(item => item.id !== action.movie.id)
            return favoriteMovies;
        default:
            return state;
    }
}