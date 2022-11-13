import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    }

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  /**
   * Effectively, we are queuing up state changes, so React will batch them up, figure out the result and then
   * efficiently make that change.
   */
  increment() {
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
  }

  /**
   * When we pass functions to setState(), React plays through each of them
   */
  reset() {
    this.setState(() => {
      return { count: 0};
    });
  }

  /**
   * We can use the props to the component directly from the setState method
   */
  decrement() {
    this.setState((state, props) => {
      const { max, step } = props;
      if (state.count >= max) {
        return;
      }

      return { count: state.count - step }
    });
  }

  render() {
    const { count } = this.state;

    return (
      <div className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={this.reset}>Reset</button>
        </section>
      </div>
    );
  }
}

export default Counter;
