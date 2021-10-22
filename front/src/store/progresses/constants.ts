export const StatusState = {
  IDLE: 'idle',
  LOAD: 'loading',
  SUCCESS: 'succeeded',
  FAIL: 'failed'
} as const;
export type StatusState = typeof StatusState[keyof typeof StatusState];

export const ProgressActionLabel = {
  IDLE: 'idle',
  LOAD: 'load',
  SUCCESS: 'success',
  FAIL: 'fail'
} as const;
