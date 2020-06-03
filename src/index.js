import React, { useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import PandaBridge from 'pandasuite-bridge';
import html2canvas from 'html2canvas';

const localizedResources = function localizedResources(resources) {
  return _.chain(resources)
    .keyBy('id')
    .mapValues(
      (resource) => ({ id: resource.id, path: PandaBridge.resolvePath(resource.id) }),
    ).value();
};

export const usePandaBridge = function usePandaBridge(values, hooks) {
  const [bridge, setBridge] = useState(values);
  const {
    markers: markersHooks,
    actions: actionsHooks,
    synchronization: synchHooks,
    component: componentHooks,
  } = hooks || {};
  const { getSnapshotDataHook, setSnapshotDataHook } = markersHooks || {};
  const { getScreenshotHook, onLanguageChanged } = componentHooks || {};

  const {
    properties, markers, resources, triggeredMarker,
  } = bridge;

  useEffect(() => {
    PandaBridge.init(() => {
      PandaBridge.onLoad((pandaData) => {
        const newBridge = {
          properties: pandaData.properties || {},
          markers: pandaData.markers || [],
          resources: localizedResources(pandaData.resources),
          triggeredMarker,
        };
        if (!_.isEqual(bridge, newBridge)) {
          setBridge(newBridge);
        }

        PandaBridge.unlisten(PandaBridge.LANGUAGE);
        PandaBridge.listen(PandaBridge.LANGUAGE, (args) => {
          const oldLanguage = PandaBridge.currentLanguage;
          PandaBridge.currentLanguage = args && args.language;
          const newResources = localizedResources(PandaBridge.resources);

          if (!_.isEqual(resources, newResources)) {
            setBridge({
              properties,
              markers,
              resources: newResources,
              triggeredMarker,
            });
          }
          if (onLanguageChanged && oldLanguage !== PandaBridge.currentLanguage) {
            onLanguageChanged(args);
          }
        });

        PandaBridge.onUpdate((updatedPandaData) => {
          const newUpdatedBridge = {
            properties: updatedPandaData.properties || {},
            markers: updatedPandaData.markers || [],
            resources: localizedResources(updatedPandaData.resources),
            triggeredMarker,
          };
          if (!_.isEqual(bridge, newUpdatedBridge)) {
            setBridge(newUpdatedBridge);
          }
        });
      });

      if (getSnapshotDataHook) {
        PandaBridge.unlisten(PandaBridge.GET_SNAPSHOT_DATA);
        PandaBridge.getSnapshotData(() => {
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

      if (getScreenshotHook) {
        PandaBridge.unlisten(PandaBridge.GET_SCREENSHOT);
        PandaBridge.getScreenshot((resultCallback) => getScreenshotHook(resultCallback));
      } else {
        PandaBridge.unlisten(PandaBridge.GET_SCREENSHOT);
        PandaBridge.getScreenshot((resultCallback) => {
          html2canvas(document.body, {
            backgroundColor: null,
            scale: 3,
          }).then((canvas) => {
            canvas.toBlob((blob) => {
              const fileReader = new FileReader();
              fileReader.onload = (e) => { resultCallback(e.target.result); };
              fileReader.readAsDataURL(blob);
            });
          });
        });
      }

      PandaBridge.unlisten(PandaBridge.SET_SNAPSHOT_DATA);
      PandaBridge.setSnapshotData((pandaData) => {
        setBridge({
          properties, markers, resources, triggeredMarker: pandaData,
        });
        if (setSnapshotDataHook) {
          setSnapshotDataHook(pandaData);
        }
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
    markers, actions, synchronization, component, children,
  } = props;
  const rest = usePandaBridge({}, {
    markers, actions, synchronization, component,
  });

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
  component: PropTypes.objectOf(PropTypes.func),
  children: PropTypes.func.isRequired,
};

WrapperBridge.defaultProps = {
  markers: {},
  actions: {},
  synchronization: {},
  component: {},
};

export default WrapperBridge;
