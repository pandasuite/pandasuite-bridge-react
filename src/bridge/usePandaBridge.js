import { useEffect, useMemo, useRef, useCallback } from 'react';
import PandaBridge from 'pandasuite-bridge';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { handleScreenshotRequest } from './captureScreenshot';
import localizeResources from './localizeResources';
import { addMarkerState, bridgeState } from './state';

const toPropertyPayload = (properties = {}) =>
  Object.entries(properties).map(([id, value]) => ({ id, value }));

const ensureArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (value == null) {
    return [];
  }

  return [value];
};

let hasInitializedBridge = false;

function usePandaBridge(hooks = {}) {
  const [bridge, setBridge] = useRecoilState(bridgeState);
  const addMarker = useSetRecoilState(addMarkerState);

  const {
    markers: markerHooks = {},
    actions: actionsHooks = {},
    synchronization: synchronizationHooks = {},
    component: componentHooks = {},
  } = hooks;

  const { getSnapshotDataHook, setSnapshotDataHook } = markerHooks;
  const { getScreenshotHook, onLanguageChanged } = componentHooks;

  const getSnapshotDataHookRef = useRef(getSnapshotDataHook);
  const setSnapshotDataHookRef = useRef(setSnapshotDataHook);
  const getScreenshotHookRef = useRef(getScreenshotHook);
  const onLanguageChangedRef = useRef(onLanguageChanged);

  useEffect(() => {
    getSnapshotDataHookRef.current = getSnapshotDataHook;
  }, [getSnapshotDataHook]);

  useEffect(() => {
    setSnapshotDataHookRef.current = setSnapshotDataHook;
  }, [setSnapshotDataHook]);

  useEffect(() => {
    getScreenshotHookRef.current = getScreenshotHook;
  }, [getScreenshotHook]);

  useEffect(() => {
    onLanguageChangedRef.current = onLanguageChanged;
  }, [onLanguageChanged]);

  useEffect(() => {
    if (hasInitializedBridge) {
      return;
    }

    hasInitializedBridge = true;

    PandaBridge.init(() => {
      PandaBridge.onLoad((pandaData = {}) => {
        setBridge({
          properties: pandaData.properties ?? {},
          markers: pandaData.markers ?? [],
          resources: localizeResources(pandaData.resources),
        });

        PandaBridge.listen(PandaBridge.LANGUAGE, (args) => {
          PandaBridge.currentLanguage = args?.language;
          setBridge({
            resources: localizeResources(PandaBridge.resources),
          });

          const handler = onLanguageChangedRef.current;
          if (typeof handler === 'function') {
            handler(args);
          }
        });

        PandaBridge.onUpdate((updatedPandaData = {}) => {
          setBridge({
            properties: updatedPandaData.properties,
            markers: updatedPandaData.markers,
            resources: localizeResources(updatedPandaData.resources),
          });
        });
      });

      PandaBridge.setSnapshotData((pandaData) => {
        setBridge({ triggeredMarker: pandaData });

        const handler = setSnapshotDataHookRef.current;
        if (typeof handler === 'function') {
          handler(pandaData);
        }
      });

      PandaBridge.getSnapshotData(() => {
        const hook = getSnapshotDataHookRef.current;

        if (typeof hook !== 'function') {
          return undefined;
        }

        const snapshot = hook();
        const markersToAdd = ensureArray(snapshot);

        if (markersToAdd.length > 0) {
          addMarker(markersToAdd);
        }

        return snapshot;
      });

      PandaBridge.getScreenshot((callback) => {
        const hook = getScreenshotHookRef.current;

        if (typeof hook === 'function') {
          hook(callback);
          return;
        }

        handleScreenshotRequest(callback);
      });
    });
  }, [addMarker, setBridge]);

  useEffect(() => {
    const entries = Object.entries(actionsHooks).filter(
      ([, fn]) => typeof fn === 'function',
    );

    entries.forEach(([name]) => PandaBridge.unlisten(name));
    entries.forEach(([name, fn]) => {
      PandaBridge.listen(name, (data) => fn(...(data || [])));
    });

    return () => {
      entries.forEach(([name]) => PandaBridge.unlisten(name));
    };
  }, [actionsHooks]);

  useEffect(() => {
    const entries = Object.entries(synchronizationHooks).filter(
      ([, fn]) => typeof fn === 'function',
    );

    PandaBridge.unlisten(PandaBridge.SYNCHRONIZE);

    entries.forEach(([name, fn]) => {
      PandaBridge.synchronize(name, fn);
    });

    return () => {
      PandaBridge.unlisten(PandaBridge.SYNCHRONIZE);
    };
  }, [synchronizationHooks]);

  const setProperty = useCallback(
    (key, value) => {
      if (key == null) {
        return;
      }

      PandaBridge.send(PandaBridge.UPDATED, {
        properties: [
          {
            id: key,
            value,
          },
        ],
      });

      setBridge({
        properties: {
          ...(bridge.properties ?? {}),
          [key]: value,
        },
      });
    },
    [bridge.properties, setBridge],
  );

  const setProperties = useCallback(
    (properties = {}) => {
      PandaBridge.send(PandaBridge.UPDATED, {
        properties: toPropertyPayload(properties),
      });

      setBridge({
        properties: {
          ...(bridge.properties ?? {}),
          ...properties,
        },
      });
    },
    [bridge.properties, setBridge],
  );

  const setResources = useCallback(
    (resources = []) => {
      PandaBridge.send(PandaBridge.UPDATED, {
        resources,
      });

      setBridge({
        resources: localizeResources(resources),
      });
    },
    [setBridge],
  );

  const addActions = useCallback((handlers = {}, replace = false) => {
    Object.entries(handlers).forEach(([name, fn]) => {
      if (typeof fn !== 'function') {
        return;
      }

      if (replace) {
        PandaBridge.unlisten(name);
      }

      PandaBridge.listen(name, (data) => fn(...(data || [])));
    });
  }, []);

  return useMemo(
    () => ({
      ...bridge,
      setProperty,
      setProperties,
      setResources,
      addActions,
    }),
    [addActions, bridge, setProperties, setProperty, setResources],
  );
}

export default usePandaBridge;
