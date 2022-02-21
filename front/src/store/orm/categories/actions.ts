import type { CreateProps, UpsertProps } from 'redux-orm';
import { createAction } from '@reduxjs/toolkit';

import { CategoryActionLabel } from './constants';
import { Category } from './orm';

import type { Channel } from '../../ui';

// Prop
type CreateCategoryProps = CreateProps<Category>;
export type UpsertCategoryProps = UpsertProps<Category>;

// Action
export const createCategory = createAction(
  CategoryActionLabel.CREATE_CATEGORY,
  (category: CreateCategoryProps) => ({
    payload: category,
  }),
);
export const upsertCategories = createAction(
  CategoryActionLabel.UPSERT_CATEGORIES,
  (categories: UpsertCategoryProps[]) => ({
    payload: categories,
  }),
);
export const getLatestCategories = createAction(
  CategoryActionLabel.GET_LATEST_CATEGORIES,
  (channel: Channel) => ({
    payload: {
      channel,
    },
  }),
);
export const getRoomCategories = createAction(
  CategoryActionLabel.GET_ROOM_CATEGORIES,
  (channel: Channel, roomId: string) => ({
    payload: {
      channel,
      roomId,
    },
  }),
);

type CreateCategoryType = ReturnType<typeof createCategory>;
type UpsertCategoriesType = ReturnType<typeof upsertCategories>;
export type GetLatestCategoriesType = ReturnType<typeof getLatestCategories>;
export type GetRoomCategoriesType = ReturnType<typeof getRoomCategories>;

export type CategoryActionType =
  | CreateCategoryType
  | UpsertCategoriesType
  | GetLatestCategoriesType
  | GetRoomCategoriesType;
