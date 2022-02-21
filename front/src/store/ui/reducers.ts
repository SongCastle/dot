import { createReducer } from '@reduxjs/toolkit';

import { updateUIToIdle, updateUIToLoad, updateUIToSuccess, updateUIToFail } from './actions';
import type { UIState } from './actions';
import { ProgressStatus } from './constants';

const initialUIState: UIState = {};
export const reducer = createReducer<UIState>(initialUIState, (builder) => {
  builder
    .addCase(updateUIToIdle, (state, { payload: { channel } }) => {
      state[channel] = ProgressStatus.IDLE;
    })
    .addCase(updateUIToLoad, (state, { payload: { channel } }) => {
      state[channel] = ProgressStatus.LOAD;
    })
    .addCase(updateUIToSuccess, (state, { payload: { channel } }) => {
      state[channel] = ProgressStatus.SUCCESS;
    })
    .addCase(updateUIToFail, (state, { payload: { channel } }) => {
      state[channel] = ProgressStatus.FAIL;
    });
});
