import React, { forwardRef, useId } from 'react';
import PropTypes from 'prop-types';

import classNames from '../utils/classNames';

const Checkbox = forwardRef(({ children, className, id, ...rest }, ref) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label className="inline-flex items-center gap-2" htmlFor={inputId}>
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        className={classNames(
          'form-checkbox rounded border-transparent bg-gray-100 text-purple-600 transition focus:border-transparent focus:bg-gray-200 focus:ring-2 focus:ring-purple-400 focus:outline-none hover:bg-gray-200',
          className,
        )}
        {...rest}
      />
      <span className="text-sm">{children}</span>
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
};

Checkbox.defaultProps = {
  children: null,
  className: undefined,
  id: undefined,
};

export default Checkbox;
