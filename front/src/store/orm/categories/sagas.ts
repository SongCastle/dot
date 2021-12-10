import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';

import {
  getRoomCategories,
  getLatestCategories,
  upsertCategories,
  upsertLatestCategories,
} from './actions';
import type {
  GetRoomCategoriesType,
  GetLatestCategoriesType,
  UpsertCategoryProps,
} from './actions';
import { getCategoriesApi, getRoomCategoriesApi } from './api';

import type { RoomState } from '../rooms';

import { progressHandler } from '../../progress';

// TODO: selector の import について確認
import { roomStateSelector, categoriesStateChecker } from '../../selectors';
import type { RootState } from '../../selectors';

function* requestCategories() {
  const categories: UpsertCategoryProps[] = yield call(getCategoriesApi);
  yield put(upsertLatestCategories(categories));
}

function* requestRoomCategories(roomId: string) {
  const cachedRoom: RoomState = yield select((state: RootState) =>
    roomStateSelector(state)(roomId),
  );

  let cached = false;
  if (cachedRoom) {
    // NOTE: main_category は null の可能性がある (main_category を持たない場合)
    let categoryIds = cachedRoom.main_category ? [cachedRoom.main_category] : [];
    categoryIds = categoryIds.concat(cachedRoom.sub_categories || []);

    cached = yield select((state: RootState) => categoriesStateChecker(state)(categoryIds));
  }

  if (!cached) {
    const categories: UpsertCategoryProps[] = yield call(() => getRoomCategoriesApi(roomId));
    yield put(upsertCategories(categories));
  }
}

export function* watchCategoriesRequest() {
  yield takeLatest(getLatestCategories, ({ payload: { channel } }: GetLatestCategoriesType) =>
    progressHandler(channel, requestCategories()),
  );

  yield takeEvery(getRoomCategories, ({ payload: { roomId, channel } }: GetRoomCategoriesType) =>
    progressHandler(channel, requestRoomCategories(roomId)),
  );
}
