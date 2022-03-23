import { RoomJSONType } from './constants';

import { CategoryJSONType } from '../categories';
import { backAPI, CommonConstants, JSONSerializer } from '../common';
import type { JSONAPIDocument } from '../common';

// JSON API
JSONSerializer.register(RoomJSONType, {
  relationships: {
    sub_categories: {
      type: CategoryJSONType,
    },
    main_category: {
      type: CategoryJSONType,
    },
  },
});

export type RoomResponse = {
  id: string;
  name: string;
  description?: string;
  creator_id?: string; // TODO: User
  created_at: string;
  main_category?: string;
  sub_categories?: string[];
};

// API
export async function getRoomAPI(roomId: string): Promise<RoomResponse> {
  const response = await backAPI.get<JSONAPIDocument>(`/v1/rooms/${roomId}`);
  return JSONSerializer.deserialize<RoomResponse>(RoomJSONType, response.data);
}

export async function getRoomsAPI(): Promise<RoomResponse[]> {
  const response = await backAPI.get<JSONAPIDocument>('/v1/rooms');
  return JSONSerializer.deserialize<RoomResponse[]>(RoomJSONType, response.data);
}

export async function getCategoryRoomsAPI(categoryId: string): Promise<RoomResponse[]> {
  const response = await backAPI.get<JSONAPIDocument>(`/v1/categories/${categoryId}/rooms`);
  return JSONSerializer.deserialize<RoomResponse[]>(RoomJSONType, response.data);
}

export async function searchRoomsAPI(query: string | string[]): Promise<RoomResponse[]> {
  const response = await backAPI.get<JSONAPIDocument>(`/v1/search/rooms`, {
    params: {
      q: query,
    },
  });
  return JSONSerializer.deserialize<RoomResponse[]>(RoomJSONType, response.data);
}

export const avatarURL = (id: string) => `${CommonConstants.BACK_HOST}/v1/rooms/${id}/avatar`;
