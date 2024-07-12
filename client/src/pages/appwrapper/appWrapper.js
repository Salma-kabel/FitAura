import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import userReducer from '../../userInformation/userReducer';
import App from '../../App/App';

const store = createStore(userReducer); // Create your Redux store

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;