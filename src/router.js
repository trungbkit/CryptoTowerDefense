import React from 'react';
import {
  Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { Main, LoadingScreen } from './components/pages';
import history from './utils/history';

const CONDITION = true;

class MyRouter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
    };
  }

  componentDidMount() {
    setTimeout(() => this.initProgress(), 1000);
  }

  finishProgress = () => {
    const { progress } = this.state;
    if (progress >= 0.9) {
      return;
    }
    this.setState({ progress: progress + 0.1 });
    setTimeout(this.finishProgress, 100);
  };

  checkStatus = () => {
    if (CONDITION) {
      return this.finishProgress();
    }
    setTimeout(this.checkStatus, 100);
  };

  initProgress = () => {
    const { progress } = this.state;
    if (progress >= 0.5) {
      this.checkStatus();
      return;
    }
    this.setState({ progress: progress + 0.1 });
    setTimeout(this.initProgress, 100);
  };

  render() {
    const { progress } = this.state;
    return progress >= 0.9 ? (
      <Router history={history}>
        <Switch>
          <Route path="/main" component={Main} />
          <Route path="/" exact={true} render={() => <Redirect to="/main" />} />
        </Switch>
      </Router>
    ) : (
      <LoadingScreen progress={progress} />
    );
  }
}

export default MyRouter;
