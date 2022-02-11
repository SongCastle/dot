import React, { FC } from 'react';
import { ConnectedRouter as Router } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

import { LatestRooms, RoomDetail, SearchResult } from './Room';
import { Layout } from './User/Layout';
import { App } from './App';
import { Top } from './Top';

import { history } from '../store';

export const Routes: FC = () => (
  <Router history={history}>
    <App>
      <Switch>
        <Route exact path='/rooms/search' component={SearchResult} />
        <Route
          exact
          path='/rooms/:roomId'
          render={() => (
            <Layout>
              <RoomDetail />
            </Layout>
          )}
        />
        <Route
          exact
          path='/latest'
          render={() => (
            <Layout>
              <LatestRooms />
            </Layout>
          )}
        />
        <Route path='/' component={Top} />
      </Switch>
    </App>
  </Router>
);
