import { Box } from '@mui/material';
import queryString from 'query-string';
import { FC } from 'react';

import { Logo, SearchBox } from './Common';

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
    <Box sx={{ width: '100%', mb: '3rem', textAlign: 'center' }}>
      <Logo />
      <SearchBox
        sx={{ width: 'min(95%, 320px)', mt: '1rem' }}
        onSubmit={(text) => {
          const params = queryString.stringify({ q: text });
          dispatchPath(`/rooms/search?${params}`);
        }}
      />
    </Box>
  </Box>
);
