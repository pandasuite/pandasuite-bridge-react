import React from 'react';
import PropTypes from 'prop-types';

const Button = function Button(props) {
  const { children, loading, primary, className, ...rest } = props;

  return (
    <button
      className={`inline-flex items-center py-1 px-5 text-sm font-medium rounded ${primary ? 'text-white bg-green-500 hover:bg-green-600' : 'text-purple-600 bg-gray-100 hover:bg-gray-200'} focus:outline-none transition ease-in-out duration-150 ${className || ''}`}
      {...rest}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-purple-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      { children }
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Button;
