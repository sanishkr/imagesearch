export const MOVIES = "MOVIES";
export const ADD_FAV = "ADD_FAV";
export const REM_FAV = "REM_FAV";
export const USER_LOGIN = "USER_LOGIN";
export const USER_TOKEN = "USER_TOKEN";
export const USER_LOGOUT = "USER_LOGOUT";

export function movies(items){
    const action = {
        type: MOVIES,
        items
    }
    return action;
}
export function addToFavorite(movie){
    return {
        type: ADD_FAV,
        movie
    }
}

export function removeFromFavorite(movie){
    return {
        type: REM_FAV,
        movie
    }
}

export function UserLogin(user){
    return {
        type: USER_LOGIN,
        user
    }
}

export function UserLogout(user){
    return {
        type: USER_LOGOUT,
        user
    }
}

export function UserToken(token){
    return {
        type: USER_TOKEN,
        token
    }
}