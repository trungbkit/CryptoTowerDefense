import React from 'react';
import Soldier from '../shared-components/soldier';

const Main = () => (
  <div className="main">
    <Soldier type="earth" quantity={4} />
    {/* <Soldier type="fire" quantity={4} />
    <Soldier type="water" quantity={4} />
    <Soldier type="wood" quantity={4} />
    <Soldier type="metal" quantity={4} /> */}
  </div>
);

export default Main;
