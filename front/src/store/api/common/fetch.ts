import axios from 'axios';
import JSONAPISerializer from 'json-api-serializer';

const CommonConstants = {
  BACK_HOST: process.env.BACK_HOST,
} as const;

export const backAPI = axios.create({
  baseURL: CommonConstants.BACK_HOST,
});

export const JSONSerializer = new JSONAPISerializer();
export type JSONAPIDocument = JSONAPISerializer.JSONAPIDocument;
export type { ResourceObject } from 'json-api-serializer';
