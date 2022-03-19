import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import { watchCategoriesAPI, watchPostsAPI, watchRoomsAPI } from './api';
import { watchCategoriesRequest, watchPostsRequest, watchRoomsRequest } from './orm';

// Root Saga
function* rootSaga() {
  yield all([
    fork(watchCategoriesAPI),
    fork(watchPostsAPI),
    fork(watchRoomsAPI),
    fork(watchCategoriesRequest),
    fork(watchPostsRequest),
    fork(watchRoomsRequest),
  ]);
}
export const sagaMiddleware = createSagaMiddleware();
export const runSaga = () => {
  sagaMiddleware.run(rootSaga);
};
