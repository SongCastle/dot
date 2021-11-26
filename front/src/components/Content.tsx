import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { LatestCategories } from './Category/LatestCategories';
import { RoomDetail } from './Room/RoomDetail';

export const Content: React.FC = () => (
  <Switch>
    <Route path='/rooms/:roomId' component={RoomDetail} />
    <Route component={LatestCategories} />
  </Switch>
);
