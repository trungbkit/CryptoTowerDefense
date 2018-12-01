import React from 'react';
import Modal from 'react-responsive-modal';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { Soldier } from '../shared-components';
import keyGen from '../../utils/keyGenerator';
import Notification from '../../models/notification';

const SHOP_ITEMS = {
  soldiers: [
    {
      id: 1,
      type: 'fire',
      price: 0.1,
    },
    {
      id: 2,
      type: 'water',
      price: 0.1,
    },
    {
      id: 3,
      type: 'wood',
      price: 0.1,
    },
    {
      id: 4,
      type: 'metal',
      price: 0.1,
    },
    {
      id: 5,
      type: 'earth',
      price: 0.1,
    },
  ],
  obstacles: [
    {
      id: 6,
      type: 'fire',
      price: 0.05,
    },
    {
      id: 7,
      type: 'water',
      price: 0.05,
    },
    {
      id: 8,
      type: 'wood',
      price: 0.05,
    },
    {
      id: 9,
      type: 'metal',
      price: 0.05,
    },
    {
      id: 10,
      type: 'earth',
      price: 0.05,
    },
  ],
};

@inject('userStore', 'notificationStore')
@observer
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
      showAttackModal: false,
      showShopModal: false,
    };
  }

  onAttackModalClosed = () => {
    const { userStore } = this.props;
    this.setState({
      showAttackModal: false,
      selectedSoldiers: new Array(5).fill(null),
      freeSoldiers: userStore.soldiers,
    });
  };

  onShopModalClosed = () => {
    this.setState({
      showShopModal: false,
    });
  };

  saveObstacles = () => {
    const { notificationStore } = this.props;
    notificationStore.push(
      new Notification(keyGen(), 'Save obstacles', 'Saved successful!!!', 'success')
    );
  };

  attack = () => {
    const { notificationStore } = this.props;
    notificationStore.push(new Notification(keyGen(), 'Attack', 'Attacked', 'success'));
  };

  removeItem(list, index) {
    const { length } = list;
    const newList = [...list];
    for (let i = index; i < length; i += 1) {
      newList[i] = newList[i + 1] || null;
    }
    return newList;
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
      const sol = newFreeSoldiers[index];
      newFreeSoldiers[index] = { ...sol, quantity: sol.quantity - 1 };
      if (!newFreeSoldiers[index].quantity) {
        newFreeSoldiers = this.removeItem(newFreeSoldiers, index);
      }
      this.setState({ selectedSoldiers, freeSoldiers: newFreeSoldiers });
    }
  }

  removeSoldier(index) {
    const { selectedSoldiers, freeSoldiers } = this.state;
    const removedSol = selectedSoldiers[index];
    const newFreeSoldiers = [...freeSoldiers];
    const i = newFreeSoldiers.findIndex(s => s && s.type === removedSol.type);
    if (i !== -1) {
      const sol = newFreeSoldiers[i];
      newFreeSoldiers[i] = { ...sol, quantity: sol.quantity + 1 };
    } else {
      const newI = newFreeSoldiers.findIndex(s => !s);
      newFreeSoldiers[newI] = { ...removedSol, quantity: 1 };
    }
    const newSelectedSoldiers = this.removeItem(selectedSoldiers, index);
    this.setState({ selectedSoldiers: newSelectedSoldiers, freeSoldiers: newFreeSoldiers });
  }

  currentHealth() {
    const { selectedObstacles } = this.state;
    const res = selectedObstacles.reduce((prev, curr) => (curr ? prev + 20 : prev), 0);
    return res;
  }

  renderObstacleList(list, onClick) {
    return list.map(
      (obs, index) => (obs ? (
        <div className={`obstacle ${obs}`} onClick={() => onClick(index)} key={keyGen()} />
      ) : (
        <div className="empty-item" key={keyGen()}>
          {index + 1}
        </div>
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
          onClick={() => onClick && onClick(index)}
          type={sol.type}
          isSmall={isSmall}
          quantity={sol.quantity}
          showNumber={showNumber}
          animate={animate}
        />
      ) : (
        <div className={`empty-item ${isSmall ? 'mini' : ''}`} key={keyGen()}>
          {!isSmall ? index + 1 : ''}
        </div>
      ))
    );
  }

  render() {
    const {
      freeSoldiers,
      selectedSoldiers,
      freeObstacles,
      selectedObstacles,
      showAttackModal,
      showShopModal,
    } = this.state;
    const { userStore } = this.props;
    return (
      <div className="main py-4">
        <div className="container">
          <section className="align-items-center justify-content-between d-flex mb-4 tower-info">
            <div className="d-flex align-items-center">
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
            </div>
            <img
              className="buy"
              src="/images/shopping-cart.svg"
              onClick={() => this.setState({ showShopModal: true })}
              alt="buy"
            />
          </section>
          <div className="title">My tower</div>
          <div className="d-flex align-items-center">
            <div className="item-list">
              {this.renderObstacleList(selectedObstacles, i => this.removeObstacle(i))}
            </div>
            <div className="d-flex flex-fill justify-content-center align-items-center">
              <button className="my-button ml-3" onClick={this.saveObstacles}>
                Save
              </button>
            </div>
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
            <div className="d-flex flex-fill justify-content-center">
              <button
                className="my-button ml-3"
                onClick={() => this.setState({ showAttackModal: true })}
              >
                Attack
              </button>
            </div>
          </div>
        </div>
        <Modal open={showAttackModal} onClose={this.onAttackModalClosed} center>
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
            <button className="my-button" onClick={this.attack}>
              Start attack
            </button>
          </div>
        </Modal>
        <Modal
          open={showShopModal}
          onClose={this.onShopModalClosed}
          classNames={{ modal: 'shop-modal' }}
        >
          <h3>Shop</h3>
          <div className="item-list">
            {SHOP_ITEMS.soldiers.map(s => (
              <div key={s.id} className="shop-item">
                <Soldier type={s.type} showNumber={false} animate={false} />
                <div className="price">{s.price} ETH</div>
              </div>
            ))}
            {SHOP_ITEMS.obstacles.map(o => (
              <div key={o.id} className="shop-item">
                <div className={`obstacle ${o.type}`} onClick={() => {}} key={keyGen()} />
                <div className="price">{o.price} ETH</div>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    );
  }
}

Main.propTypes = {
  userStore: PropTypes.instanceOf(PropTypes.object),
  notificationStore: PropTypes.instanceOf(PropTypes.object),
};

export default Main;
