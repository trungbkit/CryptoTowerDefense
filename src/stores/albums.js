import { observable, computed, action } from 'mobx';
import { request } from '../api/request';
import { Album } from '../models';

class AlbumStore {
  @observable
  albums = [];

  @observable
  userId;

  @computed
  get countAlbum() {
    return this.albums.length;
  }

  async fetchData() {
    const { userId } = this;
    const url = userId
      ? `https://jsonplaceholder.typicode.com/users/${userId}/albums`
      : 'https://jsonplaceholder.typicode.com/albums';
    const res = await request(url, null, 'GET');
    this.setAlbums(res.map(a => new Album(a)));
  }

  @action.bound
  setUser(userId) {
    this.userId = userId;
  }

  @action.bound
  setAlbums(albums) {
    this.albums = albums;
  }
}

export default new AlbumStore();
