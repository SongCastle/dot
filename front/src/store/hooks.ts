import queryString from 'query-string';
import isEqual from 'react-fast-compare';
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { avatarURL as roomAvatarURL } from './api';
import type { RootState } from './reducers';

type TypedUseAppSelectorHook = TypedUseSelectorHook<RootState>;
export const useAppSelector: TypedUseAppSelectorHook = useSelector;
export const useAppObjectSelector: TypedUseAppSelectorHook = (selector, equalityFn?) =>
  useSelector(selector, equalityFn || isEqual);

export const useQueryString = () => queryString.parse(useLocation().search);

type RoomParams = { roomId: string };
export const useRoomIdParams = () => useParams<RoomParams>();
export const useRoomAvatar = (id: string) => roomAvatarURL(id);
