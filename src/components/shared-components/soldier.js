import React from 'react';
import PropTypes from 'prop-types';

const Soldier = ({
  type, quantity, onClick, isSmall, showNumber = true, animate = false,
}) => (
  <div className={`soldier ${type} ${isSmall ? 'mini' : ''} ${animate ? 'animate' : ''}`} onClick={() => onClick && onClick()}>
    {showNumber ? <div className="quantity">{quantity}</div> : null}
  </div>
);

Soldier.propTypes = {
  type: PropTypes.string,
  quantity: PropTypes.number,
  onClick: PropTypes.func,
  isSmall: PropTypes.bool,
  showNumber: PropTypes.bool,
  animate: PropTypes.bool,
};

export default Soldier;
