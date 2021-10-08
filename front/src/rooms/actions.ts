import { createAction } from '@reduxjs/toolkit';

import { RoomActionType } from './constants';
import type { StatusState } from '../common';

export interface RoomState {
  id : number;
  name : string;
  subscription : string;
  creator_id : number; 
  status? : StatusState;
};

export interface RoomsState {
  rooms : RoomState[];
  status? : StatusState;
};

export const getRooms = createAction(RoomActionType.GET_ROOMS);

export const getRoomsSuccess = createAction(RoomActionType.GET_ROOMS_SUCCESS, (rooms : RoomState[]) => {
  return {
    payload: rooms
  }
});
