import type { CreateProps, UpsertProps } from 'redux-orm';
import { createAction } from '@reduxjs/toolkit';

import { RoomActionLabel } from './constants';
import { Room } from './orm';
import type { Channel } from '../../progress';

// Prop
type CreateRoomProps = CreateProps<Room>;
export type UpsertRoomProps = UpsertProps<Room>;

// Action
export const createRoom = createAction(RoomActionLabel.CREATE_ROOM, (room: CreateRoomProps) => ({
  payload: room,
}));
export const getRoom = createAction(
  RoomActionLabel.GET_ROOM,
  (roomId: string, channel: Channel) => ({
    payload: {
      roomId,
      channel,
    },
  }),
);
export const upsertRoom = createAction(RoomActionLabel.UPSERT_ROOM, (room: UpsertRoomProps) => ({
  payload: room,
}));
export const getCategoryRooms = createAction(
  RoomActionLabel.GET_CATEGORY_ROOMS,
  (categoryId: string, channel: Channel) => ({
    payload: {
      categoryId,
      channel,
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
// TODO: upsertRooms と upsertLatestRooms をまとめたい
export const upsertRooms = createAction(
  RoomActionLabel.UPSERT_ROOMS,
  (rooms: UpsertRoomProps[]) => ({
    payload: rooms,
  }),
);
export const upsertLatestRooms = createAction(
  RoomActionLabel.UPSERT_LATEST_ROOMS,
  (rooms: UpsertRoomProps[]) => ({
    payload: rooms,
  }),
);

type CreateRoomType = ReturnType<typeof createRoom>;
export type GetRoomType = ReturnType<typeof getRoom>;
type UpsertRoomType = ReturnType<typeof upsertRoom>;
type UpsertRoomsType = ReturnType<typeof upsertRooms>;
export type GetCategoryRoomsType = ReturnType<typeof getCategoryRooms>;
export type GetLatestRoomsType = ReturnType<typeof getLatestRooms>;
type UpsertLatestRoomsType = ReturnType<typeof upsertLatestRooms>;

export type RoomActionType =
  | CreateRoomType
  | GetRoomType
  | UpsertRoomType
  | UpsertRoomsType
  | GetCategoryRoomsType
  | GetLatestRoomsType
  | UpsertLatestRoomsType;
