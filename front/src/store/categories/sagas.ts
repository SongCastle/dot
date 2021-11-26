import { call, put, takeLatest } from 'redux-saga/effects';

import { getLatestCategories, upsertLatestCategories } from './actions';
import type { GetLatestCategoriesType, UpsertCategoryProps } from './actions';
import { getMainCategoriesApi } from './api';

import { progressHandler } from '../progresses';

function* requestCategories(): Generator<any, void, UpsertCategoryProps[]> {
  const categories = yield call(getMainCategoriesApi);
  yield put(upsertLatestCategories(categories));
}

export function* watchCategoriesRequest() {
  yield takeLatest(getLatestCategories, ({ payload: { channel } }: GetLatestCategoriesType) =>
    progressHandler(channel, requestCategories()),
  );
}
