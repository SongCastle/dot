import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { LatestCategory } from './Category/LatestCategory';

import {
  dispatch,
  getLatestCategories,
  latestCategoriesSelector,
  progressSelector,
  StatusState
} from '../store';

import type { channel } from '../store';

const myChannel: channel = 'Nav';

export const Nav: React.FC = () => {
  const status = useSelector(state => progressSelector(state)(myChannel));
  const categories = useSelector(latestCategoriesSelector);

  useEffect(() => {
    dispatch(getLatestCategories(myChannel))
  }, []);

  return (
    <nav className="border flex-none min-w-min w-1/5">
        <p>カテゴリ一覧</p>
        <ul>
          {
            status === StatusState.LOAD ? (
              <p>ローディング中...</p>
            ) : (
              categories.length > 0 ? (
                categories.map(category =>
                  <LatestCategory key={category.id} category={category} />
                )
              ) : (
                <li>存在しません...</li>
              )
            )
          }
        </ul>
    </nav>
  );
};
