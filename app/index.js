import React from 'react';
import ReactDOM from 'react-dom';
import {Router ,  Route} from 'react-router-dom';
import history from './history';
import reduxThunk from 'redux-thunk';
import './style/style.scss';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware , compose} from 'redux';


import reducers from './reducers';


import Main from './components/Main';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers ,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



ReactDOM.render(

 <Provider store={store}>
    <Router history={history}>
      <Main></Main>
    </Router>
 </Provider>,
  document.getElementById('root')
)
