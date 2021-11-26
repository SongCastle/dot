import { connectRouter, routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { configureStore } from '@reduxjs/toolkit';

import { watchCategoriesRequest } from './categories';
import { reducer as ormReducer } from './orm';
import { reducer as progressReducer } from './progresses';
import { watchRoomsRequest } from './rooms';

// History, Router
export const history = createBrowserHistory();
const routerMiddleware = createRouterMiddleware(history);

// Root Reducer
const rootReducer = {
  orm: ormReducer,
  progress: progressReducer,
  router: connectRouter(history),
};

// Root Saga
function* rootSaga() {
  yield all([fork(watchCategoriesRequest), fork(watchRoomsRequest)]);
}
const sagaMiddleware = createSagaMiddleware();
export const runSaga = () => {
  sagaMiddleware.run(rootSaga);
};

// Store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware, routerMiddleware),
});
export const { dispatch } = store;
