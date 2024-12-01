// src/redux/store.js

import { createStore } from 'redux';
import { combineReducers } from 'redux';
import authReducer from './authSlice';  // Path to your auth slice

const rootReducer = combineReducers({
  auth: authReducer,  // Include your reducer here
});

const store = createStore(rootReducer);

export default store;
