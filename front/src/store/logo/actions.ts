import { createAction } from '@reduxjs/toolkit';

import { LogoActionLabel } from './constants';

export type LogoState = { num: number };

export const updateLogo = createAction(LogoActionLabel.UPDATE_LOGO);
