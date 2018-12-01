import React from 'react';
import PropTypes from 'prop-types';

const Soldier = ({ type, quantity, onClick }) => (
  <div className={`soldier ${type}`} onClick={() => onClick()}>
    <div className="quantity">
      {quantity}
    </div>
  </div>
);

Soldier.propTypes = {
  type: PropTypes.string,
  quantity: PropTypes.number,
  onClick: PropTypes.func,
};

export default Soldier;
