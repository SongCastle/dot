
import type { CreateProps, UpsertProps } from 'redux-orm';
import { createAction } from '@reduxjs/toolkit';

import { RoomActionLabel } from './constants';
import { Room } from './orm';
import type { channel } from '../progresses';

// Prop
type CreateRoomProps = CreateProps<Room>;
export type UpsertRoomProps = UpsertProps<Room>;

// Action
export const createRoom = createAction(RoomActionLabel.CREATE_ROOM, (room: CreateRoomProps) => {
  return {
    payload: room
  }
});
export const upsertRoom = createAction(RoomActionLabel.UPSERT_ROOM, (room: UpsertRoomProps) => {
  return {
    payload: room
  }
});
export const getCategoryRooms = createAction(RoomActionLabel.GET_CATEGORY_ROOMS, (category_id: number, channel: channel) => {
  return {
    payload: {
      category_id: category_id,
      channel: channel
    }
  }
});
export const getLatestRooms = createAction(RoomActionLabel.GET_LATEST_ROOMS, (channel: channel) => {
  return {
    payload: {
      channel: channel
    }
  }
});
// TODO: upsertRooms と upsertLatestRooms をまとめたい
export const upsertRooms = createAction(RoomActionLabel.UPSERT_ROOMS, (rooms: UpsertRoomProps[]) => {
  return {
    payload: rooms
  }
});
export const upsertLatestRooms = createAction(RoomActionLabel.UPSERT_LATEST_ROOMS, (rooms: UpsertRoomProps[]) => {
  return {
    payload: rooms
  }
});

type CreateRoomType = ReturnType<typeof createRoom>;
type UpsertRoomType = ReturnType<typeof upsertRoom>;
type UpsertRoomsType = ReturnType<typeof upsertRooms>;
export type GetCategoryRoomsType = ReturnType<typeof getCategoryRooms>;
export type GetLatestRoomsType = ReturnType<typeof getLatestRooms>;
type UpsertLatestRoomsType = ReturnType<typeof upsertLatestRooms>;

export type RoomActionType =
  CreateRoomType | UpsertRoomType | UpsertRoomsType | GetCategoryRoomsType | GetLatestRoomsType | UpsertLatestRoomsType;
