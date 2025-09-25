import { useMemo } from 'react';
import PropTypes from 'prop-types';

import usePandaBridge from './usePandaBridge';

function WrapperBridge({
  markers,
  actions,
  synchronization,
  component,
  children,
}) {
  const hooks = useMemo(
    () => ({
      markers,
      actions,
      synchronization,
      component,
    }),
    [actions, component, markers, synchronization],
  );

  const bridgeContext = usePandaBridge(hooks);

  return children(bridgeContext);
}

WrapperBridge.propTypes = {
  markers: PropTypes.shape({
    getSnapshotDataHook: PropTypes.func,
    setSnapshotDataHook: PropTypes.func,
  }),
  actions: PropTypes.objectOf(PropTypes.func),
  synchronization: PropTypes.objectOf(PropTypes.func),
  component: PropTypes.shape({
    getScreenshotHook: PropTypes.func,
    onLanguageChanged: PropTypes.func,
  }),
  children: PropTypes.func.isRequired,
};

WrapperBridge.defaultProps = {
  markers: {},
  actions: {},
  synchronization: {},
  component: {},
};

export default WrapperBridge;
