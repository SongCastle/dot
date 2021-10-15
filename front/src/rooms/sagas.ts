import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { getRooms, getRoomsSuccess } from './actions';
import type { RoomState } from './actions';
import { CommonConstants } from '../common';

// API
async function getRoomsApi() : Promise<RoomState[]>{
  const base = axios.create({
    baseURL: CommonConstants.BACK_HOST
  });
  const response = await base.get<RoomState[]>('/v1/rooms')
  return response.data;
};

// TODO: fix any
function* requestRooms() : Generator<any, void, any> {
  const rooms = yield call(getRoomsApi);
  yield put(getRoomsSuccess(rooms));
};

export function* watchRoomsRequest() {
  yield takeLatest(getRooms, requestRooms)
};
