import { Container } from '@mui/material';
import React from 'react';

import { Content } from './Content';

export const Main: React.FC = () => (
  // TODO: TailwindCSS をやめるべきかも ...
  <Container className='min-h-screen-4/5 my-10'>
    <Content />
  </Container>
);
