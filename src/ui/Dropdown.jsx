import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import classNames from '../utils/classNames';

import DropdownItem from './DropdownItem';

const caretIcon =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'><path fill='currentColor' d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'/></svg>\")";

const Dropdown = forwardRef(({ children, className, ...rest }, ref) => (
  <select
    ref={ref}
    className={classNames(
      'appearance-none rounded bg-gray-100 px-3 py-1 text-sm transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400',
      className,
    )}
    style={{
      backgroundImage: caretIcon,
      backgroundPosition: 'calc(100% - 0.75em) center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '9px',
      paddingRight: 'calc(1.5em + 9px)',
    }}
    {...rest}
  >
    {children}
  </select>
));

Dropdown.displayName = 'Dropdown';

Dropdown.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Dropdown.defaultProps = {
  children: null,
  className: undefined,
};

Dropdown.Item = DropdownItem;

export default Dropdown;
