import { createReducer } from '@reduxjs/toolkit';

import { CategoriesState, getCaregories, getCaregoriesSuccess } from './actions';
import { StatusState } from '../common';

const initialCategoriesState : CategoriesState = {
  categories: [],
  status: StatusState.IDLE
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
