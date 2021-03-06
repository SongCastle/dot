import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import type { CardTypeMap } from '@mui/material';
import { FC } from 'react';

import { CategoryChips } from '../Category/CategoryChips';
import { dispatchPath, useAppObjectSelector, useRoomAvatar, roomStateSelector } from '../../store';

type RoomBoxProp = {
  id: string;
  sx?: CardTypeMap['props']['sx'];
};

export const RoomBox: FC<RoomBoxProp> = ({ id, sx }) => {
  const room = useAppObjectSelector((state) => roomStateSelector(state)(id));
  const avatarURL = useRoomAvatar(id);

  return room ? (
    <Card sx={sx}>
      <CardHeader
        avatar={<Avatar src={avatarURL} />}
        title={<Typography gutterBottom>{room.name}</Typography>}
      />
      <CardContent>
        {/* TODO: 閲覧しているユーザ数を表示したい */}
        <CategoryChips roomId={id} />
      </CardContent>
      <CardActions sx={{ alignSelf: 'flex-end', flexGrow: 1 }}>
        <IconButton
          edge='start'
          sx={{ alignSelf: 'flex-end' }}
          onClick={() => {
            dispatchPath(`/rooms/${id}`);
          }}
        >
          <ChevronRight />
        </IconButton>
      </CardActions>
    </Card>
  ) : (
    <Card>
      <CardContent>
        <Typography gutterBottom>存在しないルーム</Typography>
      </CardContent>
    </Card>
  );
};

RoomBox.defaultProps = {
  sx: { display: 'flex', flexFlow: 'column', flexBasis: '100%' },
};
