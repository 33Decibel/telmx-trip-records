export const loadGoogleMapsScript = (apiKey) => {
  return new Promise((resolve, reject) => {
    if (window.google) {
      resolve(window.google);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
    script.async = true;
    script.onload = () => resolve(window.google);
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

export const getPlacesSuggestions = (query, sessionToken) => {
  return new Promise((resolve) => {
    if (!window.google) {
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

export const getPlaceDetails = (placeId, sessionToken) => {
  return new Promise((resolve) => {
    if (!window.google) {
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

export const getDistanceMatrix = (origins, destinations) => {
  return new Promise((resolve) => {
    if (!window.google) {
      resolve({ status: 'error', error: 'Google Maps not loaded' });
      return;
    }

    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: origins,
        destinations: destinations,
        travelMode: window.google.maps.TravelMode.DRIVING,
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

export const getDirections = (origin, destination) => {
  return new Promise((resolve) => {
    if (!window.google) {
      resolve({ status: 'error', error: 'Google Maps not loaded' });
      return;
    }

    const service = new window.google.maps.DirectionsService();
    service.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
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
