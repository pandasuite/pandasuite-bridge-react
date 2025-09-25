import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import classNames from '../utils/classNames';

const stylesByType = {
  danger: {
    container: 'bg-red-50 text-red-600',
    icon: (
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    ),
  },
  info: {
    container: 'bg-blue-50 text-blue-600',
    icon: (
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    ),
  },
  success: {
    container: 'bg-green-50 text-green-600',
    icon: (
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.172 7.707 8.879a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    ),
  },
  warning: {
    container: 'bg-yellow-50 text-yellow-700',
    icon: (
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.682-1.36 3.447 0l6.516 11.59c.75 1.335-.213 3.011-1.724 3.011H3.465c-1.511 0-2.474-1.676-1.724-3.011l6.516-11.59zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-.25-5.75a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"
        clipRule="evenodd"
      />
    ),
  },
};

const Alert = forwardRef(({ children, type, className, ...rest }, ref) => {
  const { container, icon } = stylesByType[type] ?? stylesByType.info;

  return (
    <div
      ref={ref}
      className={classNames(
        'flex items-center gap-2 rounded-lg p-5 text-base font-light',
        container,
        className,
      )}
      {...rest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 opacity-60"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden
      >
        {icon}
      </svg>
      {children}
    </div>
  );
});

Alert.displayName = 'Alert';

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
};

Alert.defaultProps = {
  className: undefined,
  type: 'info',
};

export default Alert;
