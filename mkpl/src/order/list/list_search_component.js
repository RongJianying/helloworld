import React from 'react';

import {Context, StatusEnum, ActionTypes} from './list_model';

const ListSearch = () => {
  const {state: {search}, dispatch, Actions} = React.useContext(Context);
  const [searchText, setSearchText] = React.useState(search.text);

  const doSearch = (newSearch) => {
    setSearchText(newSearch.text || search.text);
    dispatch(Actions[ActionTypes.SEARCH](newSearch));
  };

  return React.useMemo(() => (
    <>
      <section>
        <h1>Filters</h1>
        <input type="text" value={searchText} placeholder="Search by ID or Name..." onChange={(e) => {
          setSearchText(e.target.value);
        }}/>
        <button onClick={() => { doSearch({ text: searchText }); }}>Search</button>
      </section>
      <hr />
      <section>
        <ul>
          {
            [StatusEnum.PENDING, StatusEnum.REJECTED, StatusEnum.APPROVED, StatusEnum.IN_FLIGHT, StatusEnum.CANCELLED, StatusEnum.COMPLETED].map(
              (status) => (
                <li key={status} onClick={() => {
                  doSearch({ status });
                }}>
                  {search.status === status ? <u>{status}</u> : status}
                </li>
              )
            )
          }
        </ul>
      </section>
    </>
  ), [search, searchText]);
};

export default ListSearch;
