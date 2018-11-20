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
      this.cacheStateMap = null;
      this.state = this.genStateBySchemas();
      callbackQueue.push(this.callback);
    }

    shouldComponentUpdate(nextProps) {
      this.shallowCompareProps(nextProps);
      return this.shouldComponentUpdateFlag;
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
        this.shouldComponentUpdateFlag = false;
        return;
      }
      this.memoizedGlobalState = currentState;
      const modelNext = this.genStateBySchemas();
      this.setState(modelNext);
    };

    // todo 应该有未知节点提示
    traverse = (node) => {
      if (Object.is(this.cacheStateMap, null)) {
        this.cacheStateMap = new Map();
      }
      if (hasModel(node)) {
        const result = referToState(node);
        if (!this.shouldComponentUpdateFlag && this.cacheStateMap.has(node)) {
          const cacheResult = this.cacheStateMap.get(node);
          if (!Object.is(cacheResult, result)) {
            this.shouldComponentUpdateFlag = true;
          }
        }
        this.cacheStateMap.set(node, result);
        return result;
      }
      if (getType(node) === '[object Object]') {
        const result = {};
        Object.keys(node).forEach((key) => {
          result[key] = this.traverse(node[key]);
        });
        return result;
      }
      // 未知节点的值会返回undefined
      return undefined;
    }

    genStateBySchemas = () => this.traverse(modelSchemas);

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
        this.shouldComponentUpdateFlag = true;
        return;
      }
      for (let i = 0; i < preKeys.length; i += 1) {
        const key = preKeys[i];
        if (!Object.is(this.props[key], nextProps[key])) {
          this.shouldComponentUpdateFlag = true;
          break;
        }
      }
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
};

export default reglux;
