export const CommonConstants = {
  BACK_HOST: process.env.BACK_HOST
} as const

export const StatusState = {
  IDLE: 'idle',
  LOAD: 'loading',
  SUCCESS: 'succeeded',
  FAIL: 'failed'
} as const;
export type StatusState = typeof StatusState[keyof typeof StatusState];
