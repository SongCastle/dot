import type { CreateProps, UpsertProps } from 'redux-orm';
import { createAction } from '@reduxjs/toolkit';

import { RoomActionLabel } from './constants';
import { Room } from './orm';

import { Channel } from '../../ui';

// Prop
type CreateRoomProps = CreateProps<Room>;
export type UpsertRoomProps = UpsertProps<Room>;

// Action
export const createRoom = createAction(RoomActionLabel.CREATE_ROOM, (room: CreateRoomProps) => ({
  payload: room,
}));

export const upsertRoom = createAction(RoomActionLabel.UPSERT_ROOM, (room: UpsertRoomProps) => ({
  payload: room,
}));

export const upsertRooms = createAction(
  RoomActionLabel.UPSERT_ROOMS,
  (rooms: UpsertRoomProps[]) => ({
    payload: rooms,
  }),
);

export const getRoom = createAction(
  RoomActionLabel.GET_ROOM,
  (channel: Channel, roomId: string) => ({
    payload: {
      channel,
      roomId,
    },
  }),
);

export const getCategoryRooms = createAction(
  RoomActionLabel.GET_CATEGORY_ROOMS,
  (channel: Channel, categoryId: string) => ({
    payload: {
      channel,
      categoryId,
    },
  }),
);

export const getLatestRooms = createAction(
  RoomActionLabel.GET_LATEST_ROOMS,
  (channel: Channel) => ({
    payload: {
      channel,
    },
  }),
);

export const searchRooms = createAction(
  RoomActionLabel.SEARCH_ROOMS,
  (channel: Channel, query: string | string[]) => ({
    payload: {
      channel,
      query,
    },
  }),
);

type CreateRoomType = ReturnType<typeof createRoom>;
type UpsertRoomType = ReturnType<typeof upsertRoom>;
type UpsertRoomsType = ReturnType<typeof upsertRooms>;
export type GetRoomType = ReturnType<typeof getRoom>;
export type GetCategoryRoomsType = ReturnType<typeof getCategoryRooms>;
export type GetLatestRoomsType = ReturnType<typeof getLatestRooms>;
export type SearchRoomsType = ReturnType<typeof searchRooms>;

export type RoomActionType =
  | CreateRoomType
  | GetRoomType
  | UpsertRoomType
  | UpsertRoomsType
  | GetCategoryRoomsType
  | GetLatestRoomsType
  | SearchRoomsType;
