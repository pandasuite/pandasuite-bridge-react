import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = function Checkbox(props) {
  const { children, className, ...rest } = props;

  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className={`form-checkbox rounded bg-gray-100 border-transparent focus:border-transparent focus:ring-0 hover:bg-gray-200 focus:bg-gray-200 checked:bg-gray-100 focus:outline-none" ${className || ''}`} {...rest}
      />
      <span className="ml-2 text-sm">{ children }</span>
    </label>
  );
};

Checkbox.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Checkbox;
