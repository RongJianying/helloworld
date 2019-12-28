/* eslint-disable */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './edit.modules.css';
import { Link } from 'react-router';
import { useRouterState } from '../navigation';
import { useJsonApi } from '../../../lib/utils';
import SellerDetail from './tab_seller_detail';
import General from './tab_general';
import Insights from './tab_insights';
import SA from './tab_sa';
import { useFetchResource } from 'spark-fetch';
import { useHandleGlobalException } from 'spark-global-exception';

// TODO: add style for the back icon per mockup, there should be an icon symbol replaced for.
const BackToList = ({ targetHref }) => (
  <Link className={styles.navBack} to={targetHref}>
    <div>⇽ Back to order list</div>
  </Link>
);

const basicInfoTitles = ['STATUS', 'TRANSACTION TYPE', 'ORDER ID'];
const titlesMap = {
  STATUS: {
    fieldKey: 'status',
    colWidth: '15%'
  },
  'TRANSACTION TYPE': {
    fieldKey: 'transaction_type',
    colWidth: '20%'
  },
  'ORDER ID': {
    fieldKey: 'order_id',
    colWidth: '20%'
  }
};

const BasicInfo = ({ data }) => {
  const d = {
    status: data.status,
    transaction_type: data.budget_period,
    order_id: data.id
  };
  return (
    <table className={styles.infoTable}>
      <colgroup>
        {basicInfoTitles.map(title => (
          <col key={title} style={{ width: titlesMap[title].colWidth }} />
        ))}
      </colgroup>
      <tbody>
        <tr>
          {basicInfoTitles.map(title => (
            <th key={title} align="left" className={styles.infoTitle}>
              {title}
            </th>
          ))}
        </tr>
        <tr>
          {basicInfoTitles.map(title => (
            <td
              key={title}
              align="left"
              className={title === 'STATUS' ? styles.statusInfoContent : styles.infoContent}
            >
              {d[titlesMap[title].fieldKey]}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

const tabs = [
  'general'
  // 'standard_attributes', 'seller_detail', 'insights'
];
const tabNameMap = {
  general: 'General',
  standard_attributes: 'SA',
  seller_detail: 'Seller Detail',
  insights: 'Insights'
};

const Body = ({ tab, data }) => {
  return (
    <React.Fragment>
      {tab === 'general' && <General data={data} onSubmit={() => {}} />}
      {tab === 'standard_attributes' && <SA data={data} onSubmit={() => {}} />}
      {tab === 'seller_detail' && <SellerDetail data={data} onSubmit={() => {}} />}
      {tab === 'insights' && <Insights data={data} onSubmit={() => {}} />}
    </React.Fragment>
  );
};

export const OrderEdit = () => {
  const [isLoading, doFetch] = useJsonApi();
  const [message, setMessage] = useState(null);
  const [serviceData, setServiceData] = useState({});
  const fetchResource = useFetchResource();
  const handleGlobalException = useHandleGlobalException();

  // TODO: currently below used as mocked data
  const role = 'BUYER';
  const routerCtx = useRouterState();
  const { params: routerParams } = routerCtx();
  const params = {
    tab: routerParams.tab,
    id: routerParams.id,
    data: { data: serviceData }
  };

  function fetchOrderDetail() {
    doFetch(
      () =>
        fetchResource(
          'order.detail',
          { id: params.id, role },
          {
            headers: {
              'x-freewheel-network-id': 1751328505,
              'x-freewheel-user-id': 11
            }
          }
        ),
      result => {
        const { data, warning } = result;
        setServiceData(data);
        const msg = warning && warning.msg;
        setMessage(msg);
      },
      error => {
        handleGlobalException(error);
      }
    );
  }

  useEffect(() => {
    fetchOrderDetail();
  }, [params.id]);

  const { data } = params;
  // const isLoading = false;
  const targetHref = `/app/1/mkpl/buyer_order`;

  return (
    <div style={{ opacity: isLoading ? 0.5 : 1 }}>
      <div className={styles.editPageHeader}>
        <div className={styles.header}>
          <BackToList targetHref={targetHref} />
          <div className={styles.headerName}>order detail</div>
        </div>
        {data && <BasicInfo data={data.data} />}
        <div className={styles.tabs}>
          {tabs.map(t => {
            return (
              <Link key={t} to={`${targetHref}/1/edit/${t.toLowerCase()}`}>
                <div className={classNames(styles.tab, params.tab === t && styles.active)}>
                  {tabNameMap[t]}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Body tab={params.tab} data={data ? data.data : undefined} />
    </div>
  );
};

export default OrderEdit;
