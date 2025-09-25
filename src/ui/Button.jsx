import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import classNames from '../utils/classNames';

const Button = forwardRef(
  (
    { children, loading, primary, className, type = 'button', ...rest },
    ref,
  ) => {
    const variantClass = primary
      ? 'text-white bg-green-500 hover:bg-green-600'
      : 'text-purple-600 bg-gray-100 hover:bg-gray-200';

    return (
      <button
        ref={ref}
        className={classNames(
          'inline-flex items-center gap-2 rounded px-5 py-1 text-sm font-medium transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2',
          variantClass,
          className,
        )}
        type={type}
        {...rest}
      >
        {loading && (
          <svg
            className="-ml-1 h-5 w-5 animate-spin text-purple-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  loading: PropTypes.bool,
  primary: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

Button.defaultProps = {
  className: undefined,
  loading: false,
  primary: false,
  type: 'button',
};

export default Button;
