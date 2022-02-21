export const ProgressStatus = {
  IDLE: 'IDLE',
  LOAD: 'LOAD',
  SUCCESS: 'SUCCEEDED',
  FAIL: 'FAILED',
} as const;
export type ProgressType = typeof ProgressStatus[keyof typeof ProgressStatus];

export const UIActionLabel = {
  IDLE: 'UI/IDLE_ACTION',
  LOAD: 'UI/LOAD_ACTION',
  SUCCESS: 'UI/SUCCESS_ACTION',
  FAIL: 'UI/FAIL_ACTION',
} as const;
