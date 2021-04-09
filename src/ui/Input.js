import React from 'react';

const Input = function Input(props) {
  const { className, ...rest } = props;

  return (
    <input
      className={`form-input py-1 px-3 rounded text-sm leading-none bg-gray-100 border-none hover:bg-gray-200 focus:ring-2 focus:ring-purple-400 focus:bg-white focus:outline-none ${className || ''}`}
      type="text"
      {...rest}
    />
  );
};

export default Input;
