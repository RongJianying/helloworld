/* eslint-disable */
import { contextSwitchRoute, booleanRoute } from 'spark-router';
import { MarketplaceModel } from './marketplace_model';

export const marketplaceRoute = contextSwitchRoute(MarketplaceModel, [
  { path: '/', propName: 'listing', route: booleanRoute },
  { path: '/buyer_order', propName: 'buyerOrder', route: booleanRoute },
  { path: '/seller_order', propName: 'sellerOrder', route: booleanRoute },
  { path: '/listing', propName: 'listing', route: booleanRoute },
  { path: '/store', propName: 'store', route: booleanRoute }
]);
// export default marketplaceRoute;
