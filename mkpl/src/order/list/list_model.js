import {createContext} from 'react';

import buildContextFunc from './util';

export const StatusEnum = {
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
  APPROVED: 'APPROVED',
  IN_FLIGHT: 'IN_FLIGHT',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED'
};

const initState = {
  search: {
    text: '',
    status: StatusEnum.PENDING
  },
  orders: [],
  message: null
};

export const ActionTypes = {
  SEARCH: 'SEARCH',
  LOAD: 'LOAD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
};

const Models = {
  [ActionTypes.SEARCH]: {
    action: (search) => (
      {
        type: ActionTypes.SEARCH,
        payload: search
      }
    ),
    reducer: (state, payload) => ({...state, search: {...state.search, ...payload}})
  },
  [ActionTypes.LOAD]: {
    action: async (search) => {
      const res = await fetch(`/app/services/orders?text=${search.text}&status=${search.status}`);
      const data = await res.json();

      return {
        type: ActionTypes.LOAD,
        payload: {
          data
        }
      }
    },
    reducer: (state, payload) => ({...state, orders: dataToModel(payload.data), message: null})
  },
  [ActionTypes.DELETE]: {
    action: (id) => (
      {
        type: ActionTypes.DELETE,
        payload: {
          id
        }
      }
    ),
    reducer: (state, payload) => ({...state, orders: state.orders.filter((order) => order.id != payload.id)})
  },
  [ActionTypes.UPDATE]: {
    action: async (id, status) => {
      try {
        const res = await fetch(`/id=${id}&status=${status}`);
        if (!res.ok) {
          throw res.statusText;
        }
      } catch (reason) {
        return {
          type: 'UPDATE_FAILED',
          payload: {
            message: `failed to update order #${id}: ${reason}`
          }
        };
      }

      return {
        type: ActionTypes.UPDATE,
        payload: {
          id,
          status,
          message: `success to update order #${id}`
        }
      };
    },
    reducer: (state, {id, status, message}) => ({
      ...state,
      message,
      orders: state.orders.map((order) => order.id === id ? {...order, status} : order)
    })
  },
  // internal reducer, may be not necessary
  UPDATE_FAILED: {
    reducer: (state, {message}) => ({...state, message})
  }
};

const dataToModel = (data) => {
  return data;
};

export const Context = createContext(null);
export const buildContext = buildContextFunc(initState, Models);
