import { call, put, takeLatest } from 'redux-saga/effects';

import { getLatestCategories,upsertLatestCategories } from './actions';
import type { GetLatestCategoriesType, UpsertCategoryProps } from './actions';
import { getMainCategoriesApi } from './api';

import { updateProgressToLoad, updateProgressToSuccess } from '../progresses';

function* requestCategories({ payload } : GetLatestCategoriesType): Generator<any, void, UpsertCategoryProps[]> {
  yield put(updateProgressToLoad(payload.channel));
  const categories = yield call(getMainCategoriesApi);
  yield put(upsertLatestCategories(categories));
  yield put(updateProgressToSuccess(payload.channel));
};

export function* watchCategoriesRequest() {
  yield takeLatest(getLatestCategories, requestCategories);
};
