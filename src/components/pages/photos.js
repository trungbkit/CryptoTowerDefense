import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

@inject('photoStore')
@observer
class Photos extends React.Component {
  render() {
    const { photoStore } = this.props;
    return (
      <ul className="list">
        {photoStore.photos.map(p => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="photo-item"
          >
            <img src={p.thumbnailUrl} alt={p.title} />
            {p.title}
          </a>
        ))}
      </ul>
    );
  }
}

Photos.propTypes = {
  photoStore: PropTypes.instanceOf(PropTypes.object),
};

export default Photos;
