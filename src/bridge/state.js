import isEqual from 'fast-deep-equal';
import { atom, selector } from 'recoil';

import dedupeMarkersById from '../utils/dedupeMarkers';

export const propertiesState = atom({
  key: 'propertiesState',
  default: undefined,
});

export const markersState = atom({
  key: 'markersState',
  default: [],
});

export const resourcesState = atom({
  key: 'resourcesState',
  default: {},
});

export const triggeredMarkerState = atom({
  key: 'triggeredMarkerState',
  default: undefined,
});

export const bridgeState = selector({
  key: 'bridgeState',
  get: ({ get }) => ({
    properties: get(propertiesState) ?? {},
    markers: get(markersState) ?? [],
    resources: get(resourcesState) ?? {},
    triggeredMarker: get(triggeredMarkerState),
  }),
  set: ({ set, get }, nextValue) => {
    if (!nextValue) {
      return;
    }

    const { properties, markers, resources, triggeredMarker } = nextValue;

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

export const addMarkerState = selector({
  key: 'addMarkerState',
  get: ({ get }) => get(markersState) ?? [],
  set: ({ set, get }, markersToAdd) => {
    if (!Array.isArray(markersToAdd) || markersToAdd.length === 0) {
      return;
    }

    const current = get(markersState) ?? [];
    set(markersState, dedupeMarkersById(current, markersToAdd));
  },
});
