/* eslint-disable */
import moment from 'moment';
import classnames from 'classnames';
import React from 'react';
import { Link } from 'react-router';
import { isUndefined } from 'lodash';
import { Icon } from 'spark-icon';
import { Tooltip } from 'spark-tooltip';
// import { useBizContext } from 'biz-context';
import { getSymbolFromCurrency } from 'spark-masked-input';

import { StatusEnum, StatusMap } from './constants';
import styles from './order_list.modules.css';
// import { Context } from './store';
import { numberFormatter, integerFormatter } from '../../../lib/utils';

// TODO: remove it after useBizContext works well
// const { getUserLocale, getNetworkTimezone, getNetwork } = useBizContext();
// const networkDefaultCurrencySymbol = getSymbolFromCurrency(
//   getNetwork().get('default_currency')
// );
const getUserLocale = () => 'en-US';
const getNetworkTimezone = () => 'America/New_York';
const networkDefaultCurrencySymbol = getSymbolFromCurrency('USD');

const StatusCell = ({ value }) => {
  const status = StatusMap[value];
  return <div className={classnames(styles.tag, styles[status.toLowerCase()])}>{status}</div>;
};

const NameCell = ({ value, row }) => {
  const id = row.id;
  const url = 'http://localhost:9010/app/1/mkpl/buyer_order/' + id;
  return (
    <div>
      <div className={styles.nameCellNumber}>
        <Link to={url}>{value}</Link>
      </div>
      <div className={styles.cellSecondaryText}>
        <span style={{ fontWeight: 800, marginRight: '0.5em' }}>ID</span>
        <span>{row.id}</span>
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

const PriceCell = ({ value }) => {
  // const { getUserLocale, getNetwork } = useBizContext();
  const price = numberFormatter(value, getUserLocale());
  return (
    <div>
      <div style={{ whiteSpace: 'nowrap' }}>
        {networkDefaultCurrencySymbol}
        {price}
      </div>
    </div>
  );
};

const DeliveredCostCell = ({ value }) => {
  // const { getUserLocale, getNetwork } = useBizContext();
  const deliveredExpense = (value && value.delivered && value.delivered.delivered_expense) || 0;
  const price = numberFormatter(deliveredExpense, getUserLocale());
  return (
    <div>
      <div style={{ whiteSpace: 'nowrap' }}>
        {networkDefaultCurrencySymbol}
        {price}
      </div>
    </div>
  );
};

const DeliveredCostSummary = ({ data }) => {
  // const { getUserLocale, getNetwork } = useBizContext();

  const total = React.useMemo(() => {
    if (data && data.length) {
      return data.reduce((accum, row) => {
        const expense =
          row &&
          row.insight_metrics &&
          row.insight_metrics.delivered &&
          row.insight_metrics.delivered.delivered_expense
            ? row.insight_metrics.delivered.delivered_expense
            : 0;
        return accum + expense;
      }, 0);
    }
    return undefined;
  }, [data]);
  return (
    <div>
      <div className={styles.dateSummaryMain}>
        {isUndefined(total)
          ? '-'
          : networkDefaultCurrencySymbol + numberFormatter(total, getUserLocale())}
      </div>
      <div className={styles.cellSecondaryText}>TOTAL</div>
    </div>
  );
};

const PriceSummary = ({ data }) => {
  // const { getUserLocale, getNetwork } = useBizContext();

  const avg = React.useMemo(() => {
    if (data && data.length) {
      const total = data.reduce((accum, row) => accum + row.price, 0);
      return (total / data.length).toFixed(2);
    }
    return undefined;
  }, [data]);
  return (
    <div>
      <div className={styles.dateSummaryMain}>
        {isUndefined(avg)
          ? '-'
          : networkDefaultCurrencySymbol + numberFormatter(avg, getUserLocale())}
      </div>
      <div className={styles.cellSecondaryText}>AVERAGE</div>
    </div>
  );
};

const dateFormatter = (val, timezone) => moment.tz(val, timezone).format('DD MMM YYYY');
const timeFormatter = (val, timezone) => moment.tz(val, timezone).format('hh:mm A');

const DateCell = ({ value }) => {
  // const { getNetworkTimezone } = useBizContext();
  const date = dateFormatter(value, getNetworkTimezone());
  const time = timeFormatter(value, getNetworkTimezone());
  return (
    <div>
      <div style={{ whiteSpace: 'nowrap' }}>{date}</div>
      <div className={styles.cellSecondaryText}>{time}</div>
    </div>
  );
};

const StartDateSummary = ({ data }) => {
  // const { getNetworkTimezone } = useBizContext();

  const minDate = React.useMemo(() => {
    if (data && data.length) {
      return data.reduce((accum, row) => {
        if (accum > row.start_time) {
          return row.start_time;
        }
        return accum;
      }, data[0].start_time);
    }

    return undefined;
  }, [data]);
  return (
    <div>
      <div className={styles.dateSummaryMain}>
        {minDate ? dateFormatter(minDate, getNetworkTimezone()) : '-'}
      </div>
      <div className={styles.cellSecondaryText}>FIRST START</div>
    </div>
  );
};

const EndDateSummary = ({ data }) => {
  // const { getNetworkTimezone } = useBizContext();

  const maxDate = React.useMemo(() => {
    if (data && data.length) {
      return data.reduce((accum, row) => {
        if (accum < row.end_time) {
          return row.end_time;
        }
        return accum;
      }, data[0].end_time);
    }

    return undefined;
  }, [data]);
  return (
    <div>
      <div className={styles.dateSummaryMain}>
        {maxDate ? dateFormatter(maxDate, getNetworkTimezone()) : '-'}
      </div>
      <div className={styles.cellSecondaryText}>LAST END</div>
    </div>
  );
};

const arrow = <Icon name="angle-right" size="24px" />;

const Progress = ({ number, status = 'future' }) => {
  return (
    <div className={styles.progressBackground}>
      <div
        className={classnames(styles.progressBar, styles[status])}
        style={{
          width: `${number}%`
        }}
      />
    </div>
  );
};

const AchievementCell = ({ value, row }) => {
  // const { getUserLocale } = useBizContext();

  if (row.status === StatusEnum.APPROVED) {
    return <Progress number={0} />;
  }
  const budgetGoal = parseInt(row.budget_goal, 10);
  const deliveredImps = value && value.delivered_imps ? parseInt(value.delivered_imps, 10) : 0;
  const remainingImps = budgetGoal - deliveredImps;
  const percentage = budgetGoal !== 0 ? (deliveredImps / budgetGoal).toFixed(4) : 0;
  const status = StatusMap[row.status].toLowerCase();
  return (
    <div>
      <Tooltip
        className={styles.tooltip}
        popupClassName={styles.popup}
        directionPreference={['top']}
        theme="white"
        content={
          <div>
            <div>
              <div className={styles.inline}> DELIVERED IMP: </div>
              <div className={styles.inlineRight}>
                {' '}
                {integerFormatter(deliveredImps, getUserLocale())}{' '}
              </div>
            </div>
            <div>
              <div className={styles.inline}> REMAINING IMP: </div>
              <div className={styles.inlineRight}>
                {' '}
                {integerFormatter(remainingImps, getUserLocale())}{' '}
              </div>
            </div>
          </div>
        }
      >
        <div className={styles.center}>IMPRESSIONS</div>
        <Progress number={percentage * 100} status={status} />
        <div>
          <div className={styles.inline}>
            <span className={styles[status]}>
              {numberFormatter(percentage * 100, getUserLocale())}%
            </span>
          </div>
          <div className={styles.inlineRight}>
            {' '}
            {integerFormatter(budgetGoal, getUserLocale())}{' '}
          </div>
        </div>
      </Tooltip>
    </div>
  );
};

export const OrderColumns = (role = 'BUYER') => {
  const partner = {};
  const delivery = {
    id: 'delivered_expense',
    Cell: DeliveredCostCell,
    Summary: DeliveredCostSummary
  };
  if (role === 'BUYER') {
    partner.Header = 'SELLER';
    partner.accessor = 'seller_network_name';
    delivery.Header = 'DELIVERED COST';
  } else {
    partner.Header = 'BUYER';
    partner.accessor = 'buyer_network_name';
    delivery.Header = 'DELIVERED REVENUE';
  }

  return [
    {
      Header: 'Status',
      accessor: 'status',
      Cell: StatusCell
    },
    {
      Header: 'Name',
      accessor: 'name',
      Cell: NameCell,
      Summary: NameSummary
    },
    partner,
    {
      Header: 'Start Date',
      accessor: 'start_time',
      width: 1,
      Cell: DateCell,
      Summary: StartDateSummary
    },
    {
      id: 'arrow',
      Cell: () => arrow,
      width: 0.5,
      Summary: () => arrow
    },
    {
      Header: 'End Date',
      accessor: 'end_time',
      width: 1,
      Cell: DateCell,
      Summary: EndDateSummary
    },
    {
      Header: 'ECPM',
      accessor: 'price',
      Cell: PriceCell,
      Summary: PriceSummary
    },
    {
      Header: 'DELIVERED COST',
      id: 'delivered_expense',
      Cell: DeliveredCostCell,
      Summary: DeliveredCostSummary
    },
    {
      Header: 'ACHIEVEMENT',
      accessor: 'insight_metrics',
      Cell: AchievementCell
    }
  ];
};
