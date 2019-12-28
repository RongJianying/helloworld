/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { FormInput, Row, Col, Button, FormSelect } from 'spark-form';
import { Link } from 'react-router';
import { useFetchResource } from 'spark-fetch';
import classNames from 'classnames';
import { useRouterState } from '../../navigation';
import styles from '../edit.modules.css';
import { useJsonApi } from '../../../../lib/utils';
import { useHandleGlobalException } from 'spark-global-exception';

const tabs = [
  'listing_setup'
  // 'additional_order_info'
];
const tabNameMap = {
  listing_setup: 'Listing Setup',
  additional_order_info: 'Additional Order Info'
};

const pacingMap = {
  EVEN: 0
};
const priceModeMap = {
  FIXED: 0
};
const budgetModelMap = {
  IMPRESSION: 0
};
const budgetPeriodMap = {
  LIFECYCLE: 0
};

// const columns = ['First Name', 'Last Name', 'Phone', 'Email Address'];
// const cells = [['Kathy', 'Molsness', '123-456-7890', 'KM@comcacst.com']];

const impsSelectOptions = [
  {
    label: 'LifeCycle',
    value: 'LIFECYCLE'
  }
];
const pacingSelectOptions = [
  // { label: 'Fast As', value: 'FAST_AS' },
  {
    label: 'Smooth As',
    value: 'EVEN'
  }
];

const OrderSummaryComponent = ({
  data,
  name,
  setName,
  description,
  setDescription,
  externalID,
  setExternalID
}) => {
  const disabled = false;
  // const [name, setName] = useState(null);
  // const [description, setDescription] = useState(null);
  // const [externalID, setExternalID] = useState(null);
  return (
    <div
      style={{
        width: '80%',
        margin: '20px auto',
        border: '1px solid black',
        borderRadius: '10px',
        padding: '0px 10px 0px 10px'
      }}
    >
      <Row
        style={{
          padding: '10px',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid'
        }}
      >
        <Col sm="4/5">
          <h2 style={{ margin: '0.5em 0 0.5em 0' }}>Review Your Market Order</h2>
        </Col>
      </Row>
      <Row>
        <Col sm="1/2" style={{ borderRight: '1px solid black' }}>
          <h3 className={styles.legendTitle3} style={{ margin: '1em' }}>
            <strong>ORDER SUMMARY</strong>
          </h3>
          <Row>
            <Col sm="1/2">
              <p style={{ marginLeft: '1em', textAlign: 'center' }}>
                <strong>Flighting Date</strong>
              </p>
            </Col>
            <Col sm="1/2">
              <p style={{ marginLeft: '1em', textAlign: 'center' }}>
                <strong>Gross Cost</strong>
              </p>
            </Col>
          </Row>
          <Row>
            <Col sm="1/2">
              <p style={{ marginLeft: '1em', textAlign: 'center' }}>
                <strong>
                  {data.start_time &&
                    data.start_time.substring(0, 10) + ' - ' + data.end_time.substring(0, 10)}
                </strong>
              </p>
            </Col>
            <Col sm="1/2">
              <p style={{ marginLeft: '1em', textAlign: 'center' }}>
                <strong>{orderSummary.Gross_Cost}</strong>
              </p>
            </Col>
          </Row>
        </Col>
        <Col sm="1/2">
          <h3 className={styles.legendTitle3}>
            <strong>ORDER IDENTITY</strong>
          </h3>
          <Row>
            <Col sm="1/3">
              <p className={styles.text} style={{ marginLeft: '3em' }}>
                Name:
              </p>
            </Col>
            <Col sm="2/3">
              <FormInput
                className={styles.searchInput}
                disabled={disabled}
                placeholder="Test Order Name"
                onChange={event => setName(event.target.value)}
                style={{ width: '300px' }}
                value={name}
              />
            </Col>
          </Row>
          <Row>
            <Col sm="1/3">
              <p className={styles.text} style={{ marginLeft: '3em' }}>
                Description:
              </p>
            </Col>
            <Col sm="2/3">
              <FormInput
                disabled={disabled}
                className={styles.searchInput}
                placeholder="This is a test order description."
                multiline
                onChange={event => setDescription(event.target.value)}
                style={{ width: '300px' }}
                value={description}
              />
            </Col>
          </Row>
          <Row>
            <Col sm="1/3">
              <p className={styles.text} style={{ marginLeft: '3em' }}>
                External ID:
              </p>
            </Col>
            <Col sm="2/3">
              <FormInput
                disabled={disabled}
                className={styles.searchInput}
                placeholder="This is test external id."
                onChange={event => setExternalID(event.target.value)}
                style={{ width: '300px' }}
                value={externalID}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
  // [
  //   name,
  //   description,
  //   externalID,
  //   () =>
  // ]
};

const ListingSetupComponent = ({
  data,
  pacing,
  setPacing,
  budgetGoal,
  setBudgetGoal,
  budgetPeriod,
  setBudgetPeriod
}) => {
  const disabled = false;
  const listing = {
    price: data.price,
    price_mode: data.price_mode,
    seller_name: data.seller_name,
    listing_name: data.name,
    schedule:
      data.start_time && data.start_time.substring(0, 10) + ' - ' + data.end_time.substring(0, 10),
    transaction_type: 'GUARANTEE',
    volumn: 15000000,
    genre: 'COMEDY',
    platform: ['CTV', 'MOBILE'],
    Gross_Cost: '225000'
  };
  return (
    <Row>
      <Col sm="1/2" style={{ borderRight: '1px solid black' }}>
        <Row>
          <Col sm="1/2">
            <h3 style={{ margin: '1em 1em 10px 10px' }}>
              <strong>{listing.listing_name}</strong>
            </h3>
          </Col>
          <Col sm="1/2">
            <div style={{ margin: '1em 1em 0 10px', textAlign: 'right' }}>View Listing Details</div>
          </Col>
        </Row>
        <Row style={{ borderBottomStyle: 'solid', borderBottomWidth: '1px' }}>
          <p style={{ margin: '0 1em 15px 15px' }}>{'SELL BY ' + listing.seller_name}</p>
        </Row>

        <Row style={{ margin: '15px 0px 0px 50px' }}>
          <Col sm="1/2">
            <p style={{ margin: '1em' }}>{listing.transaction_type}</p>
          </Col>
          <Col sm="1/2">
            <p>NATIONAL</p>
          </Col>
        </Row>
        <Row>
          <p style={{ margin: '1em', marginLeft: '200px' }}>{listing.volumn + ' IMP AVAILS'}</p>
        </Row>
        <Row>
          <Col sm="1/3">
            <p style={{ margin: '1em' }}>{listing.genre}</p>
          </Col>
          <Col sm="1/3">
            <p>{'$' + listing.price + ' CPM'}</p>
          </Col>
          <Col sm="1/3">
            <p>{listing.platform}</p>
          </Col>
        </Row>
      </Col>
      <Col sm="1/2">
        <h3 style={{ margin: '1.5em 1em 0 1em' }}>
          <strong>{'Acquired Price $' + listing.price + ' CPM'}</strong>
        </h3>
        <h3 style={{ margin: '1em 1em 2em 1em' }}>
          <strong>{'Flighting Date ' + listing.schedule}</strong>
        </h3>
        <Row>
          <Col sm="2/5" style={{ width: '130px', marginRight: '0px', textAlign: 'center' }}>
            <div
              className={styles.text}
              style={{
                marginTop: '15px',
                marginLeft: '-5px'
              }}
            >
              Budget Goal
            </div>
          </Col>
          <Col sm="2/5" style={{ marginRight: '10px' }}>
            <FormInput
              disabled={disabled}
              className={styles.searchInput}
              value={budgetGoal}
              onChange={event => setBudgetGoal(event.target.value)}
            />
          </Col>
          <Col sm="1/5">
            <p className={styles.text}>Impressions</p>
          </Col>
          {/* <Col sm="1/4">
              <FormSelect
                disabled={disabled}
                // className={styles.searchInput}
                value={budgetPeriod}
                options={impsSelectOptions}
                onChange={value => setBudgetPeriod(value)}
              />
            </Col> */}
        </Row>
        <Row>
          <Col sm="1/5">
            <p className={styles.text}>Pacing</p>
          </Col>
          <Col sm="3/4">
            <FormSelect
              className={styles.searchInput}
              disabled={disabled}
              value={pacing}
              options={pacingSelectOptions}
              onChange={value => setPacing(value)}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
  // [
  //   pacing,
  //   budgetPeriod,
  //   budgetGoal,
  //   () =>
  // ]
};

const orderSummary = {
  Flighting_Date: '01/01/2020-12/31/2020',
  Gross_Cost: '$225,000'
};

const Body = ({
  data,
  isLoading,
  tab,
  pacing,
  setPacing,
  budgetGoal,
  setBudgetGoal,
  budgetPeriod,
  setBudgetPeriod
}) => {
  // const ListingSetup = listing_component;
  return (
    <React.Fragment>
      <div style={{ opacity: isLoading ? 0.5 : 1 }}>
        {tab === 'listing_setup' && (
          <div
            style={{
              width: '80%',
              margin: '20px auto',
              border: '1px solid black',
              borderRadius: '10px',
              padding: '0px 10px 0px 10px'
            }}
          >
            <ListingSetupComponent
              data={data}
              pacing={pacing}
              setPacing={setPacing}
              budgetGoal={budgetGoal}
              setBudgetGoal={setBudgetGoal}
              budgetPeriod={budgetPeriod}
              setBudgetPeriod={setBudgetPeriod}
            />
          </div>
        )}
        {tab === 'additional_order_info' && (
          <div
            style={{
              width: '80%',
              margin: '20px auto',
              border: '1px solid black',
              borderRadius: '10px',
              padding: '0px 10px 0px 10px'
            }}
          >
            <Additionalorder />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

const CreateOrderNoModelComponent = () => {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [externalID, setExternalID] = useState(null);

  const [pacing, setPacing] = useState('EVEN');
  const [budgetPeriod, setBudgetPeriod] = useState('LIFECYCLE');
  const [budgetGoal, setBudgetGoal] = useState(null);

  const [listingData, setListingData] = useState({});
  const [isLoading, doFetch] = useJsonApi();
  const handleGlobalException = useHandleGlobalException();

  const routerCtx = useRouterState();
  const { params: routerParams } = routerCtx();
  const params = {
    tab: routerParams.tab,
    listing_id: routerParams.listing_id
  };

  let data = {};
  if (listingData && listingData.items) {
    for (let i = 0; i < listingData.items.length; i++) {
      if (listingData.items[i].id + '' === params.listing_id) {
        data = listingData.items[i];
        break;
      }
    }
  }

  function fetchListing() {
    doFetch(
      () => fetchResource('fetch.listing'),
      result => {
        const { data } = result;
        setListingData(data);
      },
      error => {
        handleGlobalException(error);
      }
    );
  }

  useEffect(() => {
    fetchListing();
  }, [params.listing_id]);

  const targetHref = `/app/1/mkpl/buyer_order`;
  const fetchResource = useFetchResource();

  return (
    <div
      style={{
        width: '80%',
        margin: '20px auto'
      }}
    >
      <Row
        style={{
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid'
        }}
      >
        <Col sm="4/5">
          <h2
            style={{
              margin: '0.5em 0 0.5em 0'
            }}
          >
            Review Your Market Order
          </h2>
        </Col>
        <div
          style={{
            marginTop: '1em',
            float: 'right'
          }}
        >
          <Button> Cancel </Button>
          <Button
            // type="primary"
            className={styles.button}
            onClick={() => {
              fetchResource(
                'order.create',
                {},
                {
                  headers: {
                    'x-freewheel-network-id': 1751328505,
                    'x-freewheel-user-id': 315773924
                  },
                  body: JSON.stringify({
                    data: {
                      name,
                      description,
                      external_id: externalID,
                      seller_network_id: 11575,
                      buyer_network_id: 1751328505,
                      price: data.price,
                      price_mode: priceModeMap[data.price_mode],
                      pacing: pacingMap[pacing],
                      budget_model: budgetModelMap['IMPRESSION'],
                      budgetPeriod: budgetPeriodMap['LIFECYCLE'],
                      budgetGoal,
                      start_time: data.start_time,
                      end_time: data.end_time,
                      buyer_contact_user_id: 12345,
                      listing_assignments: [
                        {
                          seller_listing_id: data.id
                        }
                      ]
                    }
                  })
                }
              )
                .then(() => {
                  window.location.href = 'http://localhost:9010/app/1/mkpl/buyer_order';
                })
                .catch(() => {});
            }}
          >
            Place the order
          </Button>
        </div>
      </Row>
      <div>
        <OrderSummaryComponent
          data={data}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          externalID={externalID}
          setExternalID={setExternalID}
        />
      </div>
      <div className={styles.tabs}>
        {tabs.map(t => {
          return (
            <Link key={t} to={`${targetHref}/create/${params.listing_id}/${t.toLowerCase()}`}>
              <div className={classNames(styles.tab, params.tab === t && styles.active)}>
                {tabNameMap[t]}
              </div>
            </Link>
          );
        })}
      </div>
      <Body
        data={data}
        isLoading={isLoading}
        tab={params.tab}
        pacing={pacing}
        setPacing={setPacing}
        budgetGoal={budgetGoal}
        setBudgetGoal={setBudgetGoal}
        budgetPeriod={budgetPeriod}
        setBudgetPeriod={setBudgetPeriod}
      />
    </div>
  );
};

export default CreateOrderNoModelComponent;
