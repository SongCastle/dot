import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { FC } from 'react';

import { dispatchPath } from '../store';

const headerStyle = css`
  height: 6rem;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
`;

export const Header: FC = () => (
  <header css={headerStyle}>
    <Box sx={{ width: '100%', height: '100%' }} onClick={() => dispatchPath('/')} />
  </header>
);
