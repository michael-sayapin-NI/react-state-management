import React, { useState } from "react";

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem("counterState");

  if (storage) {
    return JSON.parse(storage);
  }

  return { count: 0 };
};

const Counter = ({ max, step }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((count) => {
      if (count >= max) {
        return count;
      }

      return count + step;
    });
  };
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="Counter">
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>
  );
};

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
