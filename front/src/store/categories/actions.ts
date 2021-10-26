import type { CreateProps, UpsertProps } from 'redux-orm';
import { createAction } from '@reduxjs/toolkit';

import { CategoryActionLabel } from './constants';
import { Category } from './orm';
import type { Channel } from '../progresses';

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
export const upsertCategory = createAction(
  CategoryActionLabel.UPSERT_CATEGORY,
  (category: UpsertCategoryProps) => ({
    payload: category,
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
export const upsertLatestCategories = createAction(
  CategoryActionLabel.UPSERT_LATEST_CATEGORIES,
  (categories: UpsertCategoryProps[]) => ({
    payload: categories,
  }),
);

type CreateCategoryType = ReturnType<typeof createCategory>;
type UpsertCategoryType = ReturnType<typeof upsertCategory>;
export type GetLatestCategoriesType = ReturnType<typeof getLatestCategories>;
type UpsertLatestCategoriesType = ReturnType<typeof upsertLatestCategories>;

export type GategoryActionType =
  | CreateCategoryType
  | UpsertCategoryType
  | GetLatestCategoriesType
  | UpsertLatestCategoriesType;
