import moment from 'moment';
import Numbro from 'numbro';
import classnames from 'classnames';
import React from 'react';
import { DataTable as RawDataTable } from 'spark-table';
import { Link, browserHistory } from 'react-router';
import { Icon } from 'spark-icon';
import styles from './list.modules.css';

/**
 * @typedef {React.FC<import('spark-table').CellProps>} Cell
 * @typedef {React.FC<import('spark-table').HeaderProps>} Header
 * @typedef {React.FC<import('spark-table').SummaryProps>} Summary
 * @typedef {import('spark-table').DataTableColumn} DataTableColumn
 */

const Tag = ({ children }) => {
  return <div className={styles.tag}>{children}</div>;
};

const NameCell = ({ value, row }) => {
  const networkID = browserHistory.getCurrentLocation().pathname.split('/')[2];
  const targetHref = `/app/${networkID}/mkpl/listings`;
  return (
    <div>
      <Link to={`${targetHref}/${row.id}`} className={styles.nameCellNumber}>
        {value}
      </Link>
      <div className={styles.cellSecondaryText}>
        <span style={{ fontWeight: 800, marginRight: '0.5em' }}>ID</span>
        <span style={{ fontFamily: 'monospace' }}>{row.id}</span>
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

const dateFormatter = val => moment(val).format('DD MMM YYYY');
// const timeFormatter = val => moment(val).format('hh:mm A');

const DateCell = ({ value }) => {
  const date = dateFormatter(value);
  // const time = timeFormatter(value);
  return (
    <div>
      <div style={{ whiteSpace: 'nowrap' }}>{date}</div>
      {/* <div className={styles.cellSecondaryText}>{time}</div> */}
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

const ProgressCell = ({ value, row }) => {
  const percent = value > 0 ? (row.deliveredImpressions / value) * 100 : 0;
  return (
    <div>
      <div className={styles.progressTitle}>IMPRESSIONS</div>
      <div className={styles.progressBackground}>
        <div
          className={styles.progressBar}
          style={{
            width: `${percent}%`
          }}
        />
        <div className={styles.progressDetail}>
          <p className={styles.progressPercent}>{Numbro(percent).format('0,0.00')}%</p>
          <p className={styles.progressNumber}>{Numbro(value).format('0,0')}</p>
        </div>
      </div>
    </div>
  );
};

const Action = ({ onClick, id }) => {
  return (
    <div
      className={styles.moreAction}
      onClick={onClick && (() => onClick(id))}
      onKeyPress={onClick && (() => onClick(id))}
      role="button"
      tabIndex={0}
    >
      <Icon name="ellipsis-v" size="1em" />
    </div>
  );
};

const columns = [
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => <Tag>{value}</Tag>
  },
  {
    Header: 'Name',
    accessor: 'name',
    Cell: NameCell,
    Summary: NameSummary
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
    Header: 'ACHIEVEMENT',
    accessor: 'availableImpressions',
    Cell: ProgressCell
  },
  {
    Header: 'Price',
    accessor: 'price',
    Cell: ({ value }) => <div>${Numbro(value).format('0,0.00')} </div>,
    Summary: PriceSummary
  }
];

const DataTable = React.memo(RawDataTable);

export const Table = ({
  overflow,
  showSummary,
  stickySummary,
  stickyHeader,
  data,
  isLoading,
  sortBy,
  onSortByChange,
  onActionClicked
}) => {
  const summaryOptions = React.useMemo(
    () => ({
      hidden: !showSummary,
      sticky: stickySummary
    }),
    [showSummary, stickySummary]
  );
  const headerOptions = React.useMemo(
    () => ({
      sticky: stickyHeader
    }),
    [stickyHeader]
  );

  const fullCols = React.useMemo(() => {
    return [
      ...columns,
      {
        id: 'action',
        Cell: ({ row }) => <Action onClick={onActionClicked} id={row.id} />,
        width: 1
      }
    ];
  }, [onActionClicked]);

  return (
    <div
      className={classnames(styles.tableWrapper, overflow && styles.overflow)}
      style={{
        opacity: isLoading ? 0.5 : 1
      }}
    >
      <DataTable
        sortBy={sortBy}
        onSortByChange={onSortByChange}
        columns={fullCols}
        data={data || []}
        summaryOptions={summaryOptions}
        headerOptions={headerOptions}
      />
    </div>
  );
};
