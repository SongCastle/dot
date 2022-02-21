import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import { watchCategoriesAPI, watchRoomsAPI } from './api';
import { watchCategoriesRequest, watchRoomsRequest } from './orm';

// Root Saga
function* rootSaga() {
  yield all([
    fork(watchCategoriesAPI),
    fork(watchRoomsAPI),
    fork(watchCategoriesRequest),
    fork(watchRoomsRequest),
  ]);
}
export const sagaMiddleware = createSagaMiddleware();
export const runSaga = () => {
  sagaMiddleware.run(rootSaga);
};
