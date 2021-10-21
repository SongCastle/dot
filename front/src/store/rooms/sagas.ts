import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { getCategoryRooms, getLatestRooms, upsertRooms, upsertLatestRooms } from './actions';
import type { GetLatestRoomsType, UpsertRoomProps, GetCategoryRoomsType } from './actions';
import { getRoomsApi, getCategoryRoomsApi } from './api';

import type { JSONAPIDocument } from '../common';
import { updateProgressToLoad, updateProgressToSuccess } from '../progresses';

function* requestRooms({ payload }: GetLatestRoomsType): Generator<any, void, JSONAPIDocument> {
  yield put(updateProgressToLoad(payload.channel));
  const rooms = yield call(getRoomsApi);
  yield put(upsertLatestRooms(rooms as UpsertRoomProps[]));
  yield put(updateProgressToSuccess(payload.channel));
};

function* requestCategoryRooms({ payload } : GetCategoryRoomsType): Generator<any, void, JSONAPIDocument> {
  yield put(updateProgressToLoad(payload.channel));
  // TODO: store の状況を考慮したい
  const rooms = yield call(() => getCategoryRoomsApi(payload.category_id));
  yield put(upsertRooms(rooms as UpsertRoomProps[]));
  yield put(updateProgressToSuccess(payload.channel));
};

export function* watchRoomsRequest() {
  yield takeLatest(getLatestRooms, requestRooms);
  yield takeEvery(getCategoryRooms, requestCategoryRooms);
};
