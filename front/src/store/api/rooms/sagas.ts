import { call, takeEvery } from 'redux-saga/effects';

import { RoomAPIActionLabel } from './constants';
import type {
  RoomActionCallback,
  RoomsActionCallback,
  GetRoomAPI,
  GetLatestRoomsAPI,
  GetCategoryRoomsAPI,
  SearchRoomsAPI,
} from './actions';

import { getRoomApi, getRoomsApi, getCategoryRoomsApi, searchRoomsApi } from './fetch';
import type { RoomResponse } from './fetch';

import { progressHandler } from '../../ui';

export function* requestRoomAPI<T>(roomId: string, callBack: RoomActionCallback<T>) {
  const room: RoomResponse = yield call(() => getRoomApi(roomId));
  yield callBack(room);
}

export function* requestRoomsAPI<T>(callBack: RoomsActionCallback<T>) {
  const rooms: RoomResponse[] = yield call(getRoomsApi);
  yield callBack(rooms);
}

export function* requestCategoryRoomsAPI<T>(categoryId: string, callBack: RoomsActionCallback<T>) {
  const rooms: RoomResponse[] = yield call(() => getCategoryRoomsApi(categoryId));
  yield callBack(rooms);
}

export function* requestSearchRoomsAPI<T>(
  keyword: string | string[],
  callBack: RoomsActionCallback<T>,
) {
  const rooms: RoomResponse[] = yield call(() => searchRoomsApi(keyword));
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

  yield takeEvery(
    RoomAPIActionLabel.GET_CATEGORY_ROOMS_API,
    ({ payload: { channel, categoryId, callback } }: GetCategoryRoomsAPI) =>
      progressHandler(
        channel,
        requestCategoryRoomsAPI(categoryId, (rooms) => callback(rooms)),
      ),
  );

  yield takeEvery(
    RoomAPIActionLabel.SEARCH_ROOMS_API,
    ({ payload: { channel, keyword, callback } }: SearchRoomsAPI) =>
      progressHandler(
        channel,
        requestSearchRoomsAPI(keyword, (rooms) => callback(rooms)),
      ),
  );
}
