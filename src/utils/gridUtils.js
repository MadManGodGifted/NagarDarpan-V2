export const LAT_STEP = 0.009; // roughly 1km
export const LNG_STEP = 0.01;

export const getBlockIndices = (lat, lng) => {
  return [Math.floor(lat / LAT_STEP), Math.floor(lng / LNG_STEP)];
};

export const getBlockBounds = (lat, lng) => {
  const [latIdx, lngIdx] = getBlockIndices(lat, lng);
  const minLat = latIdx * LAT_STEP;
  const maxLat = (latIdx + 1) * LAT_STEP;
  const minLng = lngIdx * LNG_STEP;
  const maxLng = (lngIdx + 1) * LNG_STEP;
  return [[minLat, minLng], [maxLat, maxLng]];
};

export const getBlockCenter = (lat, lng) => {
  const [[minLat, minLng], [maxLat, maxLng]] = getBlockBounds(lat, lng);
  return [(minLat + maxLat) / 2, (minLng + maxLng) / 2];
};

export const getBlockId = (lat, lng) => {
  const [latIdx, lngIdx] = getBlockIndices(lat, lng);
  return `B-${Math.abs(latIdx)}-${Math.abs(lngIdx)}`;
};

export const getActiveGridBounds = (centerLat, centerLng) => {
  const [cLatIdx, cLngIdx] = getBlockIndices(centerLat, centerLng);
  
  const minLat = (cLatIdx - 1) * LAT_STEP;
  const maxLat = (cLatIdx + 2) * LAT_STEP; 
  const minLng = (cLngIdx - 1) * LNG_STEP;
  const maxLng = (cLngIdx + 2) * LNG_STEP;

  return { minLat, maxLat, minLng, maxLng };
};

export const isProjectInActiveGrid = (lat, lng, centerLat, centerLng) => {
  const [pLatIdx, pLngIdx] = getBlockIndices(lat, lng);
  const [cLatIdx, cLngIdx] = getBlockIndices(centerLat, centerLng);

  return Math.abs(pLatIdx - cLatIdx) <= 1 && Math.abs(pLngIdx - cLngIdx) <= 1;
};

export const generateVisibleGridRectangles = (centerLat, centerLng) => {
  const [cLatIdx, cLngIdx] = getBlockIndices(centerLat, centerLng);
  const rectangles = [];
  
  // 11x11 grid array to cover the viewport seamlessly
  for (let latOffset = -5; latOffset <= 5; latOffset++) {
    for (let lngOffset = -5; lngOffset <= 5; lngOffset++) {
      const latGridIdx = cLatIdx + latOffset;
      const lngGridIdx = cLngIdx + lngOffset;
      
      const minLat = latGridIdx * LAT_STEP;
      const maxLat = (latGridIdx + 1) * LAT_STEP;
      const minLng = lngGridIdx * LNG_STEP;
      const maxLng = (lngGridIdx + 1) * LNG_STEP;
      
      rectangles.push({
        id: `grid-${latGridIdx}-${lngGridIdx}`,
        bounds: [[minLat, minLng], [maxLat, maxLng]],
        isActive: Math.abs(latOffset) <= 1 && Math.abs(lngOffset) <= 1 // Center 3x3 block is active
      });
    }
  }
  return rectangles;
};
