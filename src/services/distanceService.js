import axios from 'axios';

export const getDistance = async (origin, destination) => {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${key}`;

  try {
    const res = await axios.get(url);
    const el = res.data.rows[0].elements[0];

    if (el.status === 'OK') {
      return {
        distance: el.distance.text,
        duration: el.duration.text,
      };
    } else {
      return { distance: 'N/A', duration: 'N/A' };
    }
  } catch (err) {
    console.error(err);
    return { distance: 'Error', duration: 'Error' };
  }
};
