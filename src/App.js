import React from 'react';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import Router from './router';
import stores from './stores';

configure({ enforceActions: 'observed' });

const App = () => (
  <Provider {...stores}>
    <Router />
  </Provider>
);

export default App;
