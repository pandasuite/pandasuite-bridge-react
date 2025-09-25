import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import classNames from '../utils/classNames';

const DropdownItem = forwardRef(({ children, className, ...rest }, ref) => {
  const optionClassName = classNames(className) || undefined;

  return (
    <option ref={ref} className={optionClassName} {...rest}>
      {children}
    </option>
  );
});

DropdownItem.displayName = 'DropdownItem';

DropdownItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

DropdownItem.defaultProps = {
  children: null,
  className: undefined,
};

export default DropdownItem;
