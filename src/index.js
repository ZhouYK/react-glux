import { destruct as dst } from 'glue-redux';
import reglux from './reglux';

export const destruct = store => (model) => {
  const { reducers, referToState, hasModel } = dst(store)(model);
  const connect = reglux(store)({ hasModel, referToState });
  return {
    reducers,
    connect,
    referToState,
  };
};

export default destruct;
