/* eslint-disable */
import React from 'react';
import { browserHistory, IndexRedirect, Route, Router, withRouter } from 'react-router';

import { routerStateContextRef } from './navigation';
import { ListingList } from './list/page';
import { ListingEdit } from './edit/page';

const baseHref = 'app/:networkID/mkpl';

const AppContainer = withRouter(({ children, location, params, router }) => {
  const contextVal = () => ({
    location,
    params,
    router
  });
  return (
    <routerStateContextRef.Provider value={contextVal}>
      <div>{children}</div>
    </routerStateContextRef.Provider>
  );
});

const ListingComponent = React.memo(() => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route path={baseHref} component={AppContainer}>
          <IndexRedirect to="/listings" />
          <Route path="listings" component={ListingList} />
          <Route path="listings/:id">
            <IndexRedirect to="edit" />
            <Route path="edit">
              <IndexRedirect to="general" />
              <Route path=":tab" component={ListingEdit} />
            </Route>
          </Route>
        </Route>
      </Router>
    </div>
  );
});
export default ListingComponent;
