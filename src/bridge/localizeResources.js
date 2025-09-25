import PandaBridge from 'pandasuite-bridge';

const mapResource = (resource) => {
  if (!resource || !resource.id) {
    return null;
  }

  const resolved = PandaBridge.resolveResource(resource.id) || {};

  return {
    id: resource.id,
    path: resolved.path,
    srcsets: resolved.srcsets,
    local: Boolean(resource.local),
    data: resource.data,
  };
};

const localizeResources = (resources = []) => {
  if (!Array.isArray(resources)) {
    return {};
  }

  const localized = {};

  resources.forEach((resource) => {
    const mapped = mapResource(resource);

    if (!mapped) {
      return;
    }

    localized[mapped.id] = mapped;
  });

  return localized;
};

export default localizeResources;
