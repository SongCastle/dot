import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { 
  dispatch,
  getLatestRooms,
  latestRoomsSelector,
  progressSelector,
  StatusState
} from '../store';

import type { channel } from '../store';

const myChnnel: channel = 'Content';

export const Content: React.FC = () => {
  const status = useSelector(state => progressSelector(state)(myChnnel));
  const rooms = useSelector(latestRoomsSelector);

  useEffect(() => {
    dispatch(getLatestRooms(myChnnel));
  }, []);

  return (
    <section className="border flex-grow">
      <h3>最新のルーム一覧</h3>
      {
        status === StatusState.LOAD ? (
          <p>ローディング中...</p>
        ) : (
          rooms.length > 0 ? (
            rooms.map((room) =>
              <article key={room.id}>{room.name}</article>
            )
          ) : (
            <div>存在しません...</div>
          )
        )
      }
    </section>
  );
};
