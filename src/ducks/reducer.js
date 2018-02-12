import axios from 'axios';
//import api from '../api';

// Set up initial state
const initialState = {
  user: {}
};

// Action types
const GET_USER_INFO = 'GET_USER_INFO';
const GET_USER_INFO_FULFILLED = 'GET_USER_INFO_FULFILLED';

// Action creators
export function getUserInfo() {
  let userData = axios.get( '/api/auth/authenticated' ).then( res => res.data )
  return {
    type: GET_USER_INFO,
    payload: userData
  }
}

// Reducer function
export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case GET_USER_INFO_FULFILLED:
      return Object.assign( {}, state, { user: action.payload });
    default:
      return state;
  }
}