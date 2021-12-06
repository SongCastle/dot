import { Container } from '@mui/material';
import React from 'react';

import { LatestCategoryList } from './Category/LatestCategoryList';

export const Navigation: React.FC = () => (
  <Container>
    <LatestCategoryList />
  </Container>
);
