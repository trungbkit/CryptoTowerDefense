import React from 'react';
import Modal from "react-responsive-modal";
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { Soldier, Obstacle } from '../shared-components';
import keyGen from '../../utils/keyGenerator';

@observer
@inject('userStore')
class Main extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { soldiers, obstacles } = nextProps.userStore;
    if (!prevState.freeObstacles) {
      return {
        freeObstacles: Array.from(obstacles),
        soldiers,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      soldiers: new Array(5).fill(null),
      selectedObstacles: new Array(5).fill(null),
      showModal: false,
    };
  }

  removeItem(list, index) {
    const { length } = list;
    const newList = [...list];
    for (let i = index; i < length; i += 1) {
      newList[i] = newList[i + 1] || null;
    }
    return newList;
  }

  renderObstacleList(list, onClick) {
    return list.map(
      (obs, index) => (obs ? (
        <Obstacle onClick={() => onClick(index)} type={obs} key={keyGen()} />
      ) : (
        <div className="empty-item" key={keyGen()} />
      ))
    );
  }

  renderSoldierList(list) {
    return list.map(sol => <Soldier key={keyGen()} type={sol.type} quantity={sol.quantity} />);
  }

  selectObstacle(index) {
    const { selectedObstacles, freeObstacles } = this.state;
    if (!selectedObstacles[4]) {
      const i = selectedObstacles.findIndex(obs => !obs);
      selectedObstacles[i] = freeObstacles[index];
      const newFreeObstacles = this.removeItem(freeObstacles, index);
      this.setState({ selectedObstacles, freeObstacles: newFreeObstacles });
    }
  }

  removeObstacle(index) {
    const { selectedObstacles, freeObstacles } = this.state;
    const i = freeObstacles.findIndex(obs => !obs);
    freeObstacles[i] = selectedObstacles[index];
    const newSelectedObstacles = this.removeItem(selectedObstacles, index);
    this.setState({ selectedObstacles: newSelectedObstacles, freeObstacles });
  }

  currentHealth() {
    const { selectedObstacles } = this.state;
    const res = selectedObstacles.reduce((prev, curr) => (curr ? prev + 20 : prev), 0);
    return res;
  }

  onModalClosed = () => {
    this.setState({ showModal: false });
  }

  render() {
    const {
      soldiers, freeObstacles, selectedObstacles, showModal,
    } = this.state;
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
                <div style={{ backgroundColor: '#FF3636', width: `${this.currentHealth()}%` }} />
              </div>
              <div className="username">Username 1</div>
            </div>
          </section>
          <div className="title">My tower</div>
          <div className="d-flex align-items-center">
            <div className="item-list">
              {this.renderObstacleList(selectedObstacles, i => this.removeObstacle(i))}
            </div>
            <button className="my-button ml-3">Save</button>
          </div>
          <div className="tower">
            <div className="title">Obstacle queue</div>
            <div className="item-list">
              {this.renderObstacleList(freeObstacles, i => this.selectObstacle(i))}
            </div>
          </div>
          <div className="title">My soldies</div>
          <div className="d-flex align-items-center">
            <div className="item-list">{this.renderSoldierList(userStore.soldiers)}</div>
            <button className="my-button ml-3" onClick={() => this.setState({ showModal: true })}>
              Attack
            </button>
          </div>
        </div>
        <Modal open={showModal} onClose={this.onModalClosed} center>
          <h3>Setup for your army</h3>

        </Modal>
      </div>
    );
  }
}

Main.propTypes = {
  userStore: PropTypes.instanceOf(PropTypes.object),
};

export default Main;
