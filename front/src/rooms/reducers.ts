import { createReducer } from '@reduxjs/toolkit';

import { RoomsState, getRooms, getRoomsSuccess } from './actions';
import { StatusState } from '../common';

const initialRoomState : RoomsState = {
  rooms: [],
  status: StatusState.IDLE
};

export const roomsReducer = createReducer<RoomsState>(
  initialRoomState, (builder) => {
    builder
      .addCase(getRooms, (state) => {
        state.status = StatusState.LOAD
      })
      .addCase(getRoomsSuccess, (state, action) => {
        state.rooms = action.payload
        state.status = StatusState.SUCCESS
      })
  }
);
