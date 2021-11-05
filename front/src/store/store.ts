import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { configureStore, createSelector } from '@reduxjs/toolkit';

import { watchCategoriesRequest } from './categories';
import {
  latestCategoriesORMSelector,
  categoryRoomsORMSelector,
  latestRoomsORMSelector,
  reducer as ormReducer,
} from './orm';
import { reducer as progressReducer } from './progresses';
import type { Channel } from './progresses';
import { watchRoomsRequest } from './rooms';

// Root Reducer
const rootReducer = {
  orm: ormReducer,
  progress: progressReducer,
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
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});
export const { dispatch } = store;

// TODO: Selector の定義箇所について

// Selector
// ORM Selector
const ormSelector = createSelector(store.getState, (state) => state.orm);
const latestCategoriesStateSelector = createSelector(ormSelector, (orm) =>
  latestCategoriesORMSelector(orm),
);
const latestRoomsStateSelector = createSelector(ormSelector, (orm) => latestRoomsORMSelector(orm));
const categoryRoomsStateSelector = createSelector(
  ormSelector,
  (orm) => (category_id: string) => categoryRoomsORMSelector(orm, category_id),
);

// Progress Selector
const progressStateSelector = createSelector(store.getState, (state) => state.progress);
const myProgressStateSelector = createSelector(
  progressStateSelector,
  (progress) => (channel: Channel) => progress[channel],
);

// ORM and Progress Selector (Combined)
export const latestCategoriesSelector = createSelector(
  latestCategoriesStateSelector,
  myProgressStateSelector,
  (s1, s2) => (channel: Channel) => ({
    categories: s1,
    status: s2(channel),
  }),
);
export const latestRoomsSelector = createSelector(
  latestRoomsStateSelector,
  myProgressStateSelector,
  (s1, s2) => (channel: Channel) => ({
    rooms: s1,
    status: s2(channel),
  }),
);
export const categoryRoomsSelector = createSelector(
  categoryRoomsStateSelector,
  myProgressStateSelector,
  (s1, s2) => (category_id: string, channel: Channel) => ({
    rooms: s1(category_id),
    status: s2(channel),
  }),
);
