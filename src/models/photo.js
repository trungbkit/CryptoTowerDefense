export default class Photo {
  constructor({
    albumId, id, title, url, thumbnailUrl,
  }) {
    this.albumId = albumId;
    this.id = id;
    this.title = title;
    this.url = url;
    this.thumbnailUrl = thumbnailUrl;
  }
}
