import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { getLatestRooms, upsertLatestRooms } from './actions';
import type { GetLatestRoomsType, UpsertRoomProps } from './actions';

import { CommonConstants } from '../common';
import { updateProgressToLoad, updateProgressToSuccess } from '../progresses';

// API
async function getRoomsApi(): Promise<UpsertRoomProps[]>{
  const base = axios.create({
    baseURL: CommonConstants.BACK_HOST
  });
  const response = await base.get<UpsertRoomProps[]>('/v1/rooms')
  return response.data;
};

function* requestRooms({ payload }: GetLatestRoomsType): Generator<any, void, UpsertRoomProps[]> {
  yield put(updateProgressToLoad(payload.channel));
  const rooms = yield call(getRoomsApi);
  yield put(upsertLatestRooms(rooms));
  yield put(updateProgressToSuccess(payload.channel));
};

export function* watchRoomsRequest() {
  yield takeLatest(getLatestRooms, requestRooms)
};
