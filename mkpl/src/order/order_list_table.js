import React from 'react';
import Numbro from 'numbro';
import moment from 'moment-timezone';
import {Row, Col} from 'spark-form';

import {useTable, useExpanded, useRowSelect} from 'react-table';
import Styles from './order_list.modules.css';

function Table({columns: userColumns, data, renderRowSubComponent}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    flatColumns,
    selectedFlatRows,
    state: {expanded, selectedRowPaths}
  } = useTable(
    {
      columns: userColumns,
      data
    },
    useExpanded,
    useRowSelect
  );

  return (
    <>
      <table {...getTableProps()} className={Styles.table}>
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <>
              <tr {...row.getRowProps()} key={i} className={Styles.tr}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()} className={Styles.text}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
              {row.isExpanded ? (
                <tr className={Styles.detail}>
                  <td colSpan={flatColumns.length}>
                    {renderRowSubComponent({row})}
                  </td>
                </tr>
              ) : null}
            </>
          );
        })}
        </tbody>
      </table>
    </>
  );
}

const Tag = ({children, c}) => {
  const styles = {
    display: 'inline-block',
    background: 'rgba(200, 199, 235, 0.4)',
    padding: '2px 4px',
    opacity: '0.8',
    borderRadius: '2px',
    fontWeight: 800,
    margin: '2px'
  };
  if (c) {
    styles.background = c
  }

  return (
    <div
      style={styles}
    >
      {children}
    </div>
  );
};

const OrderInfo = ({cell}) => {
  return (
    <div style={{width: '150px', margin: '5px'}}>
      <div style={{fontSize: '18px', color: '#6935ac'}}>{cell.value.orderName}</div>
      <div style={{fontSize: '13px'}}>
        <span style={{fontWeight: 800, marginRight: '0.5em'}}>ID</span>
        <span>{cell.value.orderId}</span>
      </div>
    </div>
  );
};

const Title = ({name}) => (
  <div style={{fontWeight: 800, marginRight: '0.5em'}}> {name}</div>
);

const DateCell = ({cell}) => {
  const startDate = moment(cell.value.start_date).format('MM/DD/YYYY HH:MM');
  const endDate = moment(cell.value.end_date).format('MM/DD/YYYY HH:MM');
  return (
    <div style={{width: '130px'}}>
      <Title name="Flighting"/>
      <div style={{whiteSpace: 'nowrap'}}>{startDate} -</div>
      <div style={{whiteSpace: 'nowrap'}}>{endDate}</div>
    </div>
  );
};

const PriceCell = ({cell}) => {
  return (
    <div style={{width: '130px'}}>
      <Title name="Price"/>
      <div style={{whiteSpace: 'nowrap'}}>CPM ${Numbro(cell.value).format('0,0.00')}</div>
    </div>
  );
};

const BudgetCell = ({cell}) => {
  return (
    <div style={{width: '130px'}}>
      <Title name="Budget"/>
      <div style={{whiteSpace: 'nowrap'}}>{Numbro(cell.value).format('0,0')} Imps</div>
    </div>
  );
};

const AvailsCell = ({cell}) => {
  return (
    <div style={{width: '170px'}}>
      <Title name="Total Forecast Avails"/>
      {cell.value ?
        <div style={{whiteSpace: 'nowrap', color: '#F52E04'}}>{Numbro(cell.value).format('0,0')} imps</div> :
        <Tag c={'rgba(255, 179, 217, 0.52)'}>Calculating</Tag>
      }
    </div>
  );
};

const OrderListTable = ({orders}) => {
  const data = React.useMemo(() => orders, [orders]);

  const columns = React.useMemo(() => [
      {
        id: 'selection',
        Header: () => null,
        Cell: ({row}) => (
          <div style={{width: '50px', textAlign: 'center', marginTop: '15px'}}>
            <input type="checkbox" {...row.getToggleRowSelectedProps()} />
          </div>
        )
      },
      {
        Header: () => null,
        accessor: 'orderInfo',
        Cell: ({cell}) => <OrderInfo cell={cell}/>

      },
      {
        Header: () => null,
        accessor: 'schedule',
        Cell: ({cell}) => <DateCell cell={cell}/>
      },
      {
        Header: () => null,
        accessor: 'price',
        Cell: ({cell}) => <PriceCell cell={cell}/>
      },
      {
        Header: () => null,
        accessor: 'budget_goal',
        Cell: ({cell}) => <BudgetCell cell={cell}/>
      },
      {
        Header: () => null,
        accessor: 'avails',
        Cell: ({cell}) => <AvailsCell cell={cell}/>
      },
      {
        Header: () => null,
        accessor: 'status',
        Cell: ({row}) => (
          <div>
            {row.values.status === 'REJECTED' &&
            <div style={{fontSize: '100%'}}>
              <a href="http://localhost:9010/app/1/mkpl/order:create">Edit</a> <a>Cancel </a>
            </div>
            }
            <span {...row.getExpandedToggleProps()} style={{width: '130px', fontSize: '100%'}}>
            {row.isExpanded ? 'Collapse Overview ' : 'Expand Overview'}
            </span>
          </div>
        )
      }
    ], []
  );

  const renderRowSubComponent = React.useCallback(
    ({row}) => (
      <div style={{fontSize: '13px', margin: '10px'}}>
        <Row style={{textAlign: 'center'}}>
          <Col sm="1/7">
            <Tag key="undeletable">Vendor Brand</Tag>
            <Tag key="undeletable">Vendor Channel</Tag>
          </Col>
          <Col sm="1/8">
            <Tag key="undeletable">US Local</Tag>
          </Col>
          <Col sm="1/9">
            <Tag key="undeletable">VOD</Tag>
          </Col>
          <Col sm="1/8">
            <Tag key="undeletable">CTV-Roku</Tag>
            <Tag key="undeletable">Phone</Tag>
          </Col>
          <Col sm="1/8">
            <Tag key="undeletable">English</Tag>
            <Tag key="undeletable">Spanish</Tag>
          </Col>
          <Col sm="1/9">
            <Tag key="undeletable">Genre</Tag>
          </Col>
          <Col sm="1/8">
            <Tag key="undeletable">Long Form</Tag>
            <Tag key="undeletable">15s and 30s</Tag>
          </Col>
          <Col sm="1/8">
            <Tag key="undeletable">TV-PG</Tag>
          </Col>
        </Row>
      </div>
    ),
    []
  );
  return (
    <Table
      columns={columns}
      data={data}
      // We added this as a prop for our table component
      // Remember, this is not part of the React Table API,
      // it's merely a rendering option we created for
      // ourselves
      renderRowSubComponent={renderRowSubComponent}
    />
  );
};

export default OrderListTable;

