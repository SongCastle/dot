import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import type { BoxProps } from '@mui/system';
import { ArrowForward } from '@mui/icons-material';
import React, { useState, FC } from 'react';

type SearchBoxProp = Pick<BoxProps, 'sx'> & {
  onSubmit: (text: string[]) => void;
};

export const SearchBox: FC<SearchBoxProp> = ({ sx, onSubmit }) => {
  const [text, setText] = useState<string>('');

  return (
    <Box sx={{ textAlign: 'center' }}>
      <TextField
        id='outlined-search'
        size='small'
        type='text'
        sx={sx}
        label='検索'
        placeholder='キーを入力'
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSubmit(text.split(' '));
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                edge='end'
                onClick={() => {
                  onSubmit(text.split(' '));
                }}
              >
                <ArrowForward />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
