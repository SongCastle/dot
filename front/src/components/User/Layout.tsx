import { Box, Grid } from '@mui/material';
import React, { FC } from 'react';
import type { ReactNode } from 'react';

import { Navigation } from './Navigation';

type LayoutProp = {
  children: ReactNode;
};

export const Layout: FC<LayoutProp> = ({ children }) => (
  <Box my={4}>
    <Grid container>
      <Grid item xs={3}>
        <Navigation />
      </Grid>
      <Grid item xs={9}>
        {children}
      </Grid>
    </Grid>
  </Box>
);
