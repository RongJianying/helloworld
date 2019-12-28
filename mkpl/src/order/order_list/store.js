import PropTypes from 'prop-types';
import { createContext } from 'react';
import moment from 'moment';
import { createEnum } from '../utils';

export const StatusEnum = createEnum('APPROVED', 'INFLIGHT', 'COMPLETED');

// export const StatusLabelMap = {
//   APPROVED: 'Future',
//   COMPLETED: 'Finished',
//   IN FLIGHT: 'Running'
// };

export const Context = createContext(null);

export const initState = {
  search: {
    text: ''
  },
  orders: [],
  pagination: {
    page: 1,
    perPage: 20
  },
  total: 0
};

export const stateTypes = {
  search: PropTypes.exact({
    text: PropTypes.string.isRequired
  }).isRequired,
  orders: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      externalId: PropTypes.string,
      description: PropTypes.string,
      buyerNetworkId: PropTypes.string.isRequired,
      buyerNetworkName: PropTypes.string.isRequired,
      sellerNetworkId: PropTypes.string.isRequired,
      sellerNetworkName: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      priceMode: PropTypes.string,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string,
      pacing: PropTypes.string,
      budgetModel: PropTypes.string,
      budgetPeriod: PropTypes.string,
      budgetGoal: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      buyerContactUserId: PropTypes.string,
      buyerContactUserName: PropTypes.string,
      insightMetrics: PropTypes.exact({
        forecast: PropTypes.exact({
          ftdi: PropTypes.number,
          totalAvails: PropTypes.number
        }),
        delivered: PropTypes.exact({
          deliveredImpressions: PropTypes.number,
          deliveredExpense: PropTypes.number
        })
      })
    })
  ),
  total: PropTypes.number,
  pagination: PropTypes.exact({
    page: PropTypes.number,
    perPage: PropTypes.number
  })
};

const ConvertOrderData = orders => {
  const now = moment()
    .utc()
    .format();

  return orders.map(order => {
    let { status } = order;
    if (status === StatusEnum.APPROVED) {
      if (order.end_time < now) {
        status = StatusEnum.COMPLETED;
      } else if (order.start_time < now) {
        status = StatusEnum.INFLIGHT;
      }
    }
    const insightMetrics = {};
    // TODO: remove it after demo and add insightMetrics convertor
    if (status === StatusEnum.COMPLETED) {
      const deliveredImpressions = parseInt(order.budget_goal, 10) * 0.934;
      const deliveredExpense = deliveredImpressions * order.price;
      insightMetrics.delivered = {
        deliveredImpressions,
        deliveredExpense
      };
    }
    if (status === StatusEnum.INFLIGHT) {
      const deliveredImpressions = parseInt(order.budget_goal, 10) * 0.427;
      const deliveredExpense = deliveredImpressions * order.price;
      insightMetrics.delivered = {
        deliveredImpressions,
        deliveredExpense
      };
    }

    return {
      id: order.id,
      name: order.name,
      externalId: order.external_id,
      description: order.description,
      buyerNetworkId: order.buyer_network_id,
      buyerNetworkName: order.buyer_network_name,
      sellerNetworkId: order.seller_network_id,
      sellerNetworkName: order.seller_network_name,
      price: order.price,
      priceMode: order.price_mode,
      startTime: order.start_time,
      endTime: order.end_time,
      pacing: order.pacing,
      budgetModel: order.budget_model,
      budgetPeriod: order.budget_period,
      budgetGoal: parseInt(order.budget_goal, 10),
      status,
      buyerContactUserId: order.buyer_contact_user_id,
      buyerContactUserName: order.buyer_contact_user_name,
      insightMetrics
    };
  });
};

export const reducers = {
  search: (state, { search }) => ({
    ...state,
    search: { ...state.search, ...search }
  }),
  load: (state, { orders, total }) => ({
    ...state,
    orders: ConvertOrderData(orders),
    total
  }),
  paginate: (state, { pagination }) => ({
    ...state,
    pagination
  })
  // delete: (state, { id }) => ({
  //   ...state,
  //   orders: state.orders.filter(order => order.id !== id)
  // }),
  // update: (state, { id, status }) => ({
  //   ...state,
  //   orders: state.orders.map(order =>
  //     order.id === id ? { ...order, status } : order
  //   )
  // })
};
