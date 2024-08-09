import { combineReducers } from '@reduxjs/toolkit';
import loadingReducer from './slices/loading.slice.js';
import errorReducer from './slices/error.slice.js';
import successReducer from './slices/success.slice.js';
import userReducer from './slices/user.slice.js';

const rootReducer = combineReducers({
    loading: loadingReducer,
    success: successReducer,
    error: errorReducer,
    user: userReducer
});

export default rootReducer;