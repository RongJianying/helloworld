/* eslint-disable */
import { Links, Link } from 'spark-link';

import ListingComponent from './listing/listing_component';
import OrderComponent from './order/order_component';
import { StoreComponent } from './store/store_component';

import './marketplace_component.css';

export const MarketplaceComponent = ({ model }) => {
  const isListing = model.get('listing');
  const isBuyerOrder = model.get('buyerOrder');
  const isSellerOrder = model.get('sellerOrder');
  const isStore = model.get('store');
  return model ? (
    <div
      style={{
        width: '100%',
        backgroundImage: 'linear-gradient(to right, #4f0d91, #37338f)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        overflowY: 'auto',
        fontFamily: "'Montserrat', sans-serif",
        zIndex: -2
      }}
    >
      <img
        src="https://www.freewheel.com/wp-content/themes/understrap-child/img/icons/wheel.svg"
        style={{
          position: 'fixed',
          width: '1500px',
          zIndex: -1,
          left: '90px',
          top: '-120px',
          animation: '10s spin infinite linear'
        }}
        alt=""
      />
      <div
        style={{
          height: '30px',
          color: 'white',
          position: 'absolute',
          top: '15px',
          left: '20px',
          right: '20px'
        }}
      >
        <Links>
          <Link href="TODO" style={{ color: 'white', padding: '4px 18px', outline: 'none' }}>
            HOME
          </Link>
          <Link href="store" style={{ color: 'white', padding: '4px 18px', outline: 'none' }}>
            {isStore ? <u>STORE</u> : 'STORE'}
          </Link>
          <Link href="listing" style={{ color: 'white', padding: '4px 18px', outline: 'none' }}>
            {isListing ? <u>LISTINGS MANAGEMENT</u> : 'LISTINGS MANAGEMENT'}
          </Link>
          <Link href="buyer_order" style={{ color: 'white', padding: '4px 18px', outline: 'none' }}>
            {isBuyerOrder ? <u>PURCHASED ORDERS</u> : 'PURCHASED ORDERS'}
          </Link>
          <Link
            href="seller_order"
            style={{ color: 'white', padding: '4px 18px', outline: 'none' }}
          >
            {isSellerOrder ? <u>SOLD ORDERS</u> : 'SOLD ORDERS'}
          </Link>
        </Links>
      </div>
      <div
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          top: '60px',
          left: '20px',
          right: '20px',
          borderRadius: '5px 5px 0 0',
          padding: '20px'
        }}
      >
        {isListing && <ListingComponent />}
        {isBuyerOrder && <OrderComponent mkplRole="BUYER" />}
        {isSellerOrder && <OrderComponent mkplRole="SELLER" />}
        {isStore && <StoreComponent />}
      </div>

      <div
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          top: '60px',
          left: '20px',
          right: '20px',
          bottom: 0,
          borderRadius: '5px 5px 0 0',
          zIndex: -1
        }}
      />
    </div>
  ) : (
    false
  );
};
