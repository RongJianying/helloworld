/* eslint-disable */
import React, { useState } from 'react';
import { SearchOperators as Operators } from 'spark-search';
import { SegmentGroup, Segment } from 'spark-form';

import { useFetchResourceData } from 'spark-fetch';
import { trim } from 'lodash';
import { GridFooter, GridPagination } from 'spark-raw-grid';

import { useDebouncedValue } from './utils';
import OrderListTable from './order_list_table';
import Styles from './order_list.modules.css';

const { EQ, MATCH } = Operators;

const TABS = [
  'PENDING',
  'REJECTED',
  'APPROVED',
  'IN_FLIGHT',
  'CANCELLED',
  'COMPLETED'
];

export const toQueryParams = search => {
  const queries = [];
  const s = trim(search);
  if (s.length !== 0) {
    queries.push({
      key: 'name',
      operator: MATCH,
      value: s
    });

    if (parseInt(search, 10)) {
      queries.push({
        key: 'id',
        operator: EQ,
        value: s
      });
    }
  }

  return {
    search: {
      filter: [],
      queries,
      queryMatch: 'ANY'
    }
  };
};

const useFetchOrderData = search => {
  const queryParams = React.useMemo(() => toQueryParams(search), [search]);
  const q = useDebouncedValue(queryParams);

  return useFetchResourceData('order.list', q, {
    headers: {
      'x-freewheel-network-id': 1751328505,
      'x-freewheel-user-id': 315773924
    }
  });
};

const Input = props => {
  return <input className={Styles.searchInput} {...props} />;
};
const SearchComponent = ({ search, onSearchChange }) => {
  return (
    <div>
      <Input
        value={search}
        placeholder="Search by ID or Name..."
        onChange={e => onSearchChange(e.target.value)}
      />
    </div>
  );
};

const flattenData = result => {
  const lines = {
    PENDING: [],
    REJECTED: [],
    APPROVED: [],
    IN_FLIGHT: [],
    CANCELLED: [],
    COMPLETED: []
  };
  const data = result ? result.data : {};
  if (data && data.items) {
    data.items.forEach(order => {
      order.lines.forEach(line => {
        lines[line.status].push({
          ...line,
          price: 15,
          orderInfo: {
            orderId: order.id,
            orderName: order.name
          }
        });
      });
    });
  }
  if (lines.REJECTED.length > 0) {
    lines.REJECTED[0].avails = 1200;
  }
  return lines;
};

const OrderList = () => {
  const [activetab, setActiveTab] = useState('PENDING');
  const [search, setSearch] = useState('');
  const { data } = useFetchOrderData(search);
  const [perPage, setPerPage] = useState(20);
  // const [page, setPage] = useState(data.data.page);
  const lines = flattenData(data);

  // console.log(search);
  // if (!isLoading) {
  // }

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.left}>
        <div
          style={{ height: '150px', marginLeft: '10px', borderBottom: 'solid' }}
        >
          <p style={{ fontSize: '18px' }}>FILTERS & SEARCHES</p>
          <SearchComponent search={search} onSearchChange={setSearch} />
        </div>
        <p style={{ fontSize: '18px', marginLeft: '10px' }}>STATUS</p>
        <SegmentGroup
          style={{
            width: '100%',
            marginTop: '15px',
            fontSize: '14px',
            paddingRight: '0px'
          }}
        >
          {TABS.map(tab => (
            <Segment
              key={tab}
              label={tab + '   (' + lines[tab].length + ')'}
              value={tab}
              selected={tab === activetab}
              onChange={() => setActiveTab(tab)}
            />
          ))}
        </SegmentGroup>
      </div>

      <div className={Styles.right}>
        <div style={{ textAlign: 'right', fontSize: '15px' }}>
          <p> View Order Insights</p>
        </div>
        <OrderListTable orders={lines[activetab]} />
        <GridFooter>
          <GridPagination
            page="1"
            total={lines[activetab].length}
            perPage={perPage}
            onPerPageChange={setPerPage}
            onPageChange={() => null}
          />
        </GridFooter>
      </div>
    </div>
  );
};

export default OrderList;
