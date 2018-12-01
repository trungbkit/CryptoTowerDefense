import React from 'react';
import PropTypes from 'prop-types';

const Obstacle = ({ type, onClick }) => (
  <div className={`obstacle ${type}`} onClick={() => onClick && onClick()} />
);

Obstacle.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default Obstacle;
