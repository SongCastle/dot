import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { getCaregories, getCaregoriesSuccess } from './actions';
import type { CategoryState } from './actions';
import { CommonConstants } from '../common';

// API
async function getMainCategoriesApi() : Promise<CategoryState[]>{
  const base = axios.create({
    baseURL: CommonConstants.BACK_HOST
  });
  const response = await base.get<CategoryState[]>('/v1/categories', {
    params: {
      type: 'main'
    }
  })
  return response.data;
};

// TODO: fix any
function* requestCategories() : Generator<any, void, any> {
  const categories = yield call(getMainCategoriesApi);
  yield put(getCaregoriesSuccess(categories));
};

export function* watchCategoriesRequest() {
  yield takeLatest(getCaregories, requestCategories)
};
