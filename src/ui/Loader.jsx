import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import classNames from '../utils/classNames';

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

const labelSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const descriptionSizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const variantClasses = {
  primary: 'text-purple-400',
  neutral: 'text-gray-300',
  inverse: 'text-white',
};

const Loader = forwardRef(
  (
    {
      label,
      description,
      size,
      textPlacement,
      variant,
      className,
      spinnerClassName,
      ariaLabel,
      ...rest
    },
    ref,
  ) => {
    const spinnerSizeClass = sizeClasses[size];
    const labelSizeClass = labelSizes[size];
    const descriptionSizeClass = descriptionSizes[size];
    const colorClass = variantClasses[variant] ?? variantClasses.primary;
    const isHorizontal = textPlacement === 'right';

    return (
      <div
        ref={ref}
        className={classNames(
          'flex items-center',
          isHorizontal ? 'flex-row gap-3 text-left' : 'flex-col gap-3 text-center',
          className,
        )}
        role="status"
        aria-live="polite"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        <svg
          className={classNames(
            'animate-spin',
            spinnerSizeClass,
            colorClass,
            spinnerClassName,
          )}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden={Boolean(label || description)}
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
        {(label || description) && (
          <div className={classNames('flex flex-col gap-1', !isHorizontal && 'items-center')}>
            {label && (
              <span className={classNames('font-medium text-purple-600', labelSizeClass)}>{label}</span>
            )}
            {description && (
              <span className={classNames('text-gray-500', descriptionSizeClass)}>{description}</span>
            )}
          </div>
        )}
        {!label && !description && (
          <span className="sr-only">{ariaLabel}</span>
        )}
      </div>
    );
  },
);

Loader.displayName = 'Loader';

Loader.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  description: PropTypes.node,
  label: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  spinnerClassName: PropTypes.string,
  textPlacement: PropTypes.oneOf(['right', 'bottom']),
  variant: PropTypes.oneOf(['primary', 'neutral', 'inverse']),
};

Loader.defaultProps = {
  ariaLabel: 'Loading',
  className: undefined,
  description: undefined,
  label: undefined,
  size: 'md',
  spinnerClassName: undefined,
  textPlacement: 'bottom',
  variant: 'primary',
};

export default Loader;
