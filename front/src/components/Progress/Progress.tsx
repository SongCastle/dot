import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, FC } from 'react';
import type { DependencyList, EffectCallback, ReactNode } from 'react';

import { ProgressStatus } from '../../store';
import type { ProgressType } from '../../store';

type ProgressProp = {
  children: ReactNode;
  callback: EffectCallback;
  deps?: DependencyList;
  status: ProgressType;
};

export const Progress: FC<ProgressProp> = ({ children, callback, deps, status }) => {
  useEffect(() => {
    callback();
  }, deps);

  if (status === ProgressStatus.FAIL) return <Typography>取得に失敗しました</Typography>;

  if (status === ProgressStatus.SUCCESS) return <> {children} </>;

  return (
    <Box m={2}>
      <CircularProgress size={30} />
    </Box>
  );
};

Progress.defaultProps = {
  deps: [],
};
