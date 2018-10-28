import { destruct as dst } from 'glue-redux';
import reglux from './reglux';

export const destruct = store => (model) => {
  const { reducers, referToState } = dst(store)(model);
  const connect = reglux(store)(referToState);
  return {
    reducers,
    connect,
  };
};

export default destruct;
