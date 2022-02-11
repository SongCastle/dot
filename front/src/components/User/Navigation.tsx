import { Container } from '@mui/material';
import React, { FC } from 'react';

import { LatestCategoryList } from '../Category/LatestCategoryList';

export const Navigation: FC = () => (
  <Container>
    <LatestCategoryList />
  </Container>
);
