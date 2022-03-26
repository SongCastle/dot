import { call, takeEvery } from 'redux-saga/effects';

import { PostActionCallback, PostsActionCallback } from './actions';
import type { GetRoomPostsAPI } from './actions';
import { PostAPIActionLabel } from './constants';
import { getRoomPostsAPI, createPostAPI } from './fetch';
import type { GetRoomPostsResponse, PostResponse } from './fetch';

import { progressHandler } from '../../ui';

export function* requestRoomPostsAPI<T>(
  roomId: string,
  limit: number,
  offset: string | undefined,
  callBack: PostsActionCallback<T>,
) {
  const { posts, total }: GetRoomPostsResponse = yield call(() =>
    getRoomPostsAPI(roomId, limit, offset),
  );
  yield callBack(posts, total);
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
    ({ payload: { channel, roomId, limit, offset, callback } }: GetRoomPostsAPI) =>
      progressHandler(
        channel,
        requestRoomPostsAPI(roomId, limit, offset, (room, total) => callback(room, total)),
      ),
  );
}
