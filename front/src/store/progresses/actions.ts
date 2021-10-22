import { createAction } from '@reduxjs/toolkit';

import { ProgressActionLabel, StatusState } from './constants';

export type channel = string;
export type ProgressStates = { [key: channel]: StatusState };

export const channelPayloader = (channel: channel) => {
  return {
    payload: {
      channel: channel
    }
  }
};

export const updateProgressToIdle = createAction(ProgressActionLabel.IDLE, channelPayloader);
export const updateProgressToLoad = createAction(ProgressActionLabel.LOAD, channelPayloader);
export const updateProgressToSuccess = createAction(ProgressActionLabel.SUCCESS, channelPayloader);
export const updateProgressToFail = createAction(ProgressActionLabel.FAIL, channelPayloader);
