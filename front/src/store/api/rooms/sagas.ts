import { call, takeEvery, takeLatest } from 'redux-saga/effects';

import { RoomAPIActionLabel } from './constants';
import type {
  RoomActionCallback,
  RoomsActionCallback,
  GetRoomAPI,
  GetLatestRoomsAPI,
  GetCategoryRoomsAPI,
  SearchRoomsAPI,
} from './actions';

import { getRoomAPI, getRoomsAPI, getCategoryRoomsAPI, searchRoomsAPI } from './fetch';
import type { RoomResponse } from './fetch';

import { progressHandler } from '../../ui';

export function* requestRoomAPI<T>(roomId: string, callBack: RoomActionCallback<T>) {
  const room: RoomResponse = yield call(() => getRoomAPI(roomId));
  yield callBack(room);
}

export function* requestRoomsAPI<T>(callBack: RoomsActionCallback<T>) {
  const rooms: RoomResponse[] = yield call(getRoomsAPI);
  yield callBack(rooms);
}

export function* requestCategoryRoomsAPI<T>(categoryId: string, callBack: RoomsActionCallback<T>) {
  const rooms: RoomResponse[] = yield call(() => getCategoryRoomsAPI(categoryId));
  yield callBack(rooms);
}

export function* requestSearchRoomsAPI<T>(
  query: string | string[],
  callBack: RoomsActionCallback<T>,
) {
  const rooms: RoomResponse[] = yield call(() => searchRoomsAPI(query));
  yield callBack(rooms);
}

export function* watchRoomsAPI() {
  yield takeEvery(
    RoomAPIActionLabel.GET_ROOM_API,
    ({ payload: { channel, roomId, callback } }: GetRoomAPI) =>
      progressHandler(
        channel,
        requestRoomAPI(roomId, (room) => callback(room)),
      ),
  );

  yield takeEvery(
    RoomAPIActionLabel.GET_LATEST_ROOMS_API,
    ({ payload: { channel, callback } }: GetLatestRoomsAPI) =>
      progressHandler(
        channel,
        requestRoomsAPI((rooms) => callback(rooms)),
      ),
  );

  // TODO: every or latest
  yield takeLatest(
    RoomAPIActionLabel.GET_CATEGORY_ROOMS_API,
    ({ payload: { channel, categoryId, callback } }: GetCategoryRoomsAPI) =>
      progressHandler(
        channel,
        requestCategoryRoomsAPI(categoryId, (rooms) => callback(rooms)),
      ),
  );

  yield takeLatest(
    RoomAPIActionLabel.SEARCH_ROOMS_API,
    ({ payload: { channel, query, callback } }: SearchRoomsAPI) =>
      progressHandler(
        channel,
        requestSearchRoomsAPI(query, (rooms) => callback(rooms)),
      ),
  );
}
