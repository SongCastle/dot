import { createAction } from '@reduxjs/toolkit';

import type { CategoryResponse } from './fetch';
import { CategoryAPIActionLabel } from './constants';

import type { Channel } from '../../ui';

type OnlyIDRequiredCategory = Partial<Omit<CategoryResponse, 'id'>> & Pick<CategoryResponse, 'id'>;
export type CategoriesActionCallback<T = any> = (categories: OnlyIDRequiredCategory[]) => T;

export const getLatestCategoriesAPI = createAction(
  CategoryAPIActionLabel.GET_LATEST_CATEGORIES_API,
  (channel: Channel, callback: CategoriesActionCallback) => ({
    payload: {
      channel,
      callback,
    },
  }),
);
export const getRoomCategoriesAPI = createAction(
  CategoryAPIActionLabel.GET_ROOM_CATEGORIES_API,
  (channel: Channel, roomId: string, callback: CategoriesActionCallback) => ({
    payload: {
      channel,
      roomId,
      callback,
    },
  }),
);

export type GetLatestCategoriesAPI = ReturnType<typeof getLatestCategoriesAPI>;
export type GetRoomCategoriesAPI = ReturnType<typeof getRoomCategoriesAPI>;
