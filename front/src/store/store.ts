import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { configureStore, createSelector } from '@reduxjs/toolkit';

import { watchCategoriesRequest } from './categories';
import { 
  latestCategoriesORMSelector,
  categoryRoomsORMSelector,
  latestRoomsORMSelector,
  reducer as ormReducer
} from './orm';
import { reducer as progressReducer } from './progresses';
import type { channel } from './progresses';
import { watchRoomsRequest } from './rooms';

// Root Reducer
const rootReducer = {
  orm: ormReducer,
  progress: progressReducer
};

// Root Saga
function* rootSaga() {
  yield all([
    fork(watchCategoriesRequest),
    fork(watchRoomsRequest)
  ])
};

// Store
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});
export const dispatch = store.dispatch;

export const runSaga = () => {
  sagaMiddleware.run(rootSaga);
};

// Selector
const ormSelector = createSelector(store.getState, (state) => state.orm);
export const latestCategoriesSelector = createSelector(ormSelector, orm => latestCategoriesORMSelector(orm));
export const categoryRoomsSelector = createSelector(
  ormSelector,
  (orm) => (category_id: string) => categoryRoomsORMSelector(orm, category_id)
);

export const latestRoomsSelector = createSelector(ormSelector, (orm) => latestRoomsORMSelector(orm));

export const progressSelector = createSelector(store.getState, (state) => (channel: channel) => {
  return state.progress[channel]
});
