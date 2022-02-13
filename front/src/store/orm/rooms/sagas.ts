import { put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import { upsertRoom, upsertRooms } from './actions';
import type {
  GetRoomType,
  GetLatestRoomsType,
  GetCategoryRoomsType,
  SearchRoomsType,
} from './actions';

import { RoomActionLabel } from './constants';

import {
  requestRoomAPI,
  requestRoomsAPI,
  requestCategoryRoomsAPI,
  requestSearchRoomsAPI,
} from '../../api';
import type { CategoryState } from '../categories';

import { progressHandler } from '../../ui';

// TODO: selector の import について確認
import { categoryStateSelector, roomsStateChecker } from '../../selectors';
import type { RootState } from '../../reducers';

function* requestRoom(roomId: string) {
  const cached: boolean = yield select((state: RootState) => roomsStateChecker(state)([roomId]));

  if (!cached) yield requestRoomAPI(roomId, (room) => put(upsertRoom(room)));
}

function* requestRooms() {
  yield requestRoomsAPI((rooms) => put(upsertRooms(rooms)));
}

function* requestCategoryRooms(categoryId: string) {
  const cachedCategory: CategoryState | undefined = yield select((state: RootState) =>
    categoryStateSelector(state)(categoryId),
  );

  let cached = false;
  if (cachedCategory) {
    cached = yield select((state: RootState) => roomsStateChecker(state)(cachedCategory.rooms));
  }

  if (!cached) yield requestCategoryRoomsAPI(categoryId, (rooms) => put(upsertRooms(rooms)));
}

function* requestSearchRooms(query: string | string[]) {
  yield requestSearchRoomsAPI(query, (rooms) => put(upsertRooms(rooms)));
}

export function* watchRoomsRequest() {
  yield takeEvery(RoomActionLabel.GET_ROOM, ({ payload: { channel, roomId } }: GetRoomType) =>
    progressHandler(channel, requestRoom(roomId)),
  );

  yield takeLatest(
    RoomActionLabel.GET_LATEST_ROOMS,
    ({ payload: { channel } }: GetLatestRoomsType) => progressHandler(channel, requestRooms()),
  );

  yield takeEvery(
    RoomActionLabel.GET_CATEGORY_ROOMS,
    ({ payload: { channel, categoryId } }: GetCategoryRoomsType) =>
      progressHandler(channel, requestCategoryRooms(categoryId)),
  );

  yield takeEvery(
    RoomActionLabel.SEARCH_ROOMS,
    ({ payload: { channel, query } }: SearchRoomsType) =>
      progressHandler(channel, requestSearchRooms(query)),
  );
}
