import React from 'react';
import PropTypes from 'prop-types';

const Soldier = ({ type, quantity }) => (
  <div className="soldier">

  </div>
);

Soldier.propTypes = {
  type: PropTypes.string,
  quantity: PropTypes.number,
};

export default Soldier;
