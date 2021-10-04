export const StatusState = {
  IDLE: 'idle',
  LOAD: 'loading',
  SUCCESS: 'succeeded',
  FAIL: 'failed'
} as const;
export type StatusState = typeof StatusState[keyof typeof StatusState];

export const CategoryActionType = {
  GET_CATEGORIES: 'categories/index',
  GET_CATEGORIES_SUCCESS: 'categories/index/success'
} as const
