import { Paper } from '@mui/material';
import type { PaperProps } from '@mui/material';
import { FC } from 'react';
import type { ReactNode } from 'react';

type BasicPaperProp = {
  sx?: PaperProps['sx'];
  elevation?: PaperProps['elevation'];
  children: ReactNode;
};

const defaultSX = { p: '1rem' };

export const BasicPaper: FC<BasicPaperProp> = ({ sx, elevation, children }) => (
  <Paper sx={{ ...defaultSX, ...sx }} elevation={elevation}>
    {children}
  </Paper>
);

BasicPaper.defaultProps = {
  sx: {},
  elevation: 1,
};
