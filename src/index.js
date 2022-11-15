import React from 'react';
import { render } from 'react-dom';

// import Counter from './Counter';
import CounterFunctional from "./CounterFunctional";

import './styles.scss';

const Index = () => {
  return (
    <main className="Application">
      <section className="Counters">
        {/*<Counter max={-15} step={1} />*/}
        <CounterFunctional max={10} step={1} />
      </section>
    </main>
  );
};

render(<Index />, document.getElementById('root'));