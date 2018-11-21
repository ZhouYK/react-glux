import {
  createStore, combineReducers,
} from 'redux';
import app from './models/app/model';
import book from './models/book/model';
import DevTool from './DevTool';
import { destruct } from '../src/index';

const store = createStore(() => {}, {}, DevTool().instrument());
const { reducers, connect } = destruct(store)({ app, book });
store.replaceReducer(combineReducers(reducers));

export {
  store,
  connect,
};
