import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import classNames from '../utils/classNames';

const Input = forwardRef(({ className, type = 'text', ...rest }, ref) => (
  <input
    ref={ref}
    className={classNames(
      'form-input rounded px-3 py-1 text-sm leading-none text-gray-700 transition placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-100 hover:bg-gray-200 border-0',
      className,
    )}
    type={type}
    {...rest}
  />
));

Input.displayName = 'Input';

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

Input.defaultProps = {
  className: undefined,
  type: 'text',
};

export default Input;
