import React, { useEffect } from 'react';
import isEqual from 'react-fast-compare';
import { useSelector } from 'react-redux';
import type { DefaultRootState } from 'react-redux';

import { LatestCategory } from './Category/LatestCategory';

import { dispatch, getLatestCategories, latestCategoriesSelector, StatusState } from '../store';
import type { Channel } from '../store';

const myChannel: Channel = 'Nav';
const myLatestCategoriesSelector = (state: DefaultRootState) => (channel: Channel) => {
  const { categories, status } = latestCategoriesSelector(state)(channel);
  return {
    categories: categories.map(({ id, name }) => ({ id, name })),
    status,
  };
};

export const Nav: React.FC = () => {
  const { categories, status } = useSelector(
    (state) => myLatestCategoriesSelector(state)(myChannel),
    isEqual,
  );

  useEffect(() => {
    dispatch(getLatestCategories(myChannel));
  }, []);

  return (
    <nav className='border flex-none min-w-min w-1/5'>
      <p>カテゴリ一覧</p>
      {(() => {
        if (status === StatusState.LOAD) {
          return <p>ローディング中...</p>;
        }
        if (categories.length > 0) {
          return categories.map(({ id, name }) => (
            <LatestCategory key={id} id={id} name={name} />
          ));
        }
        return <p>存在しません...</p>;
      })()}
    </nav>
  );
};
