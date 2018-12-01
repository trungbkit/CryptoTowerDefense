import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { Soldier, Obstacle } from '../shared-components';

@observer
@inject('userStore')
class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      soldiers: [],
      obstacles: [],
    };
  }

  renderObstacleList(list) {
    return list.map(obs => <Obstacle type={obs} key={`${obs}`} />);
  }

  renderSoldierList(list) {
    return list.map(sol => <Soldier key={sol.id} type={sol.type} quantity={sol.quantity} />);
  }

  render() {
    const { soldiers, obstacles } = this.state;
    const { userStore } = this.props;
    return (
      <div className="main py-4">
        <div className="container">
          <section className="align-items-center d-flex mb-4 tower-info">
            <div
              className="tower-avatar"
              style={{ backgroundImage: 'url(/images/sand-castle.png)' }}
            />
            <div className="d-flex flex-column ml-2">
              <div className="health-bar">
                <div style={{ backgroundColor: '#FF3636', width: '80%' }} />
              </div>
              <div className="username">Username 1</div>
            </div>
          </section>
          <div className="tower">
            <div className="title">My tower</div>
            <div className="item-list">
              {this.renderObstacleList(userStore.obstacles)}
            </div>
          </div>
          <div className="d-flex mb-3">
            {this.renderObstacleList(obstacles)}
          </div>
          <div className="d-flex">
            {this.renderSoldierList(userStore.soldiers)}
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  userStore: PropTypes.instanceOf(PropTypes.object),
};

export default Main;
