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
      this.cacheState = null;
      this.shouldComponentUpdateFlag = false;
      this.state = this.genStateBySchemas();
      this.callback = () => {
        this.shouldComponentUpdateFlag = false;
        const modelNext = this.genStateBySchemas();
        this.setState(modelNext);
      };
    }

    componentDidMount() {
      callbackQueue.push(this.callback);
    }

    shouldComponentUpdate() {
      return this.shouldComponentUpdateFlag;
    }

    componentWillUnmount() {
      const index = callbackQueue.indexOf(this.callback);
      callbackQueue.splice(index, 1);
    }

    // todo 应该有未知节点提示
    traverse = (node) => {
      if (Object.is(this.cacheState, null)) {
        this.cacheState = new Map();
      }
      if (hasModel(node)) {
        const result = referToState(node);
        if (!this.shouldComponentUpdateFlag && this.cacheState.has(node)) {
          const cacheResult = this.cacheState.get(node);
          if (!Object.is(cacheResult, result)) {
            this.shouldComponentUpdateFlag = true;
          }
        }
        this.cacheState.set(node, result);
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

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
};

export default reglux;
