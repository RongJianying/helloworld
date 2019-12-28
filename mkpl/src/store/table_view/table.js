import moment from 'moment';
import Numbro from 'numbro';
import { uniq, map } from 'lodash';
import React from 'react';
import { DataTable } from 'spark-table';
import { GridFooter, GridPagination } from 'spark-raw-grid';
import { Link } from 'spark-link';
import { Icon } from 'spark-icon';
import { useFetchListingListData } from './use-data';
import styles from './table.modules.css';

const NameCell = ({ value, row }) => {
  return (
    <div>
      <div className={styles.nameCellNumber}>{value.name}</div>
      <div className={styles.cellSecondaryText}>
        <span style={{ fontWeight: 800, marginRight: '0.5em' }}>ID</span>
        <span>{row.id}</span>
      </div>
      <div className={styles.cellSecondaryText}>
        <span>{value.desc}</span>
      </div>
    </div>
  );
};

const NameSummary = ({ data }) => {
  return (
    <div style={{ fontWeight: 800 }}>
      <div className={styles.nameSummaryNumber}>{data.length}</div>
      <div className={styles.cellSecondaryText}>ITEMS</div>
    </div>
  );
};

const SellerCell = ({ value }) => {
  return (
    <div>
      <div className={styles.nameCellNumber}>{value.sellerName}</div>
      <div className={styles.cellSecondaryText}>
        <span style={{ fontWeight: 800, marginRight: '0.5em' }}>ID</span>
        <span>{value.sellerID}</span>
      </div>
    </div>
  );
};

const SellerSummary = ({ data }) => {
  const sellerNum = React.useMemo(() => {
    if (data && data.length) {
      return uniq(map(data, row => row.seller.sellerID)).length;
    }
    return 0;
  }, [data]);
  return (
    <div style={{ fontWeight: 800 }}>
      <div className={styles.nameSummaryNumber}>{sellerNum}</div>
      <div className={styles.cellSecondaryText}>SELLERS</div>
    </div>
  );
};

const dateFormatter = val => moment(val).format('DD MMM YYYY');
const timeFormatter = val => moment(val).format('hh:mm A');

const DateCell = ({ value }) => {
  const date = dateFormatter(value);
  const time = timeFormatter(value);
  return (
    <div>
      <div style={{ whiteSpace: 'nowrap' }}>{date}</div>
      <div className={styles.cellSecondaryText}>{time}</div>
    </div>
  );
};

const StartDateSummary = ({ data }) => {
  const minDate = React.useMemo(() => {
    if (data && data.length) {
      return data.reduce((accum, row) => {
        if (accum > row.startDate) {
          return row.startDate;
        }
        return accum;
      }, data[0].startDate);
    }

    return undefined;
  }, [data]);
  return (
    <div>
      <div className={styles.dateSummaryMain}>{minDate ? dateFormatter(minDate) : '-'}</div>
      <div className={styles.cellSecondaryText}>FIRST START</div>
    </div>
  );
};

const EndDateSummary = ({ data }) => {
  const maxDate = React.useMemo(() => {
    if (data && data.length) {
      return data.reduce((accum, row) => {
        if (accum < row.endDate) {
          return row.endDate;
        }
        return accum;
      }, data[0].endDate);
    }

    return undefined;
  }, [data]);
  return (
    <div>
      <div className={styles.dateSummaryMain}>{maxDate ? dateFormatter(maxDate) : '-'}</div>
      <div className={styles.cellSecondaryText}>LAST END</div>
    </div>
  );
};

const PriceSummary = ({ data }) => {
  const averagePrice = React.useMemo(() => {
    if (data && data.length) {
      return data.reduce((sum, row) => sum + row.price, 0) / data.length;
    }

    return undefined;
  }, [data]);
  return (
    <div style={{ fontWeight: 800 }}>
      <div className={styles.nameSummaryNumber}>${Numbro(averagePrice).format('0,0.00')}</div>
      <div className={styles.cellSecondaryText}>AVERAGE</div>
    </div>
  );
};

const arrow = <Icon name="angle-right" size="24px" />;

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
    Cell: NameCell,
    Summary: NameSummary
  },
  {
    Header: 'Seller',
    accessor: 'seller',
    Cell: SellerCell,
    Summary: SellerSummary
  },
  {
    Header: 'Schedule',
    columns: [
      {
        Header: 'Start Date',
        accessor: 'startDate',
        width: 1,
        Cell: DateCell,
        Summary: StartDateSummary
      },
      {
        id: 'arrow',
        width: 1,
        Cell: () => arrow,
        Summary: () => arrow
      },
      {
        Header: 'End Date',
        accessor: 'endDate',
        width: 1,
        Cell: DateCell,
        Summary: EndDateSummary
      }
    ]
  },
  {
    Header: 'Price',
    accessor: 'price',
    Cell: ({ value }) => <div>${Numbro(value).format('0,0.00')} </div>,
    Summary: PriceSummary
  }
];

const flattenData = result => {
  const listings = [];
  const data = result ? result.data : {};
  if (data && data.items) {
    data.items.forEach(listing => {
      listings.push({
        id: listing.id,
        name: {
          name: listing.name,
          desc: listing.description
        },
        startDate: listing.start_time,
        endDate: listing.end_time,
        price: listing.price,
        volume: listing.volume,
        seller: {
          sellerID: listing.seller_id,
          sellerName: listing.seller_name
        }
      });
    });
  }
  return listings;
};

export const BuyerListingTable = () => {
  const [searchBy, setSearchBy] = React.useState('');
  const [sortBy, setSortBy] = React.useState({ id: 'id', desc: true });
  const [perPage, setPerPage] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const { isLoading, data } = useFetchListingListData(
    { sortBy, searchBy, page, perPage },
    {
      headers: {
        'x-freewheel-network-id': 1751328505,
        'x-freewheel-user-id': 315773924
      }
    }
  );

  const tableData = React.useMemo(() => (data ? flattenData(data) : []), [data]);

  const onPerPageChange = React.useCallback(
    newPerPage => {
      setPerPage(newPerPage);
      setPage(1);
    },
    [setPerPage, setPage]
  );

  const fullCols = React.useMemo(() => {
    return [
      ...columns,
      {
        id: 'action',
        Cell: ({ row }) => <Link href={`buyer_order/create/${row.id}`}>Purchase</Link>,
        width: 1
      }
    ];
  }, [{}]);

  return (
    <div className={styles.tableContainer}>
      <input
        value={searchBy}
        placeholder="Type to search ..."
        onChange={e => setSearchBy(e.target.value)}
        className={styles.searchInput}
      />
      <div
        className={styles.tableWrapper}
        style={{
          opacity: isLoading ? 0.5 : 1
        }}
      >
        <DataTable sortBy={sortBy} onSortByChange={setSortBy} columns={fullCols} data={tableData} />
      </div>
      <div>
        <GridFooter>
          <GridPagination
            page={page}
            total={data ? data.data.total : 0}
            perPage={perPage}
            onPerPageChange={onPerPageChange}
            onPageChange={setPage}
          />
        </GridFooter>
      </div>
    </div>
  );
};
