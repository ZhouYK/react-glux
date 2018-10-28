import {
  createStore, combineReducers,
} from 'redux';
import { model as app } from './glue';
import DevTool from './DevTool';
import { destruct } from '../src/index';

const store = createStore(() => {}, {}, DevTool().instrument());
const { reducers, connect } = destruct(store)({ app });
store.replaceReducer(combineReducers(reducers));

export {
  store,
  connect,
};
