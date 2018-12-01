import { observable, computed, action } from 'mobx';
import { request } from '../api/request';
import { Photo } from '../models';

class PhotoStore {
  @observable
  photos = [];

  @observable
  albumId;

  @computed
  get countPhoto() {
    return this.photos.length;
  }

  async fetchData() {
    const { albumId } = this;
    const url = albumId
      ? `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
      : 'https://jsonplaceholder.typicode.com/albums';
    const res = await request(url, null, 'GET');
    this.setPhotos(res.map(p => new Photo(p)));
  }

  @action.bound
  setAlbum(albumId) {
    this.albumId = albumId;
  }

  @action.bound
  setPhotos(photos) {
    this.photos = photos;
  }
}

export default new PhotoStore();
