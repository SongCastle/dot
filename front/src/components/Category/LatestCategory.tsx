import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  dispatch,
  getCategoryRooms,
  categoryRoomsSelector,
  progressSelector,
  StatusState
} from '../../store';

import type {
  channel,
  CategoryState
} from '../../store';

type LatestCategoryProp = { category: CategoryState };

export const LatestCategory: React.FC<LatestCategoryProp> = ({ category }: LatestCategoryProp) => {
  const myChannel: channel = `LatestCategory-${category.id}`;

  const status = useSelector(state => progressSelector(state)(myChannel));
  const rooms = useSelector(state => categoryRoomsSelector(state)(category.id));

  // TODO: 同じデータの upsert でも、オブジェクトの比較に引っかかって、再レンダリングが走ってしまう

  useEffect(() => {
    dispatch(getCategoryRooms(category.id, myChannel))
  }, []);

  return (
    <div className="border my-2">
      <p>{category.name}</p>
      <ul className="pl-2">
        {
          status === StatusState.LOAD ? (
            <p>ローディング中...</p>
          ) : (
            rooms.map(room => <li key={room.id}>{room.name}</li>)
          )
        }
      </ul>
    </div>
  );
};
