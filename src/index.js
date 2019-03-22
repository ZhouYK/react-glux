import { destruct as dst, gluer } from 'glue-redux';
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

export { gluer };
export default destruct;
