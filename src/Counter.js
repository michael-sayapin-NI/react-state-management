import React, { Component } from 'react';

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');

  if (storage) {
    return JSON.parse(storage);
  }

  return { count: 0 };
}

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = getStateFromLocalStorage();

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
    this.updateDocumentTitle = this.updateDocumentTitle.bind(this);
  }

  updateDocumentTitle() {
    document.title = `Count: ${this.state.count}`;
  }

  /**
   * Effectively, we are queuing up state changes, so React will batch them up, figure out the result and then
   * efficiently make that change.
   */
  increment() {
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 }, this.updateDocumentTitle);
  }

  /**
   * When we pass functions to setState(), React plays through each of them.
   * The setState can receive a second argument, a callback function that will run after the state changes.
   */
  reset() {
    this.setState(() => {
      return { count: 0 };
    }, () => {
      console.log('After state change!', this.state);
      localStorage.setItem('counterState', JSON.stringify(this.state));
      this.updateDocumentTitle();
    });

    console.log('Before state change!', this.state);
  }

  /**
   * We can use the props to the component directly from the setState method
   */
  decrement() {
    this.setState((state, props) => {
      const { max, step } = props;
      if (state.count <= max) {
        return;
      }

      return { count: state.count - step }
    }, this.updateDocumentTitle);
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

/**
 *  SetState Patterns and Side notes:
 *
 *  1. Don't use 'this.state' for derivations of props, instead, derive computed properties directly from the
 *  props themselves.
 *  i.e:
 *  DON'T =>
 *  this.state = {
 *    fullName: props.firstName + ' ' + props.lastName,
 *  };
 *  DO =>
 *  const fullName = props.firstName + ' ' + props.lastName;
 *
 *  2. Don't clutter your render method, break it up to helper functions
 *
 *  3. Don't use state for things you're not going to render.
 *
 *  4. Set sensible defaults in the state
 */