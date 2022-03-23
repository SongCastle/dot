import { createAction } from '@reduxjs/toolkit';
import type { UpsertProps } from 'redux-orm';

import { Post } from './orm';
import { PostActionLabel } from './constants';

import { Channel } from '../../ui';

export type UpsertPostProps = UpsertProps<Post>;

// Action
export const getRoomPosts = createAction(
  PostActionLabel.GET_ROOM_POSTS,
  (channel: Channel, roomId: string, limit: number, offset?: string) => ({
    payload: {
      channel,
      roomId,
      limit,
      offset,
    },
  }),
);

export const createPost = createAction(
  PostActionLabel.CREATE_POST,
  (channel: Channel, roomId: string, userId: string | null, message: string) => ({
    payload: {
      channel,
      roomId,
      userId,
      message,
    },
  }),
);

export const upsertPosts = createAction(
  PostActionLabel.UPSERT_POSTS,
  (posts: UpsertPostProps[]) => ({
    payload: posts,
  }),
);

export type GetRoomPostsType = ReturnType<typeof getRoomPosts>;
export type CreatePostType = ReturnType<typeof createPost>;
type UpsertPostsType = ReturnType<typeof upsertPosts>;

export type PostActionType = GetRoomPostsType | CreatePostType | UpsertPostsType;
