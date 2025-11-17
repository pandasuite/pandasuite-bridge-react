import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import classNames from '../utils/classNames';

const getDefaultActiveKey = (children) => {
  const firstChild = children.find((child) => child.props?.eventKey != null);
  return firstChild?.props.eventKey;
};

const renderContent = (activeKey, children) => {
  const match = children.find((child) => child.props?.eventKey === activeKey);
  return match?.props.children ?? null;
};

function Tabs({
  children,
  activeKey,
  className,
  contentClassName,
  onTabChange,
}) {
  const items = useMemo(
    () => React.Children.toArray(children).filter(Boolean),
    [children],
  );

  const initialActiveKey = activeKey ?? getDefaultActiveKey(items);
  const [internalActiveKey, setInternalActiveKey] = useState(initialActiveKey);

  const currentActiveKey = activeKey ?? internalActiveKey;

  const handleSelect = (eventKey) => {
    if (activeKey === undefined) {
      setInternalActiveKey(eventKey);
    }

    if (typeof onTabChange === 'function') {
      onTabChange(eventKey);
    }
  };

  return (
    <>
      <div
        className={classNames(
          'sticky top-0 z-50 flex w-full bg-white',
          className,
        )}
      >
        {items.map((child) => {
          const { title, eventKey } = child.props;
          const isActive = currentActiveKey === eventKey;

          if (!title) {
            return null;
          }

          return (
            <button
              key={eventKey}
              type="button"
              className={classNames(
                'm-1 mt-0 border-t-2 p-1 focus:outline-none',
                isActive ? 'border-indigo-600' : 'border-white',
              )}
              onClick={() => handleSelect(eventKey)}
            >
              <span
                className={classNames(
                  'pt-2.5 font-sans text-base uppercase',
                  isActive ? 'text-gray-700' : 'text-gray-400',
                )}
              >
                {title}
              </span>
            </button>
          );
        })}
      </div>
      <div className={classNames('px-2 pb-2.5', contentClassName)}>
        {renderContent(currentActiveKey, items)}
      </div>
    </>
  );
}

Tabs.propTypes = {
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  onTabChange: PropTypes.func,
};

Tabs.defaultProps = {
  activeKey: undefined,
  className: undefined,
  contentClassName: undefined,
  onTabChange: undefined,
};

export default Tabs;
