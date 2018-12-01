import React from 'react';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { Notification } from './components/shared-components';
import Router from './router';
import stores from './stores';

configure({ enforceActions: 'observed' });

const App = () => (
  <Provider {...stores}>
    <React.Fragment>
      <Router />
      <Notification />
    </React.Fragment>
  </Provider>
);

export default App;
