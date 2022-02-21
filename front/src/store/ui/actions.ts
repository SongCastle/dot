import { createAction } from '@reduxjs/toolkit';

import { UIActionLabel } from './constants';
import type { ProgressType } from './constants';

export type Channel = string;
export type UIState = { [key: Channel]: ProgressType };

const channelPayloader = (channel: Channel) => ({
  payload: {
    channel,
  },
});

export const updateUIToIdle = createAction(UIActionLabel.IDLE, channelPayloader);
export const updateUIToLoad = createAction(UIActionLabel.LOAD, channelPayloader);
export const updateUIToSuccess = createAction(UIActionLabel.SUCCESS, channelPayloader);
export const updateUIToFail = createAction(UIActionLabel.FAIL, channelPayloader);
