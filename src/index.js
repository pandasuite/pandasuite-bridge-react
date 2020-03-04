import React, { useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import PandaBridge from 'pandasuite-bridge';

export const usePandaBridge = function usePandaBridge(values, hooks) {
  const [bridge, setBridge] = useState(values);
  const {
    markers: markersHooks,
    actions: actionsHooks,
    synchronization: synchHooks,
  } = hooks || {};
  const { getSnapshotDataHook } = markersHooks || {};

  useEffect(() => {
    PandaBridge.init(() => {
      PandaBridge.onLoad((pandaData) => {
        const { triggeredMarker } = bridge;
        const newBridge = {
          properties: pandaData.properties || {},
          markers: pandaData.markers || [],
          resources: _.keyBy(pandaData.resources || [], 'id'),
          triggeredMarker,
        };
        if (!_.isEqual(bridge, newBridge)) {
          setBridge(newBridge);
        }
      });

      if (getSnapshotDataHook) {
        PandaBridge.unlisten(PandaBridge.GET_SNAPSHOT_DATA);
        PandaBridge.getSnapshotData(() => {
          const {
            properties, markers, resources, triggeredMarker,
          } = bridge;
          const newMarkerData = getSnapshotDataHook();

          if (_.isArray(newMarkerData)) {
            markers.push(...newMarkerData);
          } else {
            markers.push(newMarkerData);
          }
          setBridge({
            properties, markers, resources, triggeredMarker,
          });
          return newMarkerData;
        });
      }

      PandaBridge.unlisten(PandaBridge.SET_SNAPSHOT_DATA);
      PandaBridge.setSnapshotData((pandaData) => {
        const { properties, markers, resources } = bridge;

        setBridge({
          properties, markers, resources, triggeredMarker: pandaData,
        });
      });

      _.each(actionsHooks, (func, name) => {
        if (_.isFunction(func)) {
          PandaBridge.unlisten(name);
          PandaBridge.listen(name, (data) => func(...data));
        }
      });

      PandaBridge.unlisten(PandaBridge.SYNCHRONIZE);
      _.each(synchHooks, (func, name) => {
        if (_.isFunction(func)) {
          PandaBridge.synchronize(name, func);
        }
      });
    });
  });

  return bridge;
};

class BridgeComponent extends Component {
  render() {
    const { children, ...rest } = this.props;

    return (children(rest));
  }
}

BridgeComponent.propTypes = {
  children: PropTypes.func.isRequired,
};

const WrapperBridge = function WrapperBridge(props) {
  const {
    markers, actions, synchronization, children,
  } = props;
  const rest = usePandaBridge({}, { markers, actions, synchronization });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading,react/jsx-filename-extension
    <BridgeComponent {...rest}>
      {children}
    </BridgeComponent>
  );
};

WrapperBridge.propTypes = {
  markers: PropTypes.objectOf(PropTypes.func),
  actions: PropTypes.objectOf(PropTypes.func),
  synchronization: PropTypes.objectOf(PropTypes.func),
  children: PropTypes.func.isRequired,
};

WrapperBridge.defaultProps = {
  markers: {},
  actions: {},
  synchronization: {},
};

export default WrapperBridge;
