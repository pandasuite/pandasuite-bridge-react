import PropTypes from 'prop-types';

function Tab() {
  return null;
}

Tab.displayName = 'Tab';

Tab.propTypes = {
  children: PropTypes.node,
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  title: PropTypes.node.isRequired,
};

Tab.defaultProps = {
  children: null,
};

export default Tab;
