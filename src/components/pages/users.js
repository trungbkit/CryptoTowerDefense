import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

@inject('userStore', 'albumStore')
@observer
class Users extends React.Component {
  componentDidMount() {
    const { userStore } = this.props;
    userStore.fetchData();
  }

  selectUser(userId) {
    const { albumStore } = this.props;
    albumStore.setUser(userId);
    albumStore.fetchData();
  }

  render() {
    const { userStore, albumStore } = this.props;
    return (
      <ul className="list">
        {userStore.users.map(u => (
          <div
            key={u.id}
            className={`item ${u.id === albumStore.userId ? 'active' : ''}`}
            onClick={() => this.selectUser(u.id)}
          >
            {u.name} - {u.email}
          </div>
        ))}
      </ul>
    );
  }
}

Users.propTypes = {
  userStore: PropTypes.instanceOf(PropTypes.object),
  albumStore: PropTypes.instanceOf(PropTypes.object),
};

export default Users;
