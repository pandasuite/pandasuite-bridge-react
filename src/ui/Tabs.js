import React, { useState } from 'react';
import PropTypes from 'prop-types';

import each from 'lodash/each';
import map from 'lodash/map';

function getDefaultActiveKey(children) {
  let defaultActiveKey;

  each(children, (child) => {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });

  return defaultActiveKey;
}

function renderContent(activeKey, children) {
  let content = null;

  each(children, (child) => {
    if (child.props.eventKey == activeKey) {
      content = child.props.children;
    }
  });

  return content;
}

const Tabs = function Tabs(props) {
  const children = React.Children.toArray(props.children);
  const { activeKey = getDefaultActiveKey(children), className } = props;
  const [currentActiveKey, setCurrentActiveKey] = useState(activeKey);

  return (
    <>
      <div className={`flex sticky top-0 z-50 bg-white w-full ${className || ''}`}>
        {map(children, (child) => {
            const { title, eventKey } = child.props;
            const isActive = currentActiveKey == eventKey;

            if (title == null) {
              return null;
            }

            return (
              <button
                type="button"
                eventKey={eventKey}
                className={`border-t-2 m-1 mt-0 p-1 focus:outline-none ${isActive ? 'border-indigo-600' : 'border-white'}`}
                onClick={() => { setCurrentActiveKey(eventKey); }}
              >
                <span
                  className={`uppercase font-sans text-base pt-2.5 ${isActive ? 'text-gray-700' : 'text-gray-400'}`}
                >
                  {title}
                </span>
              </button>
            );
          })}
      </div>
      <div className="px-2 pb-2.5">
        {renderContent(currentActiveKey, children)}
      </div>
    </>
  );
};

Tabs.propTypes = {
  children: PropTypes.func.isRequired,
  activeKey: PropTypes.string,
};

export default Tabs;
