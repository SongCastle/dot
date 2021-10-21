export const StatusState = {
  IDLE: 'idle',
  LOAD: 'loading',
  SUCCESS: 'succeeded',
  FAIL: 'failed'
} as const;
export type StatusState = typeof StatusState[keyof typeof StatusState];

export const ProgressActionLabel = {
  IDLE: 'IDLE_ACTION',
  LOAD: 'LOAD_ACTION',
  SUCCESS: 'SUCCESS_ACTION',
  FAIL: 'FAIL_ACTION'
} as const;
