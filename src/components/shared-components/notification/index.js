import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import NotificationItem from './item';

const Notification = ({ notificationStore }) => (
  <div className="notification-frame">
    {notificationStore.notifications.map(n => (
      <NotificationItem notification={n} key={n.id} remove={() => notificationStore.remove(n.id)} />
    ))}
  </div>
);

Notification.propTypes = {
  notificationStore: PropTypes.instanceOf(Object),
};

export default inject('notificationStore')(observer(Notification));
