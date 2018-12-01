import { observable, computed, action } from 'mobx';
import User from '../models/user';
import { request } from '../api/request';

class UserStore {
  @observable
  users = [];

  @computed
  get countUser() {
    return this.users.length;
  }

  async fetchData() {
    const res = await request('https://jsonplaceholder.typicode.com/users', null, 'GET');
    this.setUsers(res.map(u => new User(u)));
  }

  @action.bound
  setUsers(users) {
    this.users = users;
  }
}

export default new UserStore();
