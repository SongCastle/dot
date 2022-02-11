import { createReducer } from '@reduxjs/toolkit';

import { updateLogo } from './actions';
import type { LogoState } from './actions';
import { DotLogoList } from './constants';

const generateLogNum = () => Math.floor(Math.random() * DotLogoList.length);
const initialLogoState: LogoState = { num: generateLogNum() };

export const reducer = createReducer<LogoState>(initialLogoState, (builder) => {
  builder.addCase(updateLogo, (state) => {
    let newNum = generateLogNum();
    while (newNum === state.num) {
      newNum = generateLogNum();
    }
    state.num = newNum;
  });
});

export const selectLogo = (num: number) => DotLogoList[num];
