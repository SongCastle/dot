import { put, select, takeLatest, takeEvery } from 'redux-saga/effects';

import { upsertCategories } from './actions';
import type { GetLatestCategoriesType, GetRoomCategoriesType } from './actions';
import { CategoryActionLabel } from './constants';

import { requestCategoriesAPI, requestRoomCategoriesAPI } from '../../api';

import type { RoomState } from '../rooms';
import { progressHandler } from '../../ui';

// TODO: selector の import について確認
import { roomStateSelector, categoriesStateChecker } from '../../selectors';
import type { RootState } from '../../reducers';

function* requestCategories() {
  yield requestCategoriesAPI((categories) => put(upsertCategories(categories)));
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

  if (!cached)
    yield requestRoomCategoriesAPI(roomId, (categories) => put(upsertCategories(categories)));
}

export function* watchCategoriesRequest() {
  yield takeLatest(
    CategoryActionLabel.GET_LATEST_CATEGORIES,
    ({ payload: { channel } }: GetLatestCategoriesType) =>
      progressHandler(channel, requestCategories()),
  );

  yield takeEvery(
    CategoryActionLabel.GET_ROOM_CATEGORIES,
    ({ payload: { channel, roomId } }: GetRoomCategoriesType) =>
      progressHandler(channel, requestRoomCategories(roomId)),
  );
}
