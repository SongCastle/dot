import { IconButton, InputAdornment, TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useState, FC } from 'react';

type SearchBoxProp = Pick<TextFieldProps, 'sx'> & {
  defaultText?: string;
  onSubmit: (text: string[]) => void;
};

export const SearchBox: FC<SearchBoxProp> = ({ defaultText, sx, onSubmit }) => {
  const [text, setText] = useState<string>(defaultText || '');

  return (
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
  );
};

SearchBox.defaultProps = {
  defaultText: '',
};
