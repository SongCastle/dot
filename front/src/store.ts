import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { configureStore } from '@reduxjs/toolkit';

import { categoriesReducer, watchCategoriesRequest } from './categories';
import { roomsReducer, watchRoomsRequest } from './rooms';

const rootReducer = {
  categories: categoriesReducer,
  rooms: roomsReducer
};

function* rootSaga() {
  yield all([
    fork(watchCategoriesRequest),
    fork(watchRoomsRequest)
  ])
};

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});
export const dispatch = store.dispatch;

export const runSaga = () => {
  sagaMiddleware.run(rootSaga);
}

export type RootState = ReturnType<typeof store.getState>;
