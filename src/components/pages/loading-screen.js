import React from 'react';
import PropTypes from 'prop-types';

const LoadingScreen = ({ progress }) => (
  <div className="loading-screen">
    <div className="logo">
      <div className="text">Loading...</div>
    </div>
    <div className="progress-bar">
      <div className="filler" style={{ width: progress * 300 }} />
    </div>
  </div>
);

LoadingScreen.propTypes = {
  progress: PropTypes.number,
};

export default LoadingScreen;
