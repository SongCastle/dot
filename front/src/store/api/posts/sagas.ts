import { call, takeEvery } from 'redux-saga/effects';

import { PostActionCallback, PostsActionCallback } from './actions';
import type { GetRoomPostsAPI } from './actions';
import { PostAPIActionLabel } from './constants';
import { getRoomPostsAPI, createPostAPI } from './fetch';
import type { PostResponse } from './fetch';

import { progressHandler } from '../../ui';

export function* requestRoomPostsAPI<T>(roomId: string, callBack: PostsActionCallback<T>) {
  const posts: PostResponse[] = yield call(() => getRoomPostsAPI(roomId));
  yield callBack(posts);
}

export function* requestCreatePostAPI<T>(
  roomId: string,
  userId: string | null,
  message: string,
  callback: PostActionCallback<T>,
) {
  const post: PostResponse = yield call(() => createPostAPI(roomId, userId, message));
  yield callback(post);
}

export function* watchPostsAPI() {
  yield takeEvery(
    PostAPIActionLabel.GET_ROOM_POSTS_API,
    ({ payload: { channel, roomId, callback } }: GetRoomPostsAPI) =>
      progressHandler(
        channel,
        requestRoomPostsAPI(roomId, (room) => callback(room)),
      ),
  );
}
