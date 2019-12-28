import moment from 'moment';
import { Link } from 'react-router';
import classnames from 'classnames';
import React from 'react';
import { isUndefined } from 'lodash';
import { Icon } from 'spark-icon';
import { Tooltip } from 'spark-tooltip';
import { useBizContext } from 'biz-context';
import { getSymbolFromCurrency } from 'spark-masked-input';

import styles from './order_list.modules.css';
import { numberFormatter, integerFormatter } from '../utils';

const StatusCell = ({ value }) => {
  return <div className={classnames(styles.tag, styles[value.toLowerCase()])}>{value}</div>;
};

// const NameCell = ({ value, row }) => {
//   return (
//     <div>
//       <div className={styles.nameCellNumber}>{value}</div>
//       <div className={styles.cellSecondaryText}>
//         <span style={{ fontWeight: 800, marginRight: '0.5em' }}>ID</span>
//         <span>{row.id}</span>
//       </div>
//     </div>
//   );
// };

const NameCell = ({ value, row }) => {
  const id = row.id;
  const url = 'http://localhost:9010/app/1/mkpl/buyer_order/' + id;
  return (
    <div>
      <div>
        <Link className={styles.nameCellNumber} to={url}>
          {value}
        </Link>
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
  const { getUserLocale, getNetwork } = useBizContext();
  const networkDefaultCurrencySymbol = getSymbolFromCurrency(getNetwork().get('default_currency'));
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

const DeliveredCostCell = ({ row }) => {
  const { getUserLocale, getNetwork } = useBizContext();
  const networkDefaultCurrencySymbol = getSymbolFromCurrency(getNetwork().get('default_currency'));

  const deliveredExpense =
    (row &&
      row.insightMetrics &&
      row.insightMetrics.delivered &&
      row.insightMetrics.delivered.deliveredExpense) ||
    0;
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
  const { getUserLocale, getNetwork } = useBizContext();
  const networkDefaultCurrencySymbol = getSymbolFromCurrency(getNetwork().get('default_currency'));

  const total = React.useMemo(() => {
    if (data && data.length) {
      return data.reduce((accum, row) => {
        const expense =
          row &&
          row.insightMetrics &&
          row.insightMetrics.delivered &&
          row.insightMetrics.delivered.deliveredExpense
            ? row.insightMetrics.delivered.deliveredExpense
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
  const { getUserLocale, getNetwork } = useBizContext();
  const networkDefaultCurrencySymbol = getSymbolFromCurrency(getNetwork().get('default_currency'));

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
  const { getNetworkTimezone } = useBizContext();
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
  const { getNetworkTimezone } = useBizContext();

  const minDate = React.useMemo(() => {
    if (data && data.length) {
      return data.reduce((accum, row) => {
        if (accum > row.startTime) {
          return row.startTime;
        }
        return accum;
      }, data[0].startTime);
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
  const { getNetworkTimezone } = useBizContext();

  const maxDate = React.useMemo(() => {
    if (data && data.length) {
      return data.reduce((accum, row) => {
        if (accum < row.endTime) {
          return row.endTime;
        }
        return accum;
      }, data[0].endTime);
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
  const { getUserLocale } = useBizContext();

  const { budgetGoal } = row;
  const deliveredImps =
    value && value.delivered && value.delivered.deliveredImpressions
      ? value.delivered.deliveredImpressions
      : 0;
  const remainingImps = budgetGoal - deliveredImps;
  const percentage = budgetGoal !== 0 ? (deliveredImps / budgetGoal).toFixed(4) : 0;
  const status = row.status.toLowerCase();
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
    id: 'deliveredExpense',
    Cell: DeliveredCostCell,
    Summary: DeliveredCostSummary
  };
  if (role === 'BUYER') {
    partner.Header = 'SELLER';
    partner.accessor = 'sellerNetworkName';
    delivery.Header = 'DELIVERED COST';
  } else {
    partner.Header = 'BUYER';
    partner.accessor = 'buyerNetworkName';
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
      accessor: 'startTime',
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
      accessor: 'endTime',
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
    delivery,
    {
      Header: 'ACHIEVEMENT',
      accessor: 'insightMetrics',
      Cell: AchievementCell
    }
  ];
};
