import {useReducer} from 'react';

const middleware = dispatch => {
  return action => {
    if (action instanceof Promise) {  // TODO: IE
      action.then(
        next => dispatch(next)
      ).catch(
        reason => console.warn(`do not reject in your async action(reject reason: ${reason})`)
      );
    } else {
      dispatch(action);
    }
  };
};

const buildContextFunc = (initState, Models) => () => {
  const reducer = (state, {type, payload}) => {
    return Models[type].reducer(state, payload);
  };

  const [state, dispatch] = useReducer(reducer, initState);

  const Actions = {};
  Object.keys(Models).forEach((actionType) => {
    if (Models[actionType].action) {
      Actions[actionType] = Models[actionType].action;
    }
  });

  return {state, dispatch: middleware(dispatch), Actions: Object.freeze(Actions)};
};

export default buildContextFunc;
