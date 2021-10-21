import JSONAPISerializer from 'json-api-serializer';

export type JSONAPIDocument = JSONAPISerializer.JSONAPIDocument;
export const JSONSerializer = new JSONAPISerializer();
export type { ResourceObject } from 'json-api-serializer';
