import { createReducer } from '@reduxjs/toolkit';

import { updateProgressToIdle, updateProgressToLoad, updateProgressToSuccess, updateProgressToFail } from './actions';
import type { ProgressStates } from './actions';
import { StatusState } from './constants';

const initialProgressStates: ProgressStates = {};

export const reducer = createReducer<ProgressStates>(
  initialProgressStates, (builder) => {
    builder
      .addCase(updateProgressToIdle, (state, { payload }) => {
        state[payload.channel] = StatusState.IDLE
      })
      .addCase(updateProgressToLoad, (state, { payload }) => {
        state[payload.channel] = StatusState.LOAD
      })
      .addCase(updateProgressToSuccess, (state, { payload }) => {
        state[payload.channel] = StatusState.SUCCESS
      })
      .addCase(updateProgressToFail, (state, { payload }) => {
        state[payload.channel] = StatusState.FAIL
      })
  }
);
