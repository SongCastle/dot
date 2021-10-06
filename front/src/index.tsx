import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store, runSaga } from './store';
import { Routes } from './components/routes';
import './styles/index.css';

runSaga();

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
