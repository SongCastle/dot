import { createAction } from '@reduxjs/toolkit';

import { ProgressActionLabel } from './constants';
import type { StatusStateType } from './constants';

export type Channel = string;
export type ProgressStates = { [key: Channel]: StatusStateType };

export const channelPayloader = (channel: Channel) => ({
  payload: {
    channel,
  },
});

export const updateProgressToIdle = createAction(ProgressActionLabel.IDLE, channelPayloader);
export const updateProgressToLoad = createAction(ProgressActionLabel.LOAD, channelPayloader);
export const updateProgressToSuccess = createAction(ProgressActionLabel.SUCCESS, channelPayloader);
export const updateProgressToFail = createAction(ProgressActionLabel.FAIL, channelPayloader);
