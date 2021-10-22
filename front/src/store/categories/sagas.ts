import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { getLatestCategories, getCategoryRooms, upsertLatestCategories } from './actions';
import type { GetCategoryRoomsType, GetLatestCategoriesType, UpsertCategoryProps } from './actions';

import { CommonConstants } from '../common';
import { updateProgressToLoad, updateProgressToSuccess } from '../progresses';
import { upsertRooms } from '../rooms';
import type { UpsertRoomProps } from '../rooms';

// API
async function getMainCategoriesApi() : Promise<UpsertCategoryProps[]>{
  const base = axios.create({
    baseURL: CommonConstants.BACK_HOST
  });
  const response = await base.get<UpsertCategoryProps[]>('/v1/categories', {
    params: {
      type: 'main'
    }
  })
  return response.data;
};

async function getCategoryRoomsApi(category_id: number) : Promise<UpsertRoomProps[]>{
  const base = axios.create({
    baseURL: CommonConstants.BACK_HOST
  });
  const response = await base.get<UpsertRoomProps[]>(`/v1/categories/${category_id}/rooms`)
  return response.data;
};

function* requestCategories({ payload } : GetLatestCategoriesType): Generator<any, void, UpsertCategoryProps[]> {
  yield put(updateProgressToLoad(payload.channel));
  const categories = yield call(getMainCategoriesApi);
  yield put(upsertLatestCategories(categories));
  yield put(updateProgressToSuccess(payload.channel));
};

function* requestCategoryRooms({ payload } : GetCategoryRoomsType): Generator<any, void, UpsertRoomProps[]> {
  yield put(updateProgressToLoad(payload.channel));
  // TODO: store の状況を考慮したい
  const rooms = yield call(() => getCategoryRoomsApi(payload.category_id));
  yield put(upsertRooms(rooms));
  yield put(updateProgressToSuccess(payload.channel));
};

export function* watchCategoriesRequest() {
  yield takeLatest(getLatestCategories, requestCategories)
  yield takeEvery(getCategoryRooms, requestCategoryRooms)
};
