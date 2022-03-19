import { Box, CircularProgress, IconButton, TextField, Tooltip } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useEffect, useState, FC } from 'react';

import {
  dispatch,
  useAppSelector,
  myUIStateSelector,
  createPost,
  ProgressStatus,
} from '../../store';
import type { Channel } from '../../store';

type SendPostFormProps = {
  roomId: string;
  onSent?: () => void;
};

// TODO: validation, cmd + return による送信
export const SendPostForm: FC<SendPostFormProps> = ({ roomId, onSent }) => {
  const myChannel: Channel = `SendPostForm-${roomId}`;
  const status = useAppSelector((state) => myUIStateSelector(state)(myChannel));

  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (status === ProgressStatus.SUCCESS) {
      setMessage('');
      onSent?.();
    }
  }, [status]);

  return (
    <>
      <TextField
        label='メッセージ'
        variant='outlined'
        size='small'
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        multiline
        fullWidth
      />
      <Box ml='0.5rem'>
        {status === ProgressStatus.LOAD ? (
          <IconButton color='primary' disabled>
            <CircularProgress size={24} />
          </IconButton>
        ) : (
          <Tooltip title='送信' placement='top'>
            <IconButton
              color='primary'
              onClick={() => { // TODO: 投稿ユーザの判別
                dispatch(createPost(myChannel, roomId, null, message));
              }}
            >
              <Send />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </>
  );
};

SendPostForm.defaultProps = {
  onSent: undefined,
};
