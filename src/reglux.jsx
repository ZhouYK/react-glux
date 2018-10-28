import React, { Component } from 'react';

const reglux = store => (referToState) => {
  const callbackQueue = [];
  store.subscribe(() => {
    callbackQueue.forEach((fn) => {
      fn();
    });
  });
  return modelSchema => WrappedComponent => class Connect extends Component {
    constructor(props) {
      super(props);
      this.state = {
        model: referToState(modelSchema),
      };
      this.callback = () => {
        const { model } = this.state;
        const modelNext = referToState(modelSchema);
        if (!Object.is(model, modelNext)) {
          this.setState({
            model: modelNext,
          });
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

    render() {
      const { model } = this.state;
      return <WrappedComponent {...this.props} model={model} />;
    }
  };
};

export default reglux;
