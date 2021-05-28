import React from 'react';
import PropTypes from 'prop-types';

const renderColor = (type) => {
  if (type === 'danger') {
    return 'bg-red-50 text-red-600';
  }
  return 'bg-blue-50 text-blue-600';
};

const renderPath = (type) => {
  if (type === 'danger') {
    return <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />;
  }
  return <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />;
};

const Alert = function Alert(props) {
  const {
    children, type, className, ...rest
  } = props;

  return (
    <div
      className={`flex rounded-lg p-5 text-base place-items-center font-light ${renderColor(type)} ${className || ''}`}
      {...rest}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 opacity-60" viewBox="0 0 20 20" fill="currentColor">
        {renderPath(type)}
      </svg>
      { children }
    </div>
  );
};

Alert.defaultProps = {
  type: 'primary',
  className: '',
};

Alert.propTypes = {
  children: PropTypes.func.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Alert;
