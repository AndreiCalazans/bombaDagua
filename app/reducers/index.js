import { combineReducers } from 'redux';
import {reducer as formReducer } from 'redux-form';
import  resultsReducer  from './resultsReducer';

const rootReducer = combineReducers({
  form: formReducer,
  results: resultsReducer 
});

export default rootReducer;
