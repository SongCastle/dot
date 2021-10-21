import axios from 'axios';

import { categoryJSONType } from './constants';

import { CommonConstants, JSONSerializer } from '../common';
import type { JSONAPIDocument } from '../common';
import { roomJSONType } from '../rooms';

// JSON API
JSONSerializer.register(
  categoryJSONType,
  {
    relationships: {
      tags: {
        type: roomJSONType
      }
    }
  }
);

// API
export async function getMainCategoriesApi() : Promise<JSONAPIDocument>{
  const base = axios.create({
    baseURL: CommonConstants.BACK_HOST
  });
  const response = await base.get<JSONAPIDocument>('/v1/categories', {
    params: {
      type: 'main'
    }
  });
  return JSONSerializer.deserialize(categoryJSONType, response.data);
};
