import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { RoomDetail } from './Room/RoomDetail';
import { LatestRooms } from './Room/LatestRooms';

export const Content: React.FC = () => (
  <Switch>
    <Route path='/rooms/:roomId' component={RoomDetail} />
    <Route component={LatestRooms} />
  </Switch>
);
