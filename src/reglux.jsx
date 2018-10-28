import React, { Component } from 'react';

const reglux = store => (referToState) => {
  const callbackQueue = [];
  store.subscribe(() => {
    callbackQueue.forEach((fn) => {
      fn();
    });
  });
  return modelSchemas => WrappedComponent => class Connect extends Component {
    constructor(props) {
      super(props);
      this.schemaKeys = Object.keys(modelSchemas);
      this.state = this.genStateBySchemas();
      this.callback = () => {
        const curModel = this.state;
        const modelNext = this.genStateBySchemas();
        if (!this.compareCurAndNext(curModel, modelNext)) {
          this.setState(modelNext);
        }
      };
    }

    componentDidMount() {
      callbackQueue.push(this.callback);
    }

    componentWillUnmount() {
      const index = callbackQueue.indexOf(this.callback);
      callbackQueue.splice(index, 1);
    }

    compareCurAndNext = (curModel, nextModel) => {
      const arr = this.schemaKeys.filter(key => !Object.is(curModel[key], nextModel[key]));
      return arr.length === 0;
    }

    genStateBySchemas = () => this.schemaKeys.reduce((pre, cur) => {
      /* eslint no-param-reassign:1 */
      pre[cur] = referToState(modelSchemas[cur]);
      return pre;
    }, {})


    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
};

export default reglux;
