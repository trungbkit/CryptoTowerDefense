import { observable, action } from 'mobx';

class Notification {
  @observable
  notifications = [];

  @action.bound
  push(_notification) {
    this.notifications.push(_notification);
    setTimeout(() => this.remove(_notification.id), 4000);
  }

  @action.bound
  remove(id) {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }
}

export default new Notification();
