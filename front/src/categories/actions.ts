import { createAction } from '@reduxjs/toolkit';

import { CategoryActionType } from './constants';
import type { StatusState } from '../common';

export interface CategoryState {
  id : number;
  name : string;
  creator_id : number; 
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
