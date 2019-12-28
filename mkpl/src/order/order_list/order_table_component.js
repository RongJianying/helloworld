import { useState, useContext, useEffect } from 'react';
import { DataTable } from 'spark-table';
import { useFetchResource } from 'spark-fetch';
import { useHandleGlobalException } from 'spark-global-exception';
import { SearchOperators as Operators } from 'spark-search';
import { GridFooter, GridPagination } from 'spark-raw-grid';

import styles from './order_list.modules.css';
import { Context } from './store';
import { toQueryParams } from '../utils';
import { OrderColumns } from './order_table_cells';

const { EQ, MATCH } = Operators;

const options = [
  {
    key: 'name',
    operator: MATCH
  },
  {
    key: 'id',
    operator: EQ
  }
];

const Pagination = () => {
  const [{ pagination, total }, dispatch, ActionTypes] = useContext(Context);
  const { page, perPage } = pagination;

  function doPageChange(newPage) {
    dispatch({
      type: ActionTypes.paginate,
      payload: { pagination: { page: newPage, perPage } }
    });
  }
  function doPerPageChange(newPerPage) {
    dispatch({
      type: ActionTypes.paginate,
      payload: { pagination: { page: 1, perPage: newPerPage } }
    });
  }

  return (
    <GridFooter>
      <GridPagination
        page={page}
        total={total}
        perPage={perPage}
        onPerPageChange={doPerPageChange}
        onPageChange={doPageChange}
      />
    </GridFooter>
  );
};

export const OrderTable = ({ isLoading, role = 'BUYER' }) => {
  const [{ search, orders, pagination }, dispatch, ActionTypes, doFetch] = useContext(Context);
  const [message, setMessage] = useState(null);
  const fetchResource = useFetchResource();
  const handleGlobalException = useHandleGlobalException();

  const columns = OrderColumns(role);
  const queries = toQueryParams({ search: search.text, options });

  function fetchOrders() {
    doFetch(
      () =>
        fetchResource(
          'order.list',
          { search: queries, pagination, role },
          {
            headers: {
              'x-freewheel-network-id': 1751328505,
              'x-freewheel-user-id': 11
            }
          }
        ),
      result => {
        const { data, warning } = result;
        const msg = warning && warning.msg;
        setMessage(msg);
        dispatch({
          type: ActionTypes.load,
          payload: {
            orders: (data && data.items) || [],
            total: (data && data.total) || 0
          }
        });
      },
      error => {
        handleGlobalException(error);
      }
    );
  }

  useEffect(() => {
    fetchOrders();
  }, [search, pagination]);

  return (
    <div
      className={styles.tableWrapper}
      style={{
        opacity: isLoading ? 0.5 : 1
      }}
    >
      <p>{message}</p>

      <DataTable columns={columns} data={orders || []} />
      <Pagination />
    </div>
  );
};
