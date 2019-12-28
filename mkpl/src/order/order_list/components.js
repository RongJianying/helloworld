import React, { useState, useContext } from 'react';
import { FormInput, Button } from 'spark-form';
import { Icon } from 'spark-icon';

import styles from './order_list.modules.css';
import { Context } from './store';

export const SearchComponent = ({ isLoading }) => {
  const [{ search }, dispatch, ActionTypes] = useContext(Context);
  const [searchText, setSearchText] = useState(search.text);

  function doSearch() {
    dispatch({
      type: ActionTypes.search,
      payload: { search: { text: searchText } }
    });
  }

  return (
    <div className={styles.searchInput}>
      <FormInput
        placeholder="Search by ID or Name..."
        onChange={e => setSearchText(e.target.value)}
        value={searchText}
        suffix={
          <Button type="link-text" onClick={doSearch} disabled={isLoading}>
            <Icon name="search" size="14" />
          </Button>
        }
        disabled={isLoading}
      />
    </div>
  );
};

export const Title = () => {
  const [{ pagination, total }] = useContext(Context);
  const { page, perPage } = pagination;

  const first = (page - 1) * perPage + 1;
  const last = Math.min(page * perPage, total);
  return (
    <div className={styles.title}>
      <h2>ORDERS TABLE</h2>
      {total ? (
        <span>
          {' '}
          Showing <b>{first}</b> to <b>{last}</b> of <b>{total}</b>{' '}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};
