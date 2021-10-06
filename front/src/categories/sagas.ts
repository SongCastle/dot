import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { getCaregories, getCaregoriesSuccess } from './actions';
import type { CategoryState } from './actions';
import { CommonConstants } from '../common';

// API
async function getCategoriesApi() : Promise<CategoryState[]>{
  const base = axios.create({
    baseURL: CommonConstants.BACK_HOST
  });
  const response = await base.get<CategoryState[]>('/v1/categories')
  return response.data;
};

// TODO: fix any
function* requestCategories() : Generator<any, void, any> {
  const categories = yield call(getCategoriesApi);
  yield put(getCaregoriesSuccess(categories));
};

export function* watchCategoriesRequest() {
  yield takeEvery(getCaregories, requestCategories)
};
