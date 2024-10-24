import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';

import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import each from 'lodash/each';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import uniqBy from 'lodash/uniqBy';
import map from 'lodash/map';
import assign from 'lodash/assign';
import isEqual from 'lodash/isEqual';

import PandaBridge from 'pandasuite-bridge';
import {
  atom,
  useRecoilState,
  RecoilRoot,
  selector,
  useSetRecoilState,
} from 'recoil';

const localizedResources = function localizedResources(resources) {
  return mapValues(keyBy(resources, 'id'), (resource) => {
    const r = PandaBridge.resolveResource(resource.id);

    return {
      id: resource.id,
      path: (r || {}).path,
      srcsets: (r || {}).srcsets,
      local: !!resource.local,
      data: resource.data,
    };
  });
};

const propertiesState = atom({
  key: 'propertiesState',
  default: undefined,
});

const markersState = atom({
  key: 'markersState',
  default: [],
});

const resourcesState = atom({
  key: 'resourcesState',
  default: [],
});

const triggeredMarkerState = atom({
  key: 'triggeredMarkerState',
  default: undefined,
});

const bridgeState = selector({
  key: 'bridgeState',
  get: ({ get }) => {
    const properties = get(propertiesState);
    const markers = get(markersState);
    const resources = get(resourcesState);
    const triggeredMarker = get(triggeredMarkerState);

    return {
      properties,
      markers,
      resources,
      triggeredMarker,
    };
  },
  set: ({ set, get }, { properties, markers, resources, triggeredMarker }) => {
    if (
      properties !== undefined &&
      !isEqual(properties, get(propertiesState))
    ) {
      set(propertiesState, properties);
    }
    if (markers !== undefined && !isEqual(markers, get(markersState))) {
      set(markersState, markers);
    }
    if (resources !== undefined && !isEqual(resources, get(resourcesState))) {
      set(resourcesState, resources);
    }
    if (
      triggeredMarker !== undefined &&
      !isEqual(triggeredMarker, get(triggeredMarkerState))
    ) {
      set(triggeredMarkerState, triggeredMarker);
    }
  },
});

const addMarkerState = selector({
  key: 'addMarkerState',
  get: ({ get }) => get(markersState),
  set: ({ set, get }, newMarkers) => {
    const markers = get(markersState);

    set(
      markersState,
      uniqBy(markers.concat(newMarkers), (marker) => marker.id),
    );
  },
});

let firstTime = true;

export const usePandaBridge = function usePandaBridge(hooks) {
  const [bridge, setBridge] = useRecoilState(bridgeState);
  const addMarker = useSetRecoilState(addMarkerState);

  const {
    markers: markersHooks,
    actions: actionsHooks,
    synchronization: synchHooks,
    component: componentHooks,
  } = hooks || {};
  const { getSnapshotDataHook, setSnapshotDataHook } = markersHooks || {};
  const { getScreenshotHook, onLanguageChanged } = componentHooks || {};

  useEffect(() => {
    if (firstTime) {
      PandaBridge.init(() => {
        PandaBridge.onLoad((pandaData) => {
          setBridge({
            properties: pandaData.properties || {},
            markers: pandaData.markers || [],
            resources: localizedResources(pandaData.resources),
          });

          PandaBridge.listen(PandaBridge.LANGUAGE, (args) => {
            PandaBridge.currentLanguage = args && args.language;
            setBridge({ resources: localizedResources(PandaBridge.resources) });
          });

          PandaBridge.onUpdate((updatedPandaData) => {
            setBridge({
              properties: updatedPandaData.properties,
              markers: updatedPandaData.markers,
              resources: localizedResources(updatedPandaData.resources),
            });
          });
        });

        PandaBridge.setSnapshotData((pandaData) => {
          setBridge({ triggeredMarker: pandaData });
        });
      });

      firstTime = false;
    }
  }, []);

  if (onLanguageChanged) {
    PandaBridge.unlisten(PandaBridge.LANGUAGE);
    PandaBridge.listen(PandaBridge.LANGUAGE, (args) => {
      onLanguageChanged(args);
    });
  }

  if (getSnapshotDataHook) {
    PandaBridge.unlisten(PandaBridge.GET_SNAPSHOT_DATA);
    PandaBridge.getSnapshotData(() => {
      const newMarkerData = getSnapshotDataHook();

      if (isArray(newMarkerData)) {
        addMarker(newMarkerData);
      } else {
        addMarker([newMarkerData]);
      }
      return newMarkerData;
    });
  }

  if (getScreenshotHook) {
    PandaBridge.unlisten(PandaBridge.GET_SCREENSHOT);
    PandaBridge.getScreenshot((resultCallback) =>
      getScreenshotHook(resultCallback),
    );
  } else {
    PandaBridge.unlisten(PandaBridge.GET_SCREENSHOT);
    PandaBridge.getScreenshot((resultCallback) => {
      import('html2canvas').then(({ default: html2canvas }) => {
        html2canvas(document.body, {
          backgroundColor: null,
          scale: 3,
        }).then((canvas) => {
          canvas.toBlob((blob) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
              resultCallback(e.target.result);
            };
            fileReader.readAsDataURL(blob);
          });
        });
      });
    });
  }

  if (setSnapshotDataHook) {
    PandaBridge.unlisten(PandaBridge.SET_SNAPSHOT_DATA);
    PandaBridge.setSnapshotData((pandaData) => {
      if (setSnapshotDataHook) {
        setSnapshotDataHook(pandaData);
      }
    });
  }

  each(actionsHooks, (func, name) => {
    if (isFunction(func)) {
      PandaBridge.unlisten(name);
      PandaBridge.listen(name, (data) => func(...data));
    }
  });

  PandaBridge.unlisten(PandaBridge.SYNCHRONIZE);
  each(synchHooks, (func, name) => {
    if (isFunction(func)) {
      PandaBridge.synchronize(name, func);
    }
  });

  return {
    ...bridge,
    setProperty: (key, value) => {
      PandaBridge.send(PandaBridge.UPDATED, {
        properties: [
          {
            id: key,
            value,
          },
        ],
      });
      setBridge({ properties: { ...bridge.properties, [key]: value } });
    },
    setProperties: (properties) => {
      PandaBridge.send(PandaBridge.UPDATED, {
        properties: map(properties, (v, k) => ({ id: k, value: v })),
      });
      setBridge({ properties: assign({}, bridge.properties, properties) });
    },
    setResources: (resources) => {
      PandaBridge.send(PandaBridge.UPDATED, {
        resources,
      });
      setBridge({ resources: localizedResources(resources) });
    },
    addActions: (h, replace) => {
      each(h, (func, name) => {
        if (isFunction(func)) {
          if (replace) {
            PandaBridge.unlisten(name);
          }
          PandaBridge.listen(name, (data) => func(...data));
        }
      });
    },
  };
};

export const PandaBridgeRoot = function PandaBridgeRoot(props) {
  const { children } = props;

  return <RecoilRoot>{children}</RecoilRoot>;
};

PandaBridgeRoot.propTypes = {
  children: PropTypes.node.isRequired,
};

class BridgeComponent extends Component {
  render() {
    const { children, ...rest } = this.props;

    return children(rest);
  }
}

BridgeComponent.propTypes = {
  children: PropTypes.func.isRequired,
};

const WrapperBridge = function WrapperBridge(props) {
  const { markers, actions, synchronization, component, children } = props;
  const rest = usePandaBridge(
    {},
    {
      markers,
      actions,
      synchronization,
      component,
    },
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <BridgeComponent {...rest}>{children}</BridgeComponent>
  );
};

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
