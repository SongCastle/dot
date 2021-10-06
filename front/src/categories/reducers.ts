import { createReducer } from '@reduxjs/toolkit';

import { CategoriesState, getCaregories, getCaregoriesSuccess } from './actions';
import { StatusState } from './constants';

const initialCategoriesState : CategoriesState = {
  categories: []
};

export const categoriesReducer = createReducer<CategoriesState>(
  initialCategoriesState, (builder) => {
    builder
      .addCase(getCaregories, (state) => {
        state.status = StatusState.LOAD
      })
      .addCase(getCaregoriesSuccess, (state, action) => {
        state.categories = action.payload
        state.status = StatusState.SUCCESS
      })
  }
);
