import React, {useEffect, useState} from 'react';

const CounterFunctional = ({ max, step }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Counter ${count}`;
  }, [count]);

  // const increment = () => {
  //   setCount(count + 1);
  //   setCount(count + 1);
  //   setCount(count + 1);
  // };

  /**
   * We can pass a function to the setCount function
   */
  const increment = () => {
    setCount((count) => {
      if (count >= max) {
        return count;
      }

      return count + step;
    })
  }

  /**
   * We can pass the new
   */
  const decrement = () => {
    setCount((count) => count - step);
    setCount((count) => count - step);
    setCount((count) => count - step);
  };

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
}

export default CounterFunctional;