import React from 'react';
import PropTypes from 'prop-types';

const DropdownItem = function DropdownItem(props) {
  const { children, className, ...rest } = props;

  return (
    <option
      className={`${className || ''}`}
      {...rest}
    >
      { children }
    </option>
  );
};

DropdownItem.propTypes = {
  children: PropTypes.func.isRequired,
};

export default DropdownItem;
