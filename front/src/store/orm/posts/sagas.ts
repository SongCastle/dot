import { put, takeEvery, takeLatest } from 'redux-saga/effects';

import { upsertPosts } from './actions';
import type { GetRoomPostsType, CreatePostType } from './actions';
import { PostActionLabel } from './constants';

import { requestRoomPostsAPI, requestCreatePostAPI } from '../../api';
import { progressHandler } from '../../ui';

function* requestRoomPosts(roomId: string, limit: number, offset?: string) {
  yield requestRoomPostsAPI(roomId, limit, offset, (posts) => put(upsertPosts(posts)));
}

function* requestCreatePost(roomId: string, userId: string | null, message: string) {
  yield requestCreatePostAPI(roomId, userId, message, (post) => put(upsertPosts([post])));
}

export function* watchPostsRequest() {
  yield takeLatest(
    PostActionLabel.GET_ROOM_POSTS,
    ({ payload: { channel, roomId, limit, offset } }: GetRoomPostsType) =>
      progressHandler(channel, requestRoomPosts(roomId, limit, offset)),
  );

  yield takeEvery(
    PostActionLabel.CREATE_POST,
    ({ payload: { channel, roomId, userId, message } }: CreatePostType) =>
      progressHandler(channel, requestCreatePost(roomId, userId, message)),
  );
}
