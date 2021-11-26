import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

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

import { progressHandler } from '../progresses';

// TODO: store の状況を考慮したい
function* requestRoom(roomId: string): Generator<any, void, UpsertRoomProps> {
  const room = yield call(() => getRoomApi(roomId));
  yield put(upsertRoom(room));
}

function* requestRooms(): Generator<any, void, UpsertRoomProps[]> {
  const rooms = yield call(getRoomsApi);
  yield put(upsertLatestRooms(rooms));
}

function* requestCategoryRooms(categoryId: string): Generator<any, void, UpsertRoomProps[]> {
  const rooms = yield call(() => getCategoryRoomsApi(categoryId));
  yield put(upsertRooms(rooms));
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
