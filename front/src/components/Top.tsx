import { Box } from '@mui/material';
import queryString from 'query-string';
import { FC } from 'react';

import { Logo } from './Common/Logo';
import { SearchBox } from './Common/SearchBox';

import { dispatchPath } from '../store';

export const Top: FC = () => (
  <Box
    sx={{
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
    }}
  >
    <Box sx={{ width: '100%', marginBottom: '3rem' }}>
      <Logo />
      <SearchBox
        sx={{ width: 'min(95%, 320px)', marginTop: '0.5rem' }}
        onSubmit={(text) => {
          const params = queryString.stringify({ q: text });
          dispatchPath(`/rooms/search?${params}`);
        }}
      />
    </Box>
  </Box>
);
