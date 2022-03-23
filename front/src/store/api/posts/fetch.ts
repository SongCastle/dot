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

export async function getRoomPostsAPI(roomId: string): Promise<PostResponse[]> {
  const response = await backAPI.get<JSONAPIDocument>(`/v1/rooms/${roomId}/posts`);
  return JSONSerializer.deserialize<PostResponse[]>(PostJSONType, response.data);
}

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
