import React from 'react';

import {Context, ActionTypes} from './list_model';

const ListList = () => {
  const {state: {search, orders, message}, dispatch, Actions} = React.useContext(Context);

  React.useEffect(() => {dispatch(Actions[ActionTypes.LOAD](search))}, [search]);

  return React.useMemo(() => (
    <>
      <p>{message}</p>
      <hr />
      {
        orders.map((order) => (
          <article key={order.id}>
            <h1>Order #{order.id} {order.status}</h1>
            <button onClick={() => {dispatch(Actions[ActionTypes.DELETE](order.id));}}>Delete</button>
            <button onClick={() => {dispatch(Actions[ActionTypes.UPDATE](order.id, 'CANCELLED'));}}>Update</button>
            {
              order.lines && order.lines.map((line) => (
                <article key={line.name}>
                  <h2>{line.name}</h2>
                </article>
              ))
            }
          </article>
        ))
      }
    </>
  ), [orders, message]);
};

export default ListList;
