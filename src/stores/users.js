import { observable, action, computed } from 'mobx';

class UserStore {
  @observable
  id = null;

  @observable
  username = 'Username 1';

  @observable
  address = null;

  @observable
  obstacles = ['fire', 'metal', 'wood', 'water', 'earth'];

  @observable
  soldiers = [
    {
      id: 1,
      type: 'earth',
      quantity: 4,
    },
    {
      id: 2,
      type: 'wood',
      quantity: 4,
    },
    {
      id: 3,
      type: 'water',
      quantity: 2,
    },
    {
      id: 4,
      type: 'fire',
      quantity: 4,
    },
    {
      id: 5,
      type: 'metal',
      quantity: 1,
    }
  ];

  @computed
  get obstacleCount() {
    return this.obstacles.length;
  }

  @action.bound
  setData(id, username, address, obstacles) {
    if (id) {
      this.id = id;
    }
    if (username) {
      this.username = username;
    }
    if (address) {
      this.address = address;
    }
    if (obstacles) {
      this.obstacles = obstacles;
    }
  }
}

export default new UserStore();
