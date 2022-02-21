import { Box } from '@mui/material';
import React, { FC } from 'react';

import { dispatchPath } from '../store';

// TODO: TailwindCSS をやめるべきかも ...
export const Header: FC = () => (
  <header className='border cursor-pointer h-24'>
    <Box sx={{ width: '100%', height: '100%' }} onClick={() => dispatchPath('/')} />
  </header>
);
