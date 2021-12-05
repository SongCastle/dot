import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import { watchCategoriesRequest } from './categories';
import { watchRoomsRequest } from './rooms';

// Root Saga
function* rootSaga() {
  yield all([fork(watchCategoriesRequest), fork(watchRoomsRequest)]);
}
export const sagaMiddleware = createSagaMiddleware();
export const runSaga = () => {
  sagaMiddleware.run(rootSaga);
};
