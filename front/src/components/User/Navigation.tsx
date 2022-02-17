import { Container } from '@mui/material';
import { FC } from 'react';

import { LatestCategoryList } from '../Category/LatestCategoryList';

export const Navigation: FC = () => (
  <Container>
    <LatestCategoryList />
  </Container>
);
