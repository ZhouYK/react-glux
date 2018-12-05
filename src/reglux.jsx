import React, { Component } from 'react';
import getType from './getType';


const reglux = store => ({ referToState, hasModel }) => {
  const callbackQueue = [];
  store.subscribe(() => {
    callbackQueue.forEach((fn) => {
      fn();
    });
  });
  return modelSchemas => WrappedComponent => class Connect extends Component {
    constructor(props) {
      super(props);
      this.confirmModelSchemasIsObject();
      this.shouldComponentUpdateFlag = false;
      this.memoizedGlobalState = store.getState();
      this.cacheStateMap = new Map();
      this.state = this.getInitState();
      callbackQueue.push(this.callback);
    }

    shouldComponentUpdate(nextProps) {
      return this.shouldComponentUpdateFlag || this.shallowCompareProps(nextProps);
    }

    componentDidUpdate() {
      this.shouldComponentUpdateFlag = false;
    }

    componentWillUnmount() {
      const index = callbackQueue.indexOf(this.callback);
      callbackQueue.splice(index, 1);
    }

    callback = () => {
      const currentState = store.getState();
      if (Object.is(this.memoizedGlobalState, currentState)) {
        return;
      }
      this.memoizedGlobalState = currentState;
      const modelNext = this.isThereAnyDifference();
      if (this.shouldComponentUpdateFlag) {
        this.setState(modelNext);
      }
    };

    traverse = (handler) => {
      const traverse = (node) => {
        if (hasModel(node)) {
          return handler(node);
        }
        if (getType(node) === '[object Object]') {
          const result = {};
          Object.keys(node).forEach((key) => {
            result[key] = traverse(node[key]);
          });
          return result;
        }
        if (process.env.NODE_ENV === 'development') {
          // 未知节点的值会返回undefined
          console.warn(`the node "${node}" in schema has not be tracked in the store`);
        }
        return undefined;
      };
      return traverse;
    }

    isThereAnyDifference = () => this.traverse((node) => {
      const result = referToState(node);
      const cacheResult = this.cacheStateMap.get(node);
      if (!Object.is(cacheResult, result)) {
        this.shouldComponentUpdateFlag = true;
        // 将不同的写入
        this.cacheStateMap.set(node, result);
      }
      return result;
    })(modelSchemas)

    getInitState = () => this.traverse((node) => {
      const result = referToState(node);
      this.cacheStateMap.set(node, result);
      return result;
    })(modelSchemas);

    confirmModelSchemasIsObject = () => {
      if (!Object.is(getType(modelSchemas), '[object Object]')) {
        console.trace();
        throw new Error('the first param of "connect" must be a plain object');
      }
    }

    shallowCompareProps(nextProps) {
      const preKeys = Object.keys(this.props);
      const nextKeys = Object.keys(nextProps);
      if (preKeys.length !== nextKeys.length) {
        return true;
      }
      for (let i = 0; i < preKeys.length; i += 1) {
        const key = preKeys[i];
        if (!Object.is(this.props[key], nextProps[key])) {
          return true;
        }
      }
      return false;
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
};

export default reglux;
