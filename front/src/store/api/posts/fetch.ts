import { PostJSONType } from './constants';

import { RoomJSONType } from '../rooms';
import { backAPI, JSONSerializer } from '../common';
import type { JSONAPIDocument } from '../common';

// JSON API
JSONSerializer.register(PostJSONType, {
  relationships: {
    // TODO: User
    // user: {
    //   type: CategoryJSONType,
    // },
    room: {
      type: RoomJSONType,
    },
  },
});

export type PostResponse = {
  id: string;
  user_id?: string; // TODO: User
  message: string;
  created_at: string;
  room?: string;
};

type GetRoomPostsMeta = {
  total: number;
  limit: number;
  offset: string;
};

export type GetRoomPostsResponse = {
  total: number;
  posts: PostResponse[];
};

const isGetRoomPostsMeta = (meta?: any): meta is GetRoomPostsMeta =>
  meta !== undefined &&
  typeof meta.total === 'number' &&
  typeof meta.limit === 'number' &&
  typeof meta.offset === 'string';

export async function getRoomPostsAPI(
  roomId: string,
  limit: number,
  offset?: string,
): Promise<GetRoomPostsResponse> {
  const response = await backAPI.get<JSONAPIDocument>(`/v1/rooms/${roomId}/posts`, {
    params: {
      limit,
      offset,
    },
  });
  // TODO: total の必要性について、 offset よりも page の方が良いかも ...
  const total = isGetRoomPostsMeta(response.data.meta) ? response.data.meta.total : 0;
  return {
    total,
    posts: JSONSerializer.deserialize<PostResponse[]>(PostJSONType, response.data),
  };
}

// TODO: JSONSerializer.serialize の方が良いのかも ...
export async function createPostAPI(
  roomId: string,
  userId: string | null,
  message: string,
): Promise<PostResponse> {
  const response = await backAPI.post<JSONAPIDocument>(`/v1/rooms/${roomId}/posts`, {
    user_id: userId,
    message,
  });
  return JSONSerializer.deserialize<PostResponse>(PostJSONType, response.data);
}
