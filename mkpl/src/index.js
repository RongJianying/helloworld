import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Debug } from 'spark-debug';
import { createAppContainer, NotFoundComponent } from 'biz-app';
import { withRouterModel, withRouterComponent } from 'spark-router';
import { marketplaceRoute } from './marketplace_route';
import { MarketplaceModel } from './marketplace_model';
import { MarketplaceComponent } from './marketplace_component';
import buildMarketplaceResources from './discover_resources';
import './lib/common.css';
import 'spark-ui/lib/spark-ui.css';

const discoverEndpoint = '/app/services/discover?module=mkpl';

const getNavigations = () => [];

const networkId = browserHistory.getCurrentLocation().pathname.split('/')[2];

const BridgeModel = withRouterModel(
  marketplaceRoute,
  browserHistory,
  `/app/${networkId}/mkpl`
)(MarketplaceModel);

const BridgeComponent = withRouterComponent(NotFoundComponent)(MarketplaceComponent);

const getRoutes = () => [
  {
    path: '/app',
    layout: false,
    childRoutes: [
      {
        path: networkId,
        layout: false,
        childRoutes: [
          {
            path: 'mkpl',
            model: BridgeModel,
            component: BridgeComponent
          },
          {
            path: 'mkpl/*',
            model: BridgeModel,
            component: BridgeComponent
          }
        ]
      }
    ]
  }
];

const toAbsoluteUrl = () => {};

const marketplaceContainer = createAppContainer(
  discoverEndpoint,
  getNavigations,
  getRoutes,
  toAbsoluteUrl,
  buildMarketplaceResources
);

if (process.env.NODE_ENV !== 'production') {
  Debug.enable();
}

const container = React.createElement(marketplaceContainer);
ReactDOM.render(container, document.getElementById('app'));
