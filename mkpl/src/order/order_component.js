/* eslint-disable */
import React from 'react';
import { browserHistory, IndexRedirect, Route, Router, withRouter } from 'react-router';
import { ThemeContext } from 'spark-styles';
// import OrderList from './order_list';
import { routerStateContextRef } from './navigation';
import CreateOrderNoModelComponent from './create_order_no_model/components/create_order_component';
import OrderEdit from './edit/page';
import OrderList from './order_list/order_list';

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

const OrderComponent = React.memo(() => {
  // let url = mkplRole === 'BUYER' ? 'buyer_order' : 'seller_order';
  return (
    <div>
      <ThemeContext.Provider value="default">
        <Router history={browserHistory}>
          <Route path={baseHref} component={AppContainer}>
            {/* <IndexRedirect to="/buyer_order" /> */}
            <Route path="buyer_order" component={() => <OrderList mkplRole="BUYER" />} />
            <Route path="seller_order" component={() => <OrderList mkplRole="SELLER" />} />
            <Route path="buyer_order/create/:listing_id">
              <IndexRedirect to="listing_setup" />
              <Route path=":tab" component={CreateOrderNoModelComponent} />
            </Route>
            <Route path="buyer_order/:id">
              <IndexRedirect to="edit" />
              <Route path="edit">
                <IndexRedirect to="general" />
                <Route path=":tab" component={OrderEdit} />
              </Route>
            </Route>
          </Route>
        </Router>
      </ThemeContext.Provider>
    </div>
  );
});

export default OrderComponent;
