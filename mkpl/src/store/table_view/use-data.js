import React from 'react';
import { useFetchResourceData } from 'spark-fetch';
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

export const useFetchListingListData = (
  { sortBy = { id: 'id', desc: true }, searchBy = '', page = 1, perPage = 20 },
  options
) => {
  const queryParams = React.useMemo(() => toQueryParams({ searchBy, sortBy, page, perPage }), [
    sortBy,
    searchBy,
    page,
    perPage
  ]);
  const q = useDebouncedValue(queryParams);
  return useFetchResourceData('buyer_listing.list', q, options);
};
