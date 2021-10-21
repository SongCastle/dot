import axios from 'axios';

import { roomJSONType } from './constants';

import { categoryJSONType } from '../categories';
import { CommonConstants, JSONSerializer } from '../common';
import type { JSONAPIDocument } from '../common';

// JSON API
JSONSerializer.register(
  roomJSONType,
  {
    relationships: {
      tags: {
        type: categoryJSONType
      }
    }
  }
);

// API
export async function getRoomsApi(): Promise<JSONAPIDocument>{
  const base = axios.create({
    baseURL: CommonConstants.BACK_HOST
  });
  const response = await base.get<JSONAPIDocument>('/v1/rooms');
  return JSONSerializer.deserialize(roomJSONType, response.data);
};

export async function getCategoryRoomsApi(category_id: number): Promise<JSONAPIDocument>{
  const base = axios.create({
    baseURL: CommonConstants.BACK_HOST
  });
  const response = await base.get<JSONAPIDocument>(`/v1/categories/${category_id}/rooms`);
  return JSONSerializer.deserialize(roomJSONType, response.data);
};
