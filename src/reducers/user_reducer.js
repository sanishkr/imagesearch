import { USER_LOGIN, USER_LOGOUT, USER_TOKEN } from '../actions';

export default function user(state=[],action){
    switch(action.type){
        case USER_LOGIN:
            console.log("User is ",action.user);
            return action.user;
        case USER_LOGOUT:
            console.log("User is ",action.user);
            return action.user;
        case USER_TOKEN:
            console.log("User token is ",action.token);
            return action.token;
        default:
            return state;
    }
}