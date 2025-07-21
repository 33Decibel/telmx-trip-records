/* eslint-disable no-undef */
// Google Maps API configuration
const GOOGLE_MAPS_API_KEY = 'AIzaSyDs8LkOCcUPyB5Rh-oWdyQaOXZm-NIC7eY';

// Load Google Maps script
export const loadGoogleMapsScript = () => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve(window.google);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;
    script.async = true;
    script.onload = () => {
      if (window.google && window.google.maps) {
        resolve(window.google);
      } else {
        reject(new Error('Google Maps API not loaded properly'));
      }
    };
    script.onerror = () =>
      reject(new Error('Failed to load Google Maps script'));
    document.head.appendChild(script);
  });
};

// Places Autocomplete
export const getPlacesSuggestions = (query, sessionToken) => {
  return new Promise((resolve) => {
    if (!window.google || !window.google.maps) {
      resolve({ status: 'error', error: 'Google Maps not loaded' });
      return;
    }

    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      {
        input: query,
        sessionToken: sessionToken,
      },
      (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve({ status: 'success', predictions });
        } else {
          resolve({ status: 'error', error: status });
        }
      }
    );
  });
};

// Get Place Details
export const getPlaceDetails = (placeId, sessionToken) => {
  return new Promise((resolve) => {
    if (!window.google || !window.google.maps) {
      resolve({ status: 'error', error: 'Google Maps not loaded' });
      return;
    }

    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    );

    service.getDetails(
      {
        placeId: placeId,
        sessionToken: sessionToken,
        fields: ['geometry', 'formatted_address', 'name'],
      },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve({
            status: 'success',
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.formatted_address,
            name: place.name,
          });
        } else {
          resolve({ status: 'error', error: status });
        }
      }
    );
  });
};

// Distance Matrix
export const getDistanceMatrix = (origins, destinations, travelMode) => {
  return new Promise((resolve) => {
    if (!window.google || !window.google.maps) {
      resolve({ status: 'error', error: 'Google Maps not loaded' });
      return;
    }

    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: origins,
        destinations: destinations,
        travelMode: travelMode,
        unitSystem: window.google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        if (status === window.google.maps.DistanceMatrixStatus.OK) {
          const element = response.rows[0].elements[0];
          if (element.status === 'OK') {
            resolve({
              status: 'success',
              distance: element.distance.text,
              duration: element.duration.text,
              distanceValue: element.distance.value / 1000, // Convert to km
              source: 'google',
              startAddress: origins[0].address || 'Start location',
              endAddress: destinations[0].address || 'End location',
              travelMode: travelMode,
            });
          } else {
            resolve({ status: 'error', error: element.status });
          }
        } else {
          resolve({ status: 'error', error: status });
        }
      }
    );
  });
};

// Directions Service
export const getDirections = (origin, destination, travelMode) => {
  return new Promise((resolve) => {
    if (!window.google || !window.google.maps) {
      resolve({ status: 'error', error: 'Google Maps not loaded' });
      return;
    }

    const service = new window.google.maps.DirectionsService();
    service.route(
      {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
      },
      (response, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          resolve({
            status: 'success',
            directions: response,
          });
        } else {
          resolve({ status: 'error', error: status });
        }
      }
    );
  });
};

// Reverse Geocoding
export const reverseGeocode = async (coords, accuracy) => {
  if (!window.google || !window.google.maps) {
    return {
      address: 'Location nearby',
      status: 'approximate',
      isApproximate: true,
    };
  }

  const { maps } = window.google;

  // Set timeout (5 seconds)
  const timeoutPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        address: getCoordinateAddress(coords),
        status: 'timeout',
        isApproximate: true,
      });
    }, 5000);
  });

  try {
    // Race between geocoding and timeout
    const result = await Promise.race([
      getBestAvailableAddress(coords, accuracy),
      timeoutPromise,
    ]);

    return result;
  } catch (error) {
    return {
      address: getCoordinateAddress(coords),
      status: 'error',
      isApproximate: true,
    };
  }
};

const getBestAvailableAddress = async (coords, accuracy) => {
  const { maps } = window.google;
  const geocoder = new maps.Geocoder();

  // 1. Try precise address first
  try {
    const preciseResponse = await new Promise((resolve) => {
      geocoder.geocode(
        {
          location: coords,
          resultType: ['street_address', 'route'],
        },
        (results, status) => resolve({ results, status })
      );
    });

    if (
      preciseResponse.status === maps.GeocoderStatus.OK &&
      preciseResponse.results[0]
    ) {
      return {
        address: preciseResponse.results[0].formatted_address,
        status: 'exact',
        isApproximate: false,
      };
    }
  } catch (error) {
    console.error('Precise geocoding failed:', error);
  }

  // 2. Try nearby places if precise address fails
  try {
    const placesService = new maps.places.PlacesService(
      document.createElement('div')
    );

    const nearbyResponse = await new Promise((resolve) => {
      placesService.nearbySearch(
        {
          location: coords,
          radius: Math.min(accuracy * 3, 1000), // Up to 1km
          rankBy: maps.places.RankBy.PROMINENCE,
          type: ['point_of_interest', 'establishment'],
        },
        (results, status) => resolve({ results, status })
      );
    });

    if (
      nearbyResponse.status === maps.places.PlacesServiceStatus.OK &&
      nearbyResponse.results[0]
    ) {
      return {
        address: `${nearbyResponse.results[0].name}, ${
          nearbyResponse.results[0].vicinity || 'Nearby'
        }`,
        status: 'approximate',
        isApproximate: true,
      };
    }
  } catch (error) {
    console.error('Nearby search failed:', error);
  }

  // 3. Final fallback to coordinates
  return {
    address: getCoordinateAddress(coords),
    status: 'approximate',
    isApproximate: true,
  };
};

const getCoordinateAddress = (coords) => {
  const lat = coords.lat.toFixed(6);
  const lng = coords.lng.toFixed(6);
  return `Location near coordinates (${lat}, ${lng})`;
};

// Helper functions
const formatBestAddress = (results) => {
  const addressPriority = [
    'street_address',
    'route',
    'neighborhood',
    'sublocality',
    'locality',
  ];

  for (const type of addressPriority) {
    const result = results.find((r) => r.types.includes(type));
    if (result) {
      return {
        address: result.formatted_address,
        status: type === 'street_address' ? 'exact' : 'approximate',
        isApproximate: type !== 'street_address',
      };
    }
  }
  return {
    address: results[0].formatted_address,
    status: 'approximate',
    isApproximate: true,
  };
};

const getNeighborhood = (coords) => {
  return 'Nearby area';
};

const getCoordinateFallback = (coords) => {
  const lat = coords.lat.toFixed(6);
  const lng = coords.lng.toFixed(6);
  return {
    address: `Location near coordinates (${lat}, ${lng})`,
    status: 'approximate',
    isApproximate: true,
  };
};

const getNearbyLandmark = (coords) => {
  return new Promise((resolve) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    );

    service.nearbySearch(
      {
        location: coords,
        radius: 500,
        rankBy: window.google.maps.places.RankBy.DISTANCE,
        type: ['point_of_interest', 'establishment'],
      },
      (results, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          results[0]
        ) {
          resolve({
            address: `${results[0].name}, ${
              results[0].vicinity || getNeighborhood(coords)
            }`,
            status: 'approximate',
            isApproximate: true,
          });
        } else {
          resolve(getCoordinateFallback(coords));
        }
      }
    );
  });
};

// Distance calculations
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

export const calculateDuration = (distance, mode) => {
  if (!distance) return null;

  let speed;
  switch (mode) {
    case 'WALKING':
      speed = 5;
      break;
    case 'BICYCLING':
      speed = 15;
      break;
    case 'TRANSIT':
      speed = 30;
      break;
    default: // DRIVING
      speed = 50;
  }

  const durationHours = distance / speed;
  if (durationHours < 1) {
    const durationMins = Math.round(durationHours * 60);
    return `${durationMins} min`;
  } else {
    const hours = Math.floor(durationHours);
    const mins = Math.round((durationHours - hours) * 60);
    return `${hours} h ${mins} min`;
  }
};
