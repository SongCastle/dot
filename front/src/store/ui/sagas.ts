import { put } from 'redux-saga/effects';

import { updateUIToLoad, updateUIToSuccess, updateUIToFail } from './actions';
import type { Channel } from './actions';

// TODO: Generator の型付け
export function* progressHandler(channel: Channel, process: Generator) {
  yield put(updateUIToLoad(channel));
  try {
    yield process;
    yield put(updateUIToSuccess(channel));
  } catch (error) {
    // TODO: axios のハンドリング
    // NotFound, BadRequest, Network error など ...
    yield put(updateUIToFail(channel));
  }
}
