import React, { useState, useEffect, useRef } from "react";

/**
 *
 * @param {*} defaultValue
 * @param {string} key
 * @return {[unknown,((value: unknown) => void)]}
 */
const useLocalStorage = (defaultValue, key) => {
  const storage = localStorage.getItem(key);
  const initialValue = storage ? JSON.parse(storage).value : defaultValue;
  const [value, setValue] = useState(initialValue);

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ value }));
  }, [value]);

  return [value, setValue];
};

/**
 * @param {object} props
 * @param {number} props.max
 * @param {number} props.step
 */
const Counter = ({ max, step }) => {
  const [count, setCount] = useLocalStorage(0, "count");
  const countRef = useRef();

  let message = "";
  if (countRef.current < count) {
    message = "Higher";
  } else if (countRef.current > count) {
    message = "lower";
  }

  countRef.current = count;

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

  useEffect(() => {
    document.title = `Counter: ${count}`;
  }, [count]);

  useEffect(() => {
    setCount(count);
  }, [count]);

  useEffect(() => {
    setTimeout(() => {
      console.log(`Count: ${count}`);
    }, 3000);
  }, [count]);

  return (
    <div className="Counter">
      <p>{message}</p>
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
