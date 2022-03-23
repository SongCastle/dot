import { CategoryJSONType } from './constants';

import { backAPI, JSONSerializer } from '../common';
import type { JSONAPIDocument } from '../common';
import { RoomJSONType } from '../rooms';

// JSON API
JSONSerializer.register(CategoryJSONType, {
  relationships: {
    tags: {
      type: RoomJSONType,
    },
  },
});

export type CategoryResponse = {
  id: string;
  name: string;
  creator_id?: string; // TODO: User
  created_at: string;
  rooms?: string[];
};

// API
export async function getCategoriesAPI(type?: 'main' | 'sub'): Promise<CategoryResponse[]> {
  const response = await backAPI.get<JSONAPIDocument>('/v1/categories', {
    params: {
      type,
    },
  });
  return JSONSerializer.deserialize<CategoryResponse[]>(CategoryJSONType, response.data);
}

export async function getRoomCategoriesAPI(roomId: string): Promise<CategoryResponse[]> {
  const response = await backAPI.get<JSONAPIDocument>(`/v1/rooms/${roomId}/categories`);
  return JSONSerializer.deserialize<CategoryResponse[]>(CategoryJSONType, response.data);
}
