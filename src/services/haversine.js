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
  return distance.toFixed(2); // Return distance in kilometers
};
export const calculateDuration = (distance, speed = 20) => {
  if (!distance) return null;
  const durationMins = (distance / speed) * 60; // Assuming speed in km/h
  return `${Math.floor(durationMins)} min`;
};
export const formatDistance = (distance) => {
  if (!distance) return '0 km';
  return `${distance.toFixed(2)} km`;
};
