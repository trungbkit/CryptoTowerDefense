import React from 'react';
import Modal from 'react-responsive-modal';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { Soldier } from '../shared-components';
import keyGen from '../../utils/keyGenerator';

@observer
@inject('userStore')
class Main extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { soldiers, obstacles } = nextProps.userStore;
    if (!prevState.loaded) {
      return {
        loaded: true,
        freeObstacles: Array.from(obstacles),
        freeSoldiers: Array.from(soldiers),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      selectedSoldiers: new Array(5).fill(null),
      selectedObstacles: new Array(5).fill(null),
      freeObstacles: [],
      freeSoldiers: [],
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
        <div className={`obstacle ${obs}`} onClick={() => onClick(index)} key={keyGen()} />
      ) : (
        <div className="empty-item" key={keyGen()} />
      ))
    );
  }

  renderSoldierList(list, onClick, isSmall, showNumber = true, animate = false) {
    if (!list) {
      return null;
    }
    return list.map(
      (sol, index) => (sol ? (
        <Soldier
          key={keyGen()}
          onClick={() => onClick(index)}
          type={sol.type}
          isSmall={isSmall}
          quantity={sol.quantity}
          showNumber={showNumber}
          animate={animate}
        />
      ) : (
        <div className={`empty-item ${isSmall ? 'mini' : ''}`} key={keyGen()} />
      ))
    );
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

  selectSoldier(index) {
    const { selectedSoldiers, freeSoldiers } = this.state;
    if (!selectedSoldiers[4]) {
      const i = selectedSoldiers.findIndex(sol => !sol);
      selectedSoldiers[i] = freeSoldiers[index];
      let newFreeSoldiers = [...freeSoldiers];
      newFreeSoldiers[index].quantity -= 1;
      if (!newFreeSoldiers[index].quantity) {
        newFreeSoldiers = this.removeItem(newFreeSoldiers, index);
      }
      this.setState({ selectedSoldiers, freeSoldiers: newFreeSoldiers });
    }
  }

  removeSoldier(index) {
    // const { selectedSoldiers, freeSoldiers } = this.state;
  }

  currentHealth() {
    const { selectedObstacles } = this.state;
    const res = selectedObstacles.reduce((prev, curr) => (curr ? prev + 20 : prev), 0);
    return res;
  }

  onModalClosed = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      freeSoldiers,
      selectedSoldiers,
      freeObstacles,
      selectedObstacles,
      showModal,
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
          <div className="item-list">
            {this.renderSoldierList(freeSoldiers, i => this.selectSoldier(i), true)}
          </div>
          <div className="item-list mt-3">
            {this.renderSoldierList(
              selectedSoldiers,
              i => this.removeSoldier(i),
              false,
              false,
              true
            )}
          </div>
          <div>
            <input type="text" className="my-input" placeholder="Target address" />
          </div>
          <div className="d-flex justify-content-center mt-2">
            <button className="my-button">Start attack</button>
          </div>
        </Modal>
      </div>
    );
  }
}

Main.propTypes = {
  userStore: PropTypes.instanceOf(PropTypes.object),
};

export default Main;
