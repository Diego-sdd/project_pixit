
import { combineReducers } from 'redux';

import authReducer from './authReducer';
import dataUserReducer from './dataUserReducer';
// Redux: Root Reducer
const rootReducer = combineReducers({
    authReducer: authReducer,
    dataUserReducer: dataUserReducer,
});

// Exports
export default rootReducer;