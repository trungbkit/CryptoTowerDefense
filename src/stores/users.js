import { observable, action, computed } from 'mobx';

class UserStore {
  @observable
  id = null;

  @observable
  username = '';

  @observable
  address = null;

  @observable
  obstacles = [];

  @observable
  soldiers = [];

  @computed
  obstacleCount() {
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
