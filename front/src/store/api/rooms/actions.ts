import { createAction } from '@reduxjs/toolkit';

import { RoomAPIActionLabel } from './constants';
import type { RoomResponse } from './fetch';

import type { Channel } from '../../ui';

type OnlyIDRequiredRoom = Partial<Omit<RoomResponse, 'id'>> & Pick<RoomResponse, 'id'>;
export type RoomActionCallback<T = any> = (room: OnlyIDRequiredRoom) => T;
export type RoomsActionCallback<T = any> = (rooms: OnlyIDRequiredRoom[]) => T;

export const getRoomAPI = createAction(
  RoomAPIActionLabel.GET_ROOM_API,
  (channel: Channel, roomId: string, callback: RoomActionCallback) => ({
    payload: {
      channel,
      roomId,
      callback,
    },
  }),
);

export const getLatestRoomsAPI = createAction(
  RoomAPIActionLabel.GET_LATEST_ROOMS_API,
  (channel: Channel, callback: RoomsActionCallback) => ({
    payload: {
      channel,
      callback,
    },
  }),
);

export const getCategoryRoomsAPI = createAction(
  RoomAPIActionLabel.GET_CATEGORY_ROOMS_API,
  (channel: Channel, categoryId: string, callback: RoomsActionCallback) => ({
    payload: {
      channel,
      categoryId,
      callback,
    },
  }),
);

export const searchRoomsAPI = createAction(
  RoomAPIActionLabel.SEARCH_ROOMS_API,
  (channel: Channel, keyword: string | string[], callback: RoomsActionCallback) => ({
    payload: {
      channel,
      keyword,
      callback,
    },
  }),
);

export type GetRoomAPI = ReturnType<typeof getRoomAPI>;
export type GetLatestRoomsAPI = ReturnType<typeof getLatestRoomsAPI>;
export type GetCategoryRoomsAPI = ReturnType<typeof getCategoryRoomsAPI>;
export type SearchRoomsAPI = ReturnType<typeof searchRoomsAPI>;
