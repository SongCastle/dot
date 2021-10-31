import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import {
  dispatch,
  getLatestRooms,
  latestRoomsSelector,
  progressSelector,
  StatusState,
} from '../store';

import type { Channel } from '../store';

const myChnnel: Channel = 'Content';

export const Content: React.FC = () => {
  const status = useSelector((state) => progressSelector(state)(myChnnel));
  const rooms = useSelector(latestRoomsSelector, shallowEqual);

  useEffect(() => {
    dispatch(getLatestRooms(myChnnel));
  }, []);

  return (
    <section className='border flex-grow'>
      <h3>最新のルーム一覧</h3>
      {(() => {
        if (status === StatusState.LOAD) {
          return <p>ローディング中...</p>;
        }
        if (rooms.length > 0) {
          return rooms.map((room) => <article key={room.id}>{room.name}</article>);
        }
        return <div>存在しません...</div>;
      })()}
    </section>
  );
};
