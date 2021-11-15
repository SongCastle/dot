import { replace } from 'connected-react-router';
import React from 'react';

import { dispatch } from '../../store';

type NavRoomButtonProp = {
  id: string;
  name: string;
};

// TODO: connected-react-router による再レンダリングを制限したい
export const NavRoomButton: React.FC<NavRoomButtonProp> = ({ id, name }) => (
  <button
    type='button'
    onClick={() => {
      dispatch(replace(`/rooms/${id}`));
    }}
  >
    &gt; {name}
  </button>
);
