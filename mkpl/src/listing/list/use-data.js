import React from 'react';
import { useFetchResourceData, useFetchResource } from 'spark-fetch';
import { useHandleGlobalException } from 'spark-global-exception';
import { trim, isNumber } from 'lodash';
import { SearchOperators as Operators } from 'spark-search';
import { useDebouncedValue } from './utils';

const { EQ, MATCH } = Operators;

export const toQueryParams = ({ sortBy, searchBy, page, perPage }) => {
  const queries = [];
  const s = trim(searchBy);
  if (s.length !== 0) {
    queries.push({
      key: 'name',
      operator: MATCH,
      value: s
    });
    if (isNumber(searchBy)) {
      queries.push({
        key: 'id',
        operator: EQ,
        value: s
      });
    }
  }

  return {
    search: {
      filters: [],
      queries,
      queryMatch: 'ANY'
    },
    pagination: {
      page,
      perPage
    },
    sort: {
      orderby: sortBy.id ? `${sortBy.id}` : 'id',
      order: sortBy.desc ? 'desc' : 'asc'
    }
  };
};

export const useListData = ({ sortBy, searchBy, page, perPage }, options) => {
  const queryParams = React.useMemo(() => toQueryParams({ searchBy, sortBy, page, perPage }), [
    sortBy,
    searchBy,
    page,
    perPage
  ]);
  const q = useDebouncedValue(queryParams);
  return useFetchResourceData('listing.list', q, options);
};

export const useUpdateItem = () => {
  const fetchResource = useFetchResource();
  const handleGlobalException = useHandleGlobalException();
  return React.useCallback(
    id => {
      return fetchResource(
        'listing.update',
        { id },
        {
          body: JSON.stringify({ data: { status: 'ACTIVE' } }),
          headers: {
            'x-freewheel-network-id': 1751328505,
            'x-freewheel-user-id': 315773924
          }
        }
      ).catch(err => {
        handleGlobalException(err);
      });
    },
    [fetchResource, handleGlobalException]
  );
};
