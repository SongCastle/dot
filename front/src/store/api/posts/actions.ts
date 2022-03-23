import { createAction } from '@reduxjs/toolkit';

import { PostAPIActionLabel } from './constants';
import type { PostResponse } from './fetch';

import type { Channel } from '../../ui';

type OnlyIDPost = Partial<Omit<PostResponse, 'id'>> & Pick<PostResponse, 'id'>;
export type PostActionCallback<T = any> = (post: OnlyIDPost) => T;
export type PostsActionCallback<T = any> = (posts: OnlyIDPost[], total: number) => T;

export const getRoomPostsAPI = createAction(
  PostAPIActionLabel.GET_ROOM_POSTS_API,
  (
    channel: Channel,
    roomId: string,
    limit: number,
    offset: string | undefined,
    callback: PostsActionCallback,
  ) => ({
    payload: {
      channel,
      roomId,
      limit,
      offset,
      callback,
    },
  }),
);

// TODO: User
export const createPostAPI = createAction(
  PostAPIActionLabel.CREATE_POST_API,
  (
    channel: Channel,
    roomId: string,
    userId: string | null,
    message: string,
    callback: PostActionCallback,
  ) => ({
    payload: {
      channel,
      roomId,
      userId,
      message,
      callback,
    },
  }),
);

export type GetRoomPostsAPI = ReturnType<typeof getRoomPostsAPI>;
export type CreatePostAPI = ReturnType<typeof createPostAPI>;
