import React from 'react';
import Soldier from '../shared-components/soldier';

const Main = () => (
  <div className="main py-4">
    <div className="container">
      <section className="align-items-center d-flex mb-4 tower-info">
        <div className="tower-avatar" style={{backgroundImage: 'url(/images/sand-castle.png)'}}></div>
        <div className="d-flex flex-column ml-2">
          <div className="health-bar">
            <div style={{ backgroundColor: '#FF3636', width: '80%' }}></div>
          </div>
          <div className="username">Username 1</div>
        </div>
      </section>
      <Soldier type="earth" quantity={4} />
    </div>
    {/* <Soldier type="fire" quantity={4} />
    <Soldier type="water" quantity={4} />
    <Soldier type="wood" quantity={4} />
    <Soldier type="metal" quantity={4} /> */}
  </div>
);

export default Main;
