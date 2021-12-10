import { Box, CircularProgress, Typography } from '@mui/material';
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

  if (status === StatusState.LOAD) {
    return (
      <Box m={2}>
        <CircularProgress size={30} />
      </Box>
    );
  }
  if (status === StatusState.FAIL) return <Typography>取得に失敗しました</Typography>;
  return <> {children} </>;
};

Progress.defaultProps = {
  deps: [],
};
