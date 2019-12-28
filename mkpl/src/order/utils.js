import { useRef, useEffect, useReducer, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Numbro from 'numbro';
import { trim, filter } from 'lodash';
import { SearchOperators as Operators } from 'spark-search';

export const createEnum = (...items) => {
  const object = {};
  items.forEach(item => {
    object[item] = item;
  });
  return object;
};

export const useIsMounted = () => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted.current;
};

export const useMappedReducer = (reducers, initState, stateTypes) => {
  const ActionTypes = useMemo(() => createEnum(...Object.keys(reducers)), [reducers]);
  return [
    ...useReducer((state, { type, payload }) => {
      const newState = reducers[type](state, payload);
      if (stateTypes) {
        PropTypes.checkPropTypes(stateTypes, newState, 'property', 'state');
      }
      return newState;
    }, initState),
    ActionTypes
  ];
};

export const useJsonApi = () => {
  const [[promiseFunc, onSuccess, onError], setPromise] = useState([]);
  const isMounted = useIsMounted();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await promiseFunc();

        if (isMounted) {
          setIsLoading(false);
          if (onSuccess) {
            onSuccess(await result);
          }
        }
      } catch (error) {
        if (isMounted) {
          setIsLoading(false);
          if (onError) {
            onError(error);
          }
        }
      }
    };
    if (promiseFunc) {
      fetchData();
    }
  }, [isMounted, onError, onSuccess, promiseFunc]);

  return [
    isLoading,
    (newPromiseFunc, newOnSuccess, newOnError) => {
      setPromise([newPromiseFunc, newOnSuccess, newOnError]);
    }
  ];
};

export const toQueryParams = ({ search, options }) => {
  let queries = [];
  const value = trim(search);
  if (value.length !== 0) {
    const effectiveOptions = filter(
      options,
      op =>
        op.operator === Operators.MATCH || (op.operator === Operators.EQ && value.match(/^\d+$/))
    );

    queries = effectiveOptions.map(op => ({
      key: op.key,
      operator: op.operator,
      value
    }));
  }

  return {
    filter: [],
    queries,
    queryMatch: 'ANY'
  };
};

export const numberFormatter = (val, locale) => Numbro.culture(locale)(val).format('0,0.00');
export const integerFormatter = (val, locale) => Numbro.culture(locale)(val).format('0,0');
