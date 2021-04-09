import React from 'react';
import PropTypes from 'prop-types';

import DropdownItem from './DropdownItem';

const Dropdown = function Dropdown(props) {
  const { children, className, ...rest } = props;

  return (
    <select
      className={`py-1 px-3 bg-no-repeat appearance-none rounded text-sm bg-gray-100 border-none hover:bg-gray-200 focus:ring-0 focus:outline-none ${className || ''}`}
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'><path fill='currentColor' d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'></path></svg>")`,
        backgroundPosition: 'right center',
        backgroundPositionY: 'center',
        backgroundPositionX: 'calc(100% - 0.75em)',
        backgroundSize: '9px',
        paddingRight: 'calc(1.5em + 9px)',
      }}
      {...rest}
    >
      { children }
    </select>
  );
};

Dropdown.propTypes = {
  children: PropTypes.func.isRequired,
};

Dropdown.Item = DropdownItem;

export default Dropdown;
