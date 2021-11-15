import { put } from 'redux-saga/effects';

import { updateProgressToLoad, updateProgressToSuccess, updateProgressToFail } from './actions';
import type { Channel } from './actions';

export function* progressHandler<T>(
  channel: Channel,
  process: Generator<any, void, T>,
): Generator<any, void, void> {
  yield put(updateProgressToLoad(channel));
  try {
    yield process;
    yield put(updateProgressToSuccess(channel));
  } catch (error) {
    // TODO: axios のハンドリング
    // NotFound, BadRequest, Network error など ...
    yield put(updateProgressToFail(channel));
  }
}
