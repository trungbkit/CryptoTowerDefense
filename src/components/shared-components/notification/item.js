import React from 'react';
import PropTypes from 'prop-types';

const dangerIcon = '/images/danger-icon.svg';
const successIcon = '/images/success-icon.svg';

const NotificationItem = ({ notification, remove }) => {
  const {
    title, message, type,
  } = notification;
  return (
    <div className="notification-item">
      <div className="title-container">
        <div className="title-wrapper">
          <img src={type === 'success' ? successIcon : dangerIcon} alt="success" />
          <span>{title}</span>
        </div>
        <div className="close" onClick={remove}>
          ×
        </div>
      </div>
      <div className="message">{message}</div>
    </div>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.instanceOf(Object),
  remove: PropTypes.func,
};

export default NotificationItem;
