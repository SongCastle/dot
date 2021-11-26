import React, { useEffect } from 'react';
import type { DependencyList, EffectCallback } from 'react';

import { StatusState } from '../../store';
import type { StatusStateType } from '../../store';

type ProgressProp = {
  children: React.ReactNode;
  callback: EffectCallback;
  deps?: DependencyList;
  status: StatusStateType;
};

export const Progress: React.FC<ProgressProp> = ({ children, callback, deps, status }) => {
  useEffect(() => {
    if (status !== StatusState.SUCCESS) callback();
  }, deps);

  if (status === StatusState.LOAD) return <p>ローディング中...</p>;
  if (status === StatusState.FAIL) return <p>取得に失敗しました</p>;
  return <> {children} </>;
};

Progress.defaultProps = {
  deps: [],
};
