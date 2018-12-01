import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

@inject('albumStore', 'photoStore')
@observer
class Albums extends React.Component {
  selectAlbum(album) {
    const { photoStore } = this.props;
    photoStore.setAlbum(album.id);
    photoStore.fetchData();
  }

  render() {
    const { albumStore, photoStore } = this.props;
    return (
      <ul className="list">
        {albumStore.albums.map(a => (
          <div
            className={`item ${a.id === photoStore.albumId ? 'active' : ''}`}
            key={a.id}
            onClick={() => this.selectAlbum(a)}
          >
            {a.title}
          </div>
        ))}
      </ul>
    );
  }
}

Albums.propTypes = {
  albumStore: PropTypes.instanceOf(PropTypes.object),
  photoStore: PropTypes.instanceOf(PropTypes.object),
};

export default Albums;
