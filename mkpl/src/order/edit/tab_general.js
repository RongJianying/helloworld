/* eslint-disable */
import React, { useState } from 'react';
import { VerticalTable } from 'spark-table';
import { FormInput, Row, Col, FormSelect } from 'spark-form';
import styles from './tab.modules.css';

const impsSelectOptions = [{ label: 'LifeCycle', value: 'LIFECYCLE' }];
const pacingSelectOptions = [
  { label: 'Fast As', value: 'FAST_AS' },
  { label: 'Smooth As', value: 'EVEN' }
];

export const AdditionalOrderInfo = () => {
  const columns = ['First Name', 'Last Name', 'Phone', 'Email Address'];
  const cells = [['Kathy', 'Molsness', '123-456-7890', 'KM@comcacst.com']];
  return (
    <div>
      <h2 style={{ margin: '0.5em' }}>Contacts</h2>
      <Row>
        <Col sm="1/2">
          <p className={styles.text} style={{ margin: '1em 1em 1em 1em' }}>
            Select from MRM User
          </p>
          <FormInput className={styles.searchInput} style={{ margin: '10px', width: '400px' }} />
        </Col>
        <Col sm="1/2" style={{ margin: '10px', width: '400px' }}>
          <p className={styles.text}>Contact Overview</p>
          <VerticalTable columns={columns} cells={cells} />
        </Col>
      </Row>
    </div>
  );
};

export const ListingSetupFunc = ({ order, disabled }) => {
  // const pacing = 'EVEN';
  // const budgetPeriod = 'LIFECYCLE';
  // const budgetGoal = 100;
  let orderInfo = order;
  if (!orderInfo) {
    orderInfo = {};
  }
  const [pacing, setPacing] = useState(orderInfo.pacing || 'EVEN');
  const [budgetPeriod, setBudgetPeriod] = useState(orderInfo.budget_period || 'LIFECYCLE');
  const [budgetGoal, setBudgetGoal] = useState(orderInfo.budget_goal);
  return [
    pacing,
    budgetPeriod,
    budgetGoal,
    () => (
      <Row>
        <Col sm="1/2" style={{ borderRight: '1px solid black' }}>
          <Row>
            <Col sm="2/3" style={{ margin: '1em 1em 5px 30px', padding: '0' }}>
              {orderInfo.schedule}
            </Col>
            <div style={{ margin: '1em 1em 0 1em' }}>View Listing Details</div>
          </Row>
          <Row>
            <h3 style={{ margin: '0 1em 10px 30px' }}>
              <strong>{orderInfo.listing_name}</strong>
            </h3>
          </Row>
          <Row style={{ borderBottomStyle: 'solid', borderBottomWidth: '1px' }}>
            <p style={{ margin: '0 1em 0 30px' }}>{'SELL BY ' + orderInfo.seller_name}</p>
          </Row>
          <Row style={{ marginLeft: '50px' }}>
            <Col sm="1/2">
              <p style={{ margin: '1em' }}>{orderInfo.transaction_type}</p>
            </Col>
            <Col sm="1/2">
              <p>NATIONAL</p>
            </Col>
          </Row>
          <Row>
            <p style={{ margin: '1em', marginLeft: '200px' }}>{orderInfo.volumn + ' IMP AVAILS'}</p>
          </Row>
          <Row>
            <Col sm="1/3">
              <p style={{ margin: '1em' }}>{orderInfo.genre}</p>
            </Col>
            <Col sm="1/3">
              <p>{'$' + orderInfo.price + ' CPM'}</p>
            </Col>
            <Col sm="1/3">
              <p>{orderInfo.platform}</p>
            </Col>
          </Row>
        </Col>
        <Col sm="1/2">
          <h3 style={{ margin: '1.5em 1em 0 1em' }}>
            <strong>{'Acquired Price $' + orderInfo.price + ' CPM'}</strong>
          </h3>
          <h3 style={{ margin: '1em 1em 2em 1em' }}>
            <strong>{'Flighting Date ' + orderInfo.schedule}</strong>
          </h3>
          <Row>
            <Col sm="1/5">
              <p className={styles.text}>Budget Goal</p>
            </Col>
            <Col sm="1/4" style={{ marginRight: '10px' }}>
              <FormInput
                disabled={disabled}
                className={styles.searchInput}
                value={budgetGoal}
                onChange={event => setBudgetGoal(event.target.value)}
              />
            </Col>
            <Col sm="1/6">
              <p className={styles.text}>Imps Per</p>
            </Col>
            <Col sm="1/4">
              <FormSelect
                disabled={disabled}
                // className={styles.searchInput}
                value={budgetPeriod}
                options={impsSelectOptions}
                onChange={value => setBudgetPeriod(value)}
              />
            </Col>
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
    )
  ];
};

export const OrderSummaryFunc = ({ orderSummary, order, disabled }) => {
  const [name, setName] = useState(order.name);
  const [description, setDescription] = useState(order.description);
  const [externalID, setExternalID] = useState(order.externalID);
  // const name = '';
  // const description = '';
  // const externalID = '';
  return [
    name,
    description,
    externalID,
    () => (
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
                  <strong>{orderSummary.Flighting_Date}</strong>
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
              <Col sm="1/10" />
              <Col sm="1/5">
                <p className={styles.text}>Name: </p>
              </Col>
              <Col sm="3/5">
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
              <Col sm="1/10" />
              <Col sm="1/5">
                <p className={styles.text}>Description: </p>
              </Col>
              <Col sm="3/5">
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
              <Col sm="1/10" />
              <Col sm="1/5">
                <p className={styles.text}>External ID: </p>
              </Col>
              <Col sm="3/5">
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
    )
  ];
};

const OrderSummary = ({ order }) => {
  const disabled = false;
  const [name, setName] = useState(order.name);
  const [description, setDescription] = useState(order.description);
  const [externalID, setExternalID] = useState(order.external_id);
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
      <Row>
        <h3 className={styles.legendTitle3}>
          <strong>ORDER IDENTITY</strong>
        </h3>
      </Row>
      <Row>
        <Col sm="1/10" />
        <Col sm="1/5">
          <p className={styles.text}>Name: </p>
        </Col>
        <Col sm="3/5">
          <FormInput
            className={styles.searchInput}
            disabled={disabled}
            placeholder="Test Order Name"
            onChange={event => setName(event.target.value)}
            style={{ width: '300px' }}
            value={name || order.name}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="1/10" />
        <Col sm="1/5">
          <p className={styles.text}>Description: </p>
        </Col>
        <Col sm="3/5">
          <FormInput
            disabled={disabled}
            className={styles.searchInput}
            placeholder="This is a test order description."
            multiline
            onChange={event => setDescription(event.target.value)}
            style={{ width: '300px' }}
            value={description || order.description}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="1/10" />
        <Col sm="1/5">
          <p className={styles.text}>External ID: </p>
        </Col>
        <Col sm="3/5">
          <FormInput
            disabled={disabled}
            className={styles.searchInput}
            placeholder="This is test external id."
            onChange={event => setExternalID(event.target.value)}
            style={{ width: '300px' }}
            value={externalID || order.external_id}
          />
        </Col>
      </Row>
    </div>
  );
};
const ListingSetup = ({ order }) => {
  const disabled = true;
  return (
    <div>
      <h3 style={{ margin: '1.5em 1em 0 1em' }}>
        <strong>{'Acquired Price $' + order.price + ' CPM'}</strong>
      </h3>
      <h3 style={{ margin: '1em 1em 2em 1em' }}>
        <strong>{'Flighting Date ' + order.schedule}</strong>
      </h3>
      <Row>
        <Col sm="1/5">
          <p className={styles.text}>Budget Goal</p>
        </Col>
        <Col sm="1/4" style={{ marginRight: '10px' }}>
          <FormInput
            disabled={disabled}
            className={styles.searchInput}
            value={order.budget_goal}
            // onChange={event => setBudgetGoal(event.target.value)}
          />
        </Col>
        <Col sm="1/6">
          <p className={styles.text}>Imperessions</p>
        </Col>
        {/* <Col sm="1/4">
          <FormSelect
            disabled={disabled}
            // className={styles.searchInput}
            value={order.budget_period}
            options={impsSelectOptions}
            // onChange={value => setBudgetPeriod(value)}
          />
        </Col> */}
      </Row>
      <Row>
        <Col sm="1/5">
          <p className={styles.text}>Pacing</p>
        </Col>
        <Col sm="3/4">
          <FormSelect
            // className={styles.searchInput}
            disabled={disabled}
            value={order.pacing}
            options={pacingSelectOptions}
            // onChange={value => setPacing(value)}
          />
        </Col>
      </Row>
    </div>
  );
};
export const General = ({ data: order }) => {
  // const OrderSummary = ({order}) => {
  //   const disabled = false;
  //   const [name, setName] = useState(order.name);
  //   const [description, setDescription] = useState(order.description);
  //   const [externalID, setExternalID] = useState(order.external_id);
  //   return (
  //     <div
  //       style={{
  //         width: '80%',
  //         margin: '20px auto',
  //         border: '1px solid black',
  //         borderRadius: '10px',
  //         padding: '0px 10px 0px 10px'
  //       }}
  //     >
  //       <Row>
  //         <h3 className={styles.legendTitle3}>
  //           <strong>ORDER IDENTITY</strong>
  //         </h3>
  //       </Row>
  //       <Row>
  //         <Col sm="1/10" />
  //         <Col sm="1/5">
  //           <p className={styles.text}>Name: </p>
  //         </Col>
  //         <Col sm="3/5">
  //           <FormInput
  //             className={styles.searchInput}
  //             disabled={disabled}
  //             placeholder="Test Order Name"
  //             onChange={event => setName(event.target.value)}
  //             style={{ width: '300px' }}
  //             value={name}
  //           />
  //         </Col>
  //       </Row>
  //       <Row>
  //         <Col sm="1/10" />
  //         <Col sm="1/5">
  //           <p className={styles.text}>Description: </p>
  //         </Col>
  //         <Col sm="3/5">
  //           <FormInput
  //             disabled={disabled}
  //             className={styles.searchInput}
  //             placeholder="This is a test order description."
  //             multiline
  //             onChange={event => setDescription(event.target.value)}
  //             style={{ width: '300px' }}
  //             value={description}
  //           />
  //         </Col>
  //       </Row>
  //       <Row>
  //         <Col sm="1/10" />
  //         <Col sm="1/5">
  //           <p className={styles.text}>External ID: </p>
  //         </Col>
  //         <Col sm="3/5">
  //           <FormInput
  //             disabled={disabled}
  //             className={styles.searchInput}
  //             placeholder="This is test external id."
  //             onChange={event => setExternalID(event.target.value)}
  //             style={{ width: '300px' }}
  //             value={externalID}
  //           />
  //         </Col>
  //       </Row>
  //     </div>
  //   );
  // };
  // const ListingSetup = ({order}) => {
  //   const disabled = true;
  //   return (
  //     <div>
  //       <h3 style={{ margin: '1.5em 1em 0 1em' }}>
  //         <strong>{'Acquired Price $' + order.price + ' CPM'}</strong>
  //       </h3>
  //       <h3 style={{ margin: '1em 1em 2em 1em' }}>
  //         <strong>{'Flighting Date ' + order.schedule}</strong>
  //       </h3>
  //       <Row>
  //         <Col sm="1/5">
  //           <p className={styles.text}>Budget Goal</p>
  //         </Col>
  //         <Col sm="1/4" style={{ marginRight: '10px' }}>
  //           <FormInput
  //             disabled={disabled}
  //             className={styles.searchInput}
  //             value={order.budget_goal}
  //             // onChange={event => setBudgetGoal(event.target.value)}
  //           />
  //         </Col>
  //         <Col sm="1/6">
  //           <p className={styles.text}>Imperessions</p>
  //         </Col>
  //         {/* <Col sm="1/4">
  //           <FormSelect
  //             disabled={disabled}
  //             // className={styles.searchInput}
  //             value={order.budget_period}
  //             options={impsSelectOptions}
  //             // onChange={value => setBudgetPeriod(value)}
  //           />
  //         </Col> */}
  //       </Row>
  //       <Row>
  //         <Col sm="1/5">
  //           <p className={styles.text}>Pacing</p>
  //         </Col>
  //         <Col sm="3/4">
  //           <FormSelect
  //             // className={styles.searchInput}
  //             disabled={disabled}
  //             value={order.pacing}
  //             options={pacingSelectOptions}
  //             // onChange={value => setPacing(value)}
  //           />
  //         </Col>
  //       </Row>
  //     </div>
  //   );
  // };

  return (
    <div>
      <OrderSummary order={order} />
      <div
        style={{
          width: '80%',
          margin: '20px auto',
          border: '1px solid black',
          borderRadius: '10px',
          padding: '0px 10px 0px 10px'
        }}
      >
        <ListingSetup order={order} />
      </div>
      {/* <div
        style={{
          width: '80%',
          margin: '20px auto',
          border: '1px solid black',
          borderRadius: '10px',
          padding: '0px 10px 0px 10px'
        }}
      >
        <AdditionalOrderInfo />
      </div> */}
    </div>
  );
};

export default General;
