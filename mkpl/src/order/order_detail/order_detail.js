// import React, { useState } from 'react';
// import { FormInput, Row, Col, Button } from 'spark-form';
// import { Tab, TabItem } from 'spark-navigation';
// // import { useState } from 'react';
// import { CommonStyles } from 'spark-styles';
// import classNames from 'classnames';
// import {
//   // ListingSetupRes,
//   AdditionalOrderInfoRes
// } from '../create_order_no_model/components/create_order_component';
// import Styles from './order_detail.modules.css';
// import Styles1 from './1.modules.css';
// import Styles2 from './2.modules.css';
// import Styles3 from './3.modules.css';

// const TABS = ['General', 'Standard Attributes', 'Insights'];

// function isActiveTab(tab, activeTab) {
//   return tab === activeTab;
// }

// const CreateComponentReadonly = ({ order }) => {
//   const orderSummary = {
//     Flighting_Date: '01/01/2020-12/31/2020',
//     Gross_Cost: '$225,000'
//   };
//   return (
//     <div style={{ width: '80%', margin: '20px auto' }}>
//       <Row style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid' }}>
//         <Col sm="4/5">
//           <h2 style={{ margin: '0.5em 0 0.5em 0' }}>
//             Review Your Market Order
//           </h2>
//         </Col>
//       </Row>
//       <Row style={{ borderBottom: '1px solid black' }}>
//         <Col sm="1/2" style={{ borderRight: '1px solid black' }}>
//           <h3 style={{ margin: '1em' }}>
//             <strong>ORDER SUMMARY</strong>
//           </h3>
//           <Row>
//             <Col sm="1/2">
//               <p style={{ marginLeft: '1em' }}>
//                 <strong>Flighting Date</strong>
//               </p>
//             </Col>
//             <Col sm="1/2">
//               <p>
//                 <strong>Gross Cost</strong>
//               </p>
//             </Col>
//           </Row>
//           <Row>
//             <Col sm="1/2">
//               <p style={{ marginLeft: '1em' }}>
//                 <strong>{orderSummary.Flighting_Date}</strong>
//               </p>
//             </Col>
//             <Col sm="1/2">
//               <p>
//                 <strong>{orderSummary.Gross_Cost}</strong>
//               </p>
//             </Col>
//           </Row>
//         </Col>
//         <Col sm="1/2">
//           <h3 className={Styles.legendTitle3}>
//             <strong>ORDER IDENTITY</strong>
//           </h3>
//           <Row>
//             <Col sm="1/5">
//               <p className={Styles.text}>Name: </p>
//             </Col>
//             <Col sm="4/5">
//               <FormInput
//                 className={Styles.searchInput}
//                 // disabled={true}
//                 placeholder="Test Order Name"
//                 // onChange={event => setName(event.target.value)}
//                 style={{ width: '300px' }}
//                 value={order.name}
//               />
//             </Col>
//           </Row>
//           <Row>
//             <Col sm="1/5">
//               <p className={Styles.text}>Description: </p>
//             </Col>
//             <Col sm="4/5">
//               <FormInput
//                 // disabled={true}
//                 className={Styles.searchInput}
//                 placeholder="This is a test order description."
//                 multiline
//                 // onChange={event => setDescription(event.target.value)}
//                 style={{ width: '300px' }}
//                 value={order.description}
//               />
//             </Col>
//           </Row>
//           <Row>
//             <Col sm="1/5">
//               <p className={Styles.text}>External ID: </p>
//             </Col>
//             <Col sm="4/5">
//               <FormInput
//                 // disabled={true}
//                 className={Styles.searchInput}
//                 placeholder="This is test external id."
//                 // onChange={event => setExternalID(event.target.value)}
//                 style={{ width: '300px' }}
//                 value={order.external_id}
//               />
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// const BackToList = () => (
//   <Button className={Styles3.navBack} to="">
//     <div>⇽ Back to list</div>
//   </Button>
// );

// const StandardAttr = () => {
//   return (
//     <div>
//       <Row className={Styles2.header}>
//         <p className={Styles2.headerName}>Test Order Name</p>
//       </Row>
//       <Row className={Styles1.toolHeader}>
//         <Col sm="1/5">
//           <p className={Styles.detailHeader}>Geo</p>
//         </Col>
//         <Col sm="1/5">
//           <p className={Styles.detailHeader}>Platform</p>
//         </Col>
//         <Col sm="1/5">
//           <p className={Styles.detailHeader}>Content Duration</p>
//         </Col>
//         <Col sm="1/5">
//           <p className={Styles.detailHeader}>Content Rating</p>
//         </Col>
//         <Col sm="1/5">
//           <p className={Styles.detailHeader}>Language</p>
//         </Col>
//       </Row>

//       <Row>
//         <Col sm="1/5">
//           <p className={Styles3.legendTitle2}>US</p>
//         </Col>
//         <Col sm="1/5">
//           <p className={Styles3.legendTitle2}>Mobile</p>
//         </Col>
//         <Col sm="1/5">
//           <p className={Styles3.legendTitle2}>30s</p>
//         </Col>
//         <Col sm="1/5">
//           <p className={Styles3.legendTitle2}>S</p>
//         </Col>
//         <Col sm="1/5">
//           <p className={Styles3.legendTitle2}>Eng</p>
//         </Col>
//       </Row>

//       <Row className={Styles1.toolHeader}>
//         <Col sm="1/5">
//           <p className={Styles.detailHeader}>Brand / Channel</p>
//         </Col>
//         <Col sm="1/5">
//           <p className={Styles.detailHeader}>Genre</p>
//         </Col>
//         <Col sm="1/5">
//           <p className={Styles.detailHeader}>On/Off-Domain</p>
//         </Col>
//         <Col sm="1/5">
//           <p className={Styles.detailHeader}>Stream Type</p>
//         </Col>
//         <Col sm="1/5">
//           <p className={Styles.detailHeader}>IP Enabled</p>
//         </Col>
//       </Row>

//       <Row>
//         <Col sm="1/5">
//           <p className={Styles3.legendTitle2}>COKO</p>
//         </Col>
//         <Col sm="1/5">
//           <p className={Styles3.legendTitle2}>H</p>
//         </Col>
//         <Col sm="1/5">
//           <p className={Styles3.legendTitle2}>Off</p>
//         </Col>
//         <Col sm="1/5">
//           <p className={Styles3.legendTitle2}>A</p>
//         </Col>
//         <Col sm="1/5">
//           <p className={Styles3.legendTitle2}>Y</p>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// const Insights = () => {
//   return <div />;
// };

// const listingSetup = order => {
//   return () => (
//     <Row
//       style={{
//         borderStyle: 'solid',
//         borderWidth: '1px',
//         margin: '10px',
//         borderRadius: '5px'
//       }}
//     >
//       <Col sm="1/2" style={{ borderRight: '1px solid black' }}>
//         <Row>
//           <Col sm="2/3" style={{ margin: '1em 1em 5px 30px', padding: '0' }}>
//             {order.schedule}
//           </Col>
//           <div style={{ margin: '1em 1em 0 1em' }}>View Listing Details</div>
//         </Row>
//         <Row>
//           <h3 style={{ margin: '0 1em 10px 30px' }}>
//             <strong>{order.listing_name}</strong>
//           </h3>
//         </Row>
//         <Row style={{ borderBottomStyle: 'solid', borderBottomWidth: '1px' }}>
//           <p style={{ margin: '0 1em 0 30px' }}>
//             {'SELL BY ' + order.seller_name}
//           </p>
//         </Row>
//         <Row style={{ marginLeft: '50px' }}>
//           <Col sm="1/2">
//             <p style={{ margin: '1em' }}>{order.transaction_type}</p>
//           </Col>
//           <Col sm="1/2">
//             <p>NATIONAL</p>
//           </Col>
//         </Row>
//         <Row>
//           <p style={{ margin: '1em', marginLeft: '200px' }}>
//             {order.volumn + ' IMP AVAILS'}
//           </p>
//         </Row>
//         <Row>
//           <Col sm="1/3">
//             <p style={{ margin: '1em' }}>{order.genre}</p>
//           </Col>
//           <Col sm="1/3">
//             <p>{'$' + order.price + ' CPM'}</p>
//           </Col>
//           <Col sm="1/3">
//             <p>{order.platform}</p>
//           </Col>
//         </Row>
//       </Col>
//       <Col sm="1/2">
//         <h3 style={{ margin: '1.5em 1em 0 1em' }}>
//           <strong>{'Acquired Price $' + order.price + ' CPM'}</strong>
//         </h3>
//         <h3 style={{ margin: '1em 1em 2em 1em' }}>
//           <strong>{'Flighting Date ' + order.schedule}</strong>
//         </h3>
//         <Row>
//           <Col sm="1/5">
//             <p className={Styles.text}>Budget Goal</p>
//           </Col>
//           <Col sm="1/4">
//             <FormInput
//               disabled={true}
//               className={Styles.searchInput}
//               value={order.budget_goal}
//               onChange={event => setBudgetGoal(event.target.value)}
//             />
//           </Col>
//           <Col sm="1/6">
//             <p className={Styles.text}>Imps Per</p>
//           </Col>
//           <Col sm="1/4">
//             <FormInput
//               disabled={true}
//               className={Styles.searchInput}
//               value={order.budget_period}
//               onChange={value => setBudgetPeriod(value)}
//             />
//           </Col>
//         </Row>
//         <Row>
//           <Col sm="1/5">
//             <p className={Styles.text}>Pacing</p>
//           </Col>
//           <Col sm="3/4">
//             <FormInput
//               className={Styles.searchInput}
//               disabled={true}
//               value={order.pacing}
//               onChange={value => setPacing(value)}
//             />
//           </Col>
//         </Row>
//       </Col>
//     </Row>
//   );
// };

// const OrderDetail = () => {
//   const order = {
//     name: 'test',
//     description: 'text description',
//     external_id: '123',
//     budget_goal: '10000',
//     pacing: 'EVEN',
//     budget_model: 'IMPRESSION',
//     budget_period: 'LIFECYCLE',
//     price: 15,
//     price_mode: 'FIXED',
//     seller_name: 'VENDOR-BRAND-CHANNEL',
//     listing_name: 'Listing 1',
//     schedule: '01/01/2020-12/31/2020',
//     transaction_type: 'GUARANTEE',
//     volumn: 15000000,
//     genre: 'COMEDY',
//     platform: ['CTV', 'MOBILE']
//   };
//   const [activeTab, setActiveTab] = useState('Listing Setup');
//   const AdditionalOrderInfo = AdditionalOrderInfoRes();
//   const ListingSetup = listingSetup(order);

//   return (
//     <div>
//       <BackToList />
//       <div
//         style={{
//           backgroundColor: 'rgba(150,150,150,0.2)',
//           borderRadius: '5px 5px 0 0'
//         }}
//       >
//         <Row className={Styles2.header}>
//           <p className={Styles2.headerName}>Test Order Name</p>
//         </Row>
//         <Row className={Styles1.toolHeader}>
//           <Col sm="1/4">
//             <p className={Styles.detailHeader}>Status</p>
//           </Col>
//           <Col sm="1/4">
//             <p className={Styles.detailHeader}>Transaction Type</p>
//           </Col>
//           <Col sm="1/4">
//             <p className={Styles.detailHeader}>Listing ID</p>
//           </Col>
//           <Col sm="1/4">
//             <p className={Styles.detailHeader}>Flighting Date</p>
//           </Col>
//         </Row>

//         <Row>
//           <Col sm="1/4">
//             <p className={Styles3.legendTitle2}>Approved</p>
//           </Col>
//           <Col sm="1/4">
//             <p className={Styles3.legendTitle2}>Guaranteed</p>
//           </Col>
//           <Col sm="1/4">
//             <p className={Styles3.legendTitle2}>123</p>
//           </Col>
//           <Col sm="1/4">
//             <p className={Styles3.legendTitle2}>{'3 oct 2019 > 31 oct 2019'}</p>
//           </Col>
//         </Row>
//       </div>
//       <div className={CommonStyles.clearfix}>
//         <Tab className={Styles2.tabs}>
//           {TABS.map(tab => (
//             <TabItem
//               className={classNames(
//                 Styles2.tab,
//                 isActiveTab(tab, activeTab) && Styles2.active
//               )}
//               key={tab}
//               active={isActiveTab(tab, activeTab)}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab}
//             </TabItem>
//           ))}
//         </Tab>
//         {activeTab === 'General' && <CreateComponentReadonly order={order} />}
//         {activeTab === 'General' && (
//           <div style={{ width: '80%', margin: '20px auto' }}>
//             <ListingSetup />
//           </div>
//         )}
//         {activeTab === 'General' && (
//           <div style={{ width: '80%', margin: '20px auto' }}>
//             <AdditionalOrderInfo />
//           </div>
//         )}
//         {activeTab === 'Standard Attributes' && <StandardAttr />}
//         {activeTab === 'Insights' && <Insights />}
//       </div>
//     </div>
//   );
// };

// export default OrderDetail;
