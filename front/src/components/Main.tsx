import { Box, Container, Grid } from '@mui/material';
import React from 'react';

import { Content } from './Content';
import { Navigation } from './Navigation';

export const Main: React.FC = () => (
  // TODO: TailwindCSS をやめるべきかも ...
  <Container className='min-h-screen-4/5'>
    <Box my={4}>
      <Grid container>
        <Grid item xs={2.5}>
          <Navigation />
        </Grid>
        <Grid item xs={9.5}>
          <Content />
        </Grid>
      </Grid>
    </Box>
  </Container>
);
