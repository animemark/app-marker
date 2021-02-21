import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from '../redux/store';

import AppContainer from '../elements/profile.default/AppContainer';
import '../scss/app-base.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
