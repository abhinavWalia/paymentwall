import React from 'react'; 
import ReactDOM from 'react-dom'; 
import App from './App'; 
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { createStore, combineReducers,applyMiddleware } from 'redux'
import {combineForms} from 'react-redux-form'
import thunk from 'redux-thunk';
import '../client/styles/main.scss'
import moment from 'moment'


const initialUserState = {
  fullname: '',
  cardnumber:'',
  expiry: moment(),
  cvv:'',
  password:'',
  confirmpassword:''
};

const store = createStore(combineForms({
  user: initialUserState
}))




ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
       <App/>
    </HashRouter>
  </Provider>, // mount our frame component
  document.getElementById('app')
);
