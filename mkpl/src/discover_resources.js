/* eslint-disable */
const buildMarketplaceResources = () => {
  const orderServiceBaseUrl = 'http://localhost:3370';
  const listingServiceBaseUrl = 'http://localhost:3390';
  // Tmp mocked buyer listing
  const buyerListingServiceBaseUrl = 'http://localhost:9010';

  return {
    'fetch.listing': {
      type: 'json',
      method: 'GET',
      url: `http://localhost:9010/app/services/listing`
    },
    'listing.list': {
      type: 'json',
      method: 'GET',
      url: `${listingServiceBaseUrl}/mkpl_listings/search?pagination=%{pagination}&sort=%{sort}&search=%{search}`
    },
    'listing.update': {
      type: 'json',
      method: 'PUT',
      url: `${listingServiceBaseUrl}/mkpl_listings/%{id}`
    },
    'order.create': {
      type: 'json',
      method: 'POST',
      url: `${orderServiceBaseUrl}/orders`
    },
    'order.list': {
      type: 'json',
      method: 'GET',
      url: `${orderServiceBaseUrl}/orders?search=%{search}&pagination=%{pagination}&role=%{role}`
    },
    'order.detail': {
      type: 'json',
      method: 'GET',
      url: `${orderServiceBaseUrl}/orders/%{id}`
    },
    'buyer_listing.list': {
      type: 'json',
      method: 'GET',
      url: `${buyerListingServiceBaseUrl}/mkpl_buyer_listings/search?pagination=%{pagination}&sort=%{sort}&search=%{search}`
    }
  };
};
export default buildMarketplaceResources;
