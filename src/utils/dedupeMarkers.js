const dedupeMarkersById = (existing = [], incoming = []) => {
  const seen = new Set();
  const result = [];

  [...existing, ...incoming].forEach((marker) => {
    if (!marker || marker.id == null) {
      return;
    }

    if (seen.has(marker.id)) {
      return;
    }

    seen.add(marker.id);
    result.push(marker);
  });

  return result;
};

export default dedupeMarkersById;
