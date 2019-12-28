import React from 'react';

import Styles from './order_list.modules.css';
import { useMappedReducer, useJsonApi } from '../utils';
import { initState, reducers, Context, stateTypes } from './store';
import { SearchComponent, Title } from './components';
import { OrderTable } from './order_table_component';

export const OrderList = ({ mkplRole }) => {
  const [isLoading, doFetch] = useJsonApi();

  return (
    <Context.Provider value={[...useMappedReducer(reducers, initState, stateTypes), doFetch]}>
      <div className={Styles.tableContainer}>
        <Title />
        <SearchComponent isLoading={isLoading} />
        <OrderTable isLoading={isLoading} role={mkplRole} />
      </div>
    </Context.Provider>
  );
};
