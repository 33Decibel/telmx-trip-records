const THUNDERFOREST_API_KEY = '7552624eeb394624b919d1d27c1de76e';

export async function reverseGeocode({ lat, lng }) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.display_name || 'Unknown location';
  } catch (err) {
    console.error('Reverse geocode error:', err);
    return 'Location error';
  }
}

export async function geocode(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.length === 0) throw new Error('No results found');
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
      display_name: data[0].display_name,
    };
  } catch (err) {
    console.error('Geocode error:', err);
    throw new Error('Geocoding failed');
  }
}

export async function getRouteDistance(start, end) {
  const url = `https://api.thunderforest.com/optimized/route?start=${start.lat},${start.lng}&end=${end.lat},${end.lng}&key=${THUNDERFOREST_API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.route && data.route.length > 0) {
      const route = data.route[0];
      return {
        distance: (route.distance / 1000).toFixed(2),
        duration: Math.round(route.duration / 60),
        geometry: route.geometry,
      };
    }

    return {
      distance: haversineDistance(start, end).toFixed(2),
      duration: calculateDuration(haversineDistance(start, end)),
      geometry: null,
    };
  } catch (err) {
    console.error('ThunderForest routing error:', err);
    return {
      distance: haversineDistance(start, end).toFixed(2),
      duration: calculateDuration(haversineDistance(start, end)),
      geometry: null,
    };
  }
}

export const haversineDistance = (start, end) => {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(end.lat - start.lat);
  const dLon = toRad(end.lng - start.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(start.lat)) *
      Math.cos(toRad(end.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const calculateDistance = (start, end) => {
  if (!start || !end) return null;
  const distance = haversineDistance(start, end);
  return distance.toFixed(2);
};

export const calculateDuration = (distance, speed = 20) => {
  if (!distance) return null;
  const durationMins = (distance / speed) * 60;
  return `${Math.floor(durationMins)} min`;
};

export const formatDistance = (distance) => {
  if (!distance) return '0 km';
  return `${distance.toFixed(2)} km`;
};
