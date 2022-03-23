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

const defaultTextLabel = 'メッセージ';
const alertTextLabel = 'メッセージを入力してください！';

export const SendPostForm: FC<SendPostFormProps> = ({ roomId, onSent }) => {
  const myChannel: Channel = `SendPostForm-${roomId}`;
  const status = useAppSelector((state) => myUIStateSelector(state)(myChannel));

  const [message, setMessage] = useState<string>('');
  const [label, setLabel] = useState<string>(defaultTextLabel);

  const sendMessage = () => {
    // TODO: 投稿ユーザの判別
    if (message === '') {
      setLabel(alertTextLabel);
      return;
    }
    dispatch(createPost(myChannel, roomId, null, message));
  };

  useEffect(() => {
    if (status === ProgressStatus.SUCCESS) {
      setLabel(defaultTextLabel);
      setMessage('');
      onSent?.();
    }
  }, [status]);

  return (
    <>
      <TextField
        label={label}
        variant='outlined'
        size='small'
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onFocus={() => {
          setLabel(defaultTextLabel);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) sendMessage();
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
            <IconButton color='primary' onClick={sendMessage}>
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
