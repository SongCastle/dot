import { Box } from '@mui/material';
import { Search } from '@mui/icons-material';
import queryString from 'query-string';
import { FC } from 'react';

import { SearchBox } from '../Common';
import { dispatchPath } from '../../store';

type SearchResultInputProp = {
  q: string;
};

export const SearchResultInput: FC<SearchResultInputProp> = ({ q }) => (
  <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
    <Search />
    <SearchBox
      defaultText={q}
      sx={{ width: '100%', marginLeft: '1rem' }}
      onSubmit={(text) => {
        const params = queryString.stringify({ q: text });
        dispatchPath(`/rooms/search?${params}`);
      }}
    />
  </Box>
);
