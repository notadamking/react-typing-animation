import React from 'react';
import PropTypes from 'prop-types';

import Typing, { Backspace, Delay, Reset, Speed } from '../src';

const TestComponent = ({ children }) => <div>{children}</div>;

TestComponent.propTypes = { children: PropTypes.node };

const App = () => (
  <Typing loop startDelay={0} speed={5}>
    <span>This is a <span>non-test</span></span>
    <Reset count={1} delay={500} />
    test
    <br />
    this line will get reset
    <Reset count={1} />
    <Delay ms={1000} />
    this whole line will get erased
    <br />
    <Backspace delay={500} count={32} />
    <Delay ms={1000} />
    <Speed ms={100} />
    this line
    <br />
    and this line will now get erased
    <Backspace delay={500} count={43} />
    <span>this is a span</span>
    <Backspace count={4} />
    <div>that span should have just gotten removed</div>
    <span><span>this is a two deep span</span></span>
    <br />
    <span>this is a <a href="/">link</a>.</span>
    <div>and a div</div>
    <TestComponent>
      test component backspace
    </TestComponent>
    <Backspace count={10} />
    <Delay ms={2000} />
    <Reset />
    Goodbye!
  </Typing>
);

export default App;
