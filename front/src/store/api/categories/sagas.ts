import { call, takeEvery } from 'redux-saga/effects';

import { CategoryAPIActionLabel } from './constants';
import type {
  CategoriesActionCallback,
  GetLatestCategoriesAPI,
  GetRoomCategoriesAPI,
} from './actions';

import { getCategoriesApi, getRoomCategoriesApi } from './fetch';
import type { CategoryResponse } from './fetch';

import { progressHandler } from '../../ui';

export function* requestCategoriesAPI<T>(callback: CategoriesActionCallback<T>) {
  const categories: CategoryResponse[] = yield call(getCategoriesApi);
  yield callback(categories);
}

export function* requestRoomCategoriesAPI<T>(
  roomId: string,
  callback: CategoriesActionCallback<T>,
) {
  const categories: CategoryResponse[] = yield call(() => getRoomCategoriesApi(roomId));
  yield callback(categories);
}

export function* watchCategoriesAPI() {
  yield takeEvery(
    CategoryAPIActionLabel.GET_LATEST_CATEGORIES_API,
    ({ payload: { channel, callback } }: GetLatestCategoriesAPI) =>
      progressHandler(
        channel,
        requestCategoriesAPI((categories) => callback(categories)),
      ),
  );

  yield takeEvery(
    CategoryAPIActionLabel.GET_ROOM_CATEGORIES_API,
    ({ payload: { channel, roomId, callback } }: GetRoomCategoriesAPI) =>
      progressHandler(
        channel,
        requestRoomCategoriesAPI(roomId, (categories) => callback(categories)),
      ),
  );
}
