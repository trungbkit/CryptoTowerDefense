import React from 'react';
import { Albums, Users, Photos } from './index';

const Main = () => (
  <div className="main">
    <div className="col">
      <div className="title">Users</div>
      <Users />
    </div>
    <div className="col">
      <div className="title">Albums</div>
      <Albums />
    </div>
    <div className="col">
      <div className="title">Photos</div>
      <Photos />
    </div>
  </div>
);

export default Main;
