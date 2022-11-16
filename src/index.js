import React from 'react';
import { render } from 'react-dom';

import Counter from './Counter';

import './styles.scss';

const Index = () => {
  return (
    <main className="Application">
      <section className="Counters">
        <Counter max={10} step={1} />
      </section>
    </main>
  );
};

render(<Index />, document.getElementById('root'));