export default class User {
  constructor({
    id, username, address, obstacles,
  }) {
    this.id = id;
    this.username = username;
    this.address = address;
    this.obstacles = obstacles;
  }
}
