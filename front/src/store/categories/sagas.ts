import { call, put, takeLatest } from 'redux-saga/effects';

import { getLatestCategories,upsertLatestCategories } from './actions';
import type { GetLatestCategoriesType, UpsertCategoryProps } from './actions';
import { getMainCategoriesApi } from './api';

import type { JSONAPIDocument } from '../common';
import { updateProgressToLoad, updateProgressToSuccess } from '../progresses';

function* requestCategories({ payload } : GetLatestCategoriesType): Generator<any, void, JSONAPIDocument> {
  yield put(updateProgressToLoad(payload.channel));
  const categories = yield call(getMainCategoriesApi);
  yield put(upsertLatestCategories(categories as UpsertCategoryProps[]));
  yield put(updateProgressToSuccess(payload.channel));
};

export function* watchCategoriesRequest() {
  yield takeLatest(getLatestCategories, requestCategories);
};
