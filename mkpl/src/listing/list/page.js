import React from 'react';
import { GridPagination } from 'spark-raw-grid';
import { Link, browserHistory } from 'react-router';
import { useListData, useUpdateItem } from './use-data';
import styles from './list.modules.css';
import { Table } from './table';
import { useIsMounted } from './utils';

const EmptyObject = {};

export const useList = ({ sortBy, searchBy, page, perPage }) => {
  const isMounted = useIsMounted();
  const { isLoading, data, refetch } = useListData(
    {
      sortBy: sortBy || EmptyObject,
      searchBy: searchBy || '',
      page: page || 1,
      perPage: perPage || 20
    },
    {
      headers: {
        'x-freewheel-network-id': 1751328505,
        'x-freewheel-user-id': 315773924
      }
    }
  );

  const [updating, setUpdating] = React.useState([]);
  const uItem = useUpdateItem();

  const updateWithState = React.useCallback(
    id => {
      setUpdating(items => [...items, id]);
      return uItem(id).then(() => {
        if (isMounted()) {
          setUpdating(items => items.filter(item => item !== id));

          if (updating.length === 0) {
            refetch();
          }
        }
      });
    },
    [uItem, updating.length, refetch, isMounted]
  );

  return {
    isLoading: isLoading || updating.length > 0,
    data,
    refetch,
    updateItem: updateWithState
  };
};

const flattenData = result => {
  const listings = [];
  const data = result ? result.data : {};
  if (data && data.items) {
    data.items.forEach(listing => {
      listings.push({
        id: listing.id,
        name: listing.name,
        status: listing.status,
        startDate: listing.start_time,
        endDate: listing.end_time,
        price: listing.price,
        availableImpressions: 10000000,
        deliveredImpressions: 5600000
      });
    });
  }
  return listings;
};

export const ListingList = () => {
  const networkID = browserHistory.getCurrentLocation().pathname.split('/')[2];
  const targetHref = `/app/${networkID}/mkpl/listings`;

  const [searchBy, setSearchBy] = React.useState('');
  const [sortBy, setSortBy] = React.useState({ id: 'id', desc: true });
  const [perPage, setPerPage] = React.useState(20);
  const [page, setPage] = React.useState(1);
  const { isLoading, data, updateItem } = useList({
    sortBy,
    searchBy,
    page,
    perPage
  });

  const onPerPageChange = React.useCallback(
    newPerPage => {
      setPerPage(newPerPage);
      setPage(1);
    },
    [setPerPage, setPage]
  );

  const onActionClicked = React.useCallback(
    (...args) => {
      updateItem(...args);
    },
    [updateItem]
  );

  return (
    <React.Fragment>
      <div className={styles.header}>
        <div className={styles.headerName}>LISTING MANAGEMENT TABLE</div>
      </div>
      <div className={styles.toolHeader}>
        <input
          value={searchBy}
          placeholder="Type to search ..."
          onChange={e => setSearchBy(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.spacer} />
        <Link className={{ float: 'right' }} to={`${targetHref}/new`}>
          <button type="button" className={styles.createButton}>
            + Create
          </button>
        </Link>
      </div>

      <Table
        showSummary
        stickySummary
        stickyHeader
        isLoading={isLoading}
        data={data ? flattenData(data) : undefined}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        onActionClicked={onActionClicked}
      />

      <GridPagination
        total={data ? data.data.total : undefined}
        page={page}
        perPage={perPage}
        onPageChange={setPage}
        onPerPageChange={onPerPageChange}
      />
    </React.Fragment>
  );
};
