import { createAction } from '@reduxjs/toolkit';

import { CategoryActionType } from './constants';
import type { StatusState } from './constants';

export interface CategoryState {
  id: number;
  name : string;
  status? : StatusState;
};

export interface CategoriesState {
  categories : CategoryState[];
  status? : StatusState;
};

export const getCaregories = createAction(CategoryActionType.GET_CATEGORIES);

export const getCaregoriesSuccess = createAction(CategoryActionType.GET_CATEGORIES_SUCCESS, (categories : CategoryState[]) => {
  return {
    payload: categories
  }
});
