/* eslint-disable */
import { createModel, PropTypes } from 'spark-modula';

export const MarketplaceModel = createModel({
  propTypes: {
    buyerOrder: PropTypes.bool,
    sellerOrder: PropTypes.bool,
    listing: PropTypes.bool,
    store: PropTypes.bool
  },
  defaults: {
    buyerOrder: false,
    sellerOrder: false,
    listing: false,
    store: false
  }
});
// export default MarketplaceModel;
