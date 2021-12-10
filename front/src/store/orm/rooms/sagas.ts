import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import {
  getRoom,
  getCategoryRooms,
  getLatestRooms,
  upsertRoom,
  upsertRooms,
  upsertLatestRooms,
} from './actions';
import type {
  GetRoomType,
  GetLatestRoomsType,
  UpsertRoomProps,
  GetCategoryRoomsType,
} from './actions';
import { getRoomApi, getRoomsApi, getCategoryRoomsApi } from './api';

import type { CategoryState } from '../categories';

import { progressHandler } from '../../progress';

// TODO: selector の import について確認
import { categoryStateSelector, roomsStateChecker } from '../../selectors';
import type { RootState } from '../../selectors';

function* requestRoom(roomId: string) {
  const cached: boolean = yield select((state: RootState) => roomsStateChecker(state)([roomId]));

  if (!cached) {
    const room: UpsertRoomProps = yield call(() => getRoomApi(roomId));
    yield put(upsertRoom(room));
  }
}

function* requestRooms() {
  const rooms: UpsertRoomProps[] = yield call(getRoomsApi);
  yield put(upsertLatestRooms(rooms));
}

function* requestCategoryRooms(categoryId: string) {
  const cachedCategory: CategoryState | undefined = yield select((state: RootState) =>
    categoryStateSelector(state)(categoryId),
  );

  let cached = false;
  if (cachedCategory) {
    cached = yield select((state: RootState) => roomsStateChecker(state)(cachedCategory.rooms));
  }

  if (!cached) {
    const rooms: UpsertRoomProps[] = yield call(() => getCategoryRoomsApi(categoryId));
    yield put(upsertRooms(rooms));
  }
}

export function* watchRoomsRequest() {
  yield takeEvery(getRoom, ({ payload: { channel, roomId } }: GetRoomType) =>
    progressHandler(channel, requestRoom(roomId)),
  );

  yield takeLatest(getLatestRooms, ({ payload: { channel } }: GetLatestRoomsType) =>
    progressHandler(channel, requestRooms()),
  );

  yield takeEvery(getCategoryRooms, ({ payload: { channel, categoryId } }: GetCategoryRoomsType) =>
    progressHandler(channel, requestCategoryRooms(categoryId)),
  );
}
