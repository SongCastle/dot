import axios from 'axios';

import type { UpsertRoomProps } from './actions';
import { roomJSONType } from './constants';

import { categoryJSONType } from '../categories';
import { CommonConstants, JSONSerializer } from '../../common';
import type { JSONAPIDocument } from '../../common';

// JSON API
JSONSerializer.register(roomJSONType, {
  relationships: {
    sub_categories: {
      type: categoryJSONType,
    },
    main_category: {
      type: categoryJSONType,
    },
  },
});

// API
export async function getRoomApi(roomId: string): Promise<UpsertRoomProps> {
  const base = axios.create({
    baseURL: CommonConstants.BACK_HOST,
  });
  const response = await base.get<JSONAPIDocument>(`/v1/rooms/${roomId}`);
  return JSONSerializer.deserialize<UpsertRoomProps>(roomJSONType, response.data);
}

export async function getRoomsApi(): Promise<UpsertRoomProps[]> {
  const base = axios.create({
    baseURL: CommonConstants.BACK_HOST,
  });
  const response = await base.get<JSONAPIDocument>('/v1/rooms');
  return JSONSerializer.deserialize<UpsertRoomProps[]>(roomJSONType, response.data);
}

export async function getCategoryRoomsApi(categoryId: string): Promise<UpsertRoomProps[]> {
  const base = axios.create({
    baseURL: CommonConstants.BACK_HOST,
  });
  const response = await base.get<JSONAPIDocument>(`/v1/categories/${categoryId}/rooms`);
  return JSONSerializer.deserialize<UpsertRoomProps[]>(roomJSONType, response.data);
}
