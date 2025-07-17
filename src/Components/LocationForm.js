import React, { useState, useEffect, useRef } from 'react';

// Google Maps API configuration
const GOOGLE_MAPS_API_KEY = 'AIzaSyDs8LkOCcUPyB5Rh-oWdyQaOXZm-NIC7eY';

// Google Maps API service functions
const loadGoogleMapsScript = () => {
  return new Promise((resolve, reject) => {
    if (window.google) {
      resolve(window.google);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;
    script.async = true;
    script.onload = () => resolve(window.google);
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const getPlacesSuggestions = (query, sessionToken) => {
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

const getPlaceDetails = (placeId, sessionToken) => {
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

const getDistanceMatrix = (origins, destinations) => {
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
              source: 'google',
              startAddress: origins[0].address || 'Start location',
              endAddress: destinations[0].address || 'End location',
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

const getDirections = (origin, destination) => {
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

// Location Input Component
function LocationInput({
  label,
  value,
  onChange,
  onLocationSelect,
  placeholder,
  disabled,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionToken] = useState(() => {
    if (window.google?.maps?.places?.AutocompleteSessionToken) {
      return new window.google.maps.places.AutocompleteSessionToken();
    }
    return Math.random().toString(36);
  });

  const fetchSuggestions = async (query) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    try {
      const result = await getPlacesSuggestions(query, sessionToken);
      if (result.status === 'success') {
        setSuggestions(result.predictions);
        setShowDropdown(result.predictions.length > 0);
      } else {
        console.error('Google Places API error:', result.error);
        setSuggestions([]);
        setShowDropdown(false);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      setShowDropdown(false);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    onChange(input);
    fetchSuggestions(input);
  };

  const handleSelect = async (place) => {
    setLoading(true);
    try {
      const details = await getPlaceDetails(place.place_id, sessionToken);
      if (details.status === 'success') {
        const locationData = {
          lat: details.lat,
          lng: details.lng,
          address: details.address,
          name: details.name,
        };

        onChange(locationData.address);
        onLocationSelect(locationData);
        setSuggestions([]);
        setShowDropdown(false);
      } else {
        console.error('Place details error:', details.error);
      }
    } catch (error) {
      console.error('Error selecting place:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='position-relative'>
      <input
        type='text'
        className='form-control form-control-sm'
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        autoComplete='off'
        style={{ borderRadius: '6px' }}
        disabled={disabled}
      />

      {loading && (
        <div
          className='position-absolute top-100 start-0 w-100 p-2 bg-light border rounded-bottom'
          style={{ zIndex: 1000 }}
        >
          <div className='text-center'>
            <div
              className='spinner-border spinner-border-sm'
              role='status'
            ></div>
            <small className='ms-2'>Searching...</small>
          </div>
        </div>
      )}

      {showDropdown && suggestions.length > 0 && !loading && (
        <ul
          className='list-group position-absolute w-100 shadow-sm'
          style={{
            maxHeight: '200px',
            overflowY: 'auto',
            zIndex: 1000,
            top: '100%',
          }}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className='list-group-item list-group-item-action p-2'
              onClick={() => handleSelect(suggestion)}
              style={{ cursor: 'pointer', fontSize: '0.9rem' }}
            >
              <div className='d-flex align-items-center'>
                <span className='me-2'>📍</span>
                <div>
                  <div className='fw-bold'>
                    {suggestion.structured_formatting?.main_text ||
                      suggestion.description}
                  </div>
                  <small className='text-muted'>
                    {suggestion.structured_formatting?.secondary_text ||
                      suggestion.description}
                  </small>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Google Maps Component
function GoogleMapView({ origin, destination, directions }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const directionsRendererRef = useRef(null);

  useEffect(() => {
    if (window.google && mapRef.current) {
      initializeMap();
    }
  }, [origin, destination, directions]);

  const initializeMap = () => {
    if (!mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 10,
      center: origin || { lat: 28.6139, lng: 77.209 }, // Default to Delhi
      mapTypeId: 'roadmap',
    });

    mapInstanceRef.current = map;

    // Clear previous directions
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
    }

    // Add markers
    if (origin) {
      new window.google.maps.Marker({
        position: origin,
        map: map,
        title: 'Start Location',
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
        },
      });
    }

    if (destination) {
      new window.google.maps.Marker({
        position: destination,
        map: map,
        title: 'End Location',
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        },
      });
    }

    // Show directions if available
    if (directions) {
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: '#4f46e5',
          strokeOpacity: 1.0,
          strokeWeight: 4,
        },
      });
      directionsRenderer.setMap(map);
      directionsRenderer.setDirections(directions);
      directionsRendererRef.current = directionsRenderer;
    } else if (origin && destination) {
      // Fit bounds to show both markers
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(origin);
      bounds.extend(destination);
      map.fitBounds(bounds);
    }
  };

  return (
    <div
      ref={mapRef}
      style={{
        height: '300px',
        borderRadius: '8px',
        border: '1px solid #dee2e6',
        backgroundColor: '#f8f9fa',
      }}
    />
  );
}

// Distance Result Component
function DistanceResult({ data }) {
  if (!data) return null;

  const isGoogleData = data.source === 'google';
  const isStraightLine = data.source === 'haversine';

  return (
    <div
      className='card shadow-sm'
      style={{ borderRadius: '12px', border: 'none' }}
    >
      <div className='card-body p-4 text-center'>
        <h3 className='h5 fw-bold text-dark mb-4'>Distance Result</h3>

        <div className='mb-3'>
          <div
            className='display-4 fw-bold'
            style={{ color: '#4f46e5' }}
          >
            {typeof data.distance === 'string'
              ? data.distance
              : `${data.distance} km`}
          </div>

          {data.duration && (
            <div className='text-muted mt-2'>
              <i className='fas fa-clock me-2'></i>
              Duration: {data.duration}
            </div>
          )}

          {data.distanceValue && (
            <div className='text-muted mt-1'>
              Approximately {(data.distanceValue * 0.621371).toFixed(2)} miles
            </div>
          )}
        </div>

        <div className='mb-3'>
          <span
            className={`badge ${
              isGoogleData
                ? 'bg-success'
                : isStraightLine
                ? 'bg-warning'
                : 'bg-info'
            }`}
          >
            {isGoogleData
              ? 'Google Maps Route'
              : isStraightLine
              ? 'Straight Line'
              : 'Road Route'}
          </span>

          {data.status === 'error' && (
            <span className='badge bg-danger ms-2'>Error: {data.error}</span>
          )}
        </div>

        {data.startAddress && data.endAddress && (
          <div className='mb-3'>
            <div className='row'>
              <div className='col-12 col-md-6'>
                <div className='small text-success fw-bold'>📍 Start:</div>
                <div className='small text-muted'>{data.startAddress}</div>
              </div>
              <div className='col-12 col-md-6'>
                <div className='small text-danger fw-bold'>🏁 End:</div>
                <div className='small text-muted'>{data.endAddress}</div>
              </div>
            </div>
          </div>
        )}

        <small className='text-muted'>
          {isGoogleData
            ? 'Calculated using Google Maps API with real road network data'
            : isStraightLine
            ? 'Calculated using GPS coordinates (straight-line distance)'
            : 'Calculated using road network data'}
        </small>

        {data.error && (
          <div className='mt-2'>
            <small className='text-danger'>
              Note: Fallback calculation used due to API error
            </small>
          </div>
        )}
      </div>
    </div>
  );
}

// Main Component
function LocationForm() {
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [startName, setStartName] = useState('');
  const [endName, setEndName] = useState('');
  const [startSearchValue, setStartSearchValue] = useState('');
  const [endSearchValue, setEndSearchValue] = useState('');
  const [distanceResult, setDistanceResult] = useState(null);
  const [directions, setDirections] = useState(null);
  const [loading, setLoading] = useState({
    start: false,
    end: false,
  });
  const [flowStep, setFlowStep] = useState('start'); // 'start', 'confirm-start', 'end', 'confirm-end'
  const [locationError, setLocationError] = useState(null);

  // Load Google Maps API
  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => {
        setGoogleLoaded(true);
      })
      .catch((error) => {
        console.error('Error loading Google Maps:', error);
        setLocationError('Failed to load Google Maps. Please try again later.');
      });
  }, []);

  const getCurrentLocation = (callback) => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation not supported by your browser');
      return;
    }

    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        };
        callback(coords);
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = 'Unable to fetch location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access was denied';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
          default:
            errorMessage = 'Unknown error occurred';
        }
        setLocationError(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const reverseGeocode = (coords) => {
    return new Promise((resolve) => {
      if (!window.google) {
        resolve('Unknown location');
        return;
      }

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: coords }, (results, status) => {
        if (status === 'OK' && results[0]) {
          resolve(results[0].formatted_address);
        } else {
          resolve('Unknown location');
        }
      });
    });
  };

  const calculateDistance = async (start, end) => {
    try {
      // Get distance matrix
      const distanceData = await getDistanceMatrix(
        [{ lat: start.lat, lng: start.lng, address: startName }],
        [{ lat: end.lat, lng: end.lng, address: endName }]
      );

      if (distanceData.status === 'success') {
        setDistanceResult(distanceData);
      } else {
        // Fallback to haversine calculation
        const haversineDist = haversineDistance(start, end);
        setDistanceResult({
          distance: `${haversineDist.toFixed(2)} km`,
          duration: calculateDuration(haversineDist),
          distanceValue: haversineDist,
          source: 'haversine',
          startAddress: startName,
          endAddress: endName,
          status: 'success',
        });
      }

      // Get directions for map
      const directionsData = await getDirections(start, end);
      if (directionsData.status === 'success') {
        setDirections(directionsData.directions);
      }
    } catch (error) {
      console.error('Error calculating distance:', error);
      setLocationError('Error calculating distance. Please try again.');
    }
  };

  const haversineDistance = (start, end) => {
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

  const calculateDuration = (distance, speed = 50) => {
    if (!distance) return null;
    const durationMins = (distance / speed) * 60;
    return `${Math.floor(durationMins)} min`;
  };

  const handleStartTrip = () => {
    setLoading((prev) => ({ ...prev, start: true }));
    setLocationError(null);
    getCurrentLocation(async (coords) => {
      try {
        if (coords.accuracy > 100) {
          setLocationError(
            'Location accuracy is low. Please try again or use search.'
          );
          return;
        }

        setStartLocation(coords);
        setEndLocation(null);
        setDistanceResult(null);
        setDirections(null);
        setEndName('');
        setEndSearchValue('');

        if (googleLoaded) {
          const name = await reverseGeocode(coords);
          setStartName(name);
          setStartSearchValue(name);
        }
        setFlowStep('confirm-start');
      } catch (error) {
        console.error('Error getting start location:', error);
        setLocationError('Error getting location address');
      } finally {
        setLoading((prev) => ({ ...prev, start: false }));
      }
    });
  };

  const handleConfirmStart = () => {
    setFlowStep('end');
  };

  const handleEndTrip = () => {
    setLoading((prev) => ({ ...prev, end: true }));
    setLocationError(null);
    getCurrentLocation(async (coords) => {
      try {
        if (coords.accuracy > 100) {
          setLocationError(
            'Location accuracy is low. Please try again or use search.'
          );
          return;
        }

        setEndLocation(coords);
        if (googleLoaded) {
          const name = await reverseGeocode(coords);
          setEndName(name);
          setEndSearchValue(name);
        }
        setFlowStep('confirm-end');
      } catch (error) {
        console.error('Error getting end location:', error);
        setLocationError('Error getting location address');
      } finally {
        setLoading((prev) => ({ ...prev, end: false }));
      }
    });
  };

  const handleConfirmEnd = () => {
    if (startLocation && endLocation) {
      calculateDistance(startLocation, endLocation);
    }
    setFlowStep('complete');
  };

  const handleStartLocationSelect = (locationData) => {
    const location = {
      lat: locationData.lat,
      lng: locationData.lng,
      accuracy: 100, // Assume high accuracy for searched locations
    };
    setStartLocation(location);
    setStartName(locationData.address);
    setFlowStep('confirm-start');
    setLocationError(null);
  };

  const handleEndLocationSelect = (locationData) => {
    const location = {
      lat: locationData.lat,
      lng: locationData.lng,
      accuracy: 100, // Assume high accuracy for searched locations
    };
    setEndLocation(location);
    setEndName(locationData.address);
    setFlowStep('confirm-end');
    setLocationError(null);
  };

  const handleClear = () => {
    setStartLocation(null);
    setEndLocation(null);
    setStartName('');
    setEndName('');
    setStartSearchValue('');
    setEndSearchValue('');
    setDistanceResult(null);
    setDirections(null);
    setLoading({ start: false, end: false });
    setFlowStep('start');
    setLocationError(null);
  };

  if (!googleLoaded) {
    return (
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: '100vh' }}
      >
        <div className='text-center'>
          <div
            className='spinner-border'
            role='status'
          ></div>
          <div className='mt-2'>Loading Google Maps...</div>
          {locationError && (
            <div className='alert alert-danger mt-2'>{locationError}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <div
        className='container'
        style={{ maxWidth: '800px' }}
      >
        {/* Header */}
        <div className='text-center mb-4'>
          <div
            className='d-inline-flex align-items-center justify-content-center mb-3'
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#4f46e5',
              borderRadius: '50%',
              color: 'white',
              fontSize: '24px',
            }}
          >
            🗺️
          </div>
          <h1 className='h2 fw-bold text-dark mb-2'>Distance Tracker</h1>
          <p className='text-muted'>
            Set your start and end locations to calculate distance
          </p>
        </div>

        {/* Error Display */}
        {locationError && (
          <div
            className='alert alert-danger mb-4'
            role='alert'
          >
            <i className='fas fa-exclamation-circle me-2'></i>
            {locationError}
          </div>
        )}

        {/* Map Section */}
        {(startLocation || endLocation) && (
          <div
            className='card shadow-sm mb-4'
            style={{ borderRadius: '12px', border: 'none' }}
          >
            <div className='card-body p-4'>
              <div className='d-flex align-items-center mb-3'>
                <span
                  className='me-2'
                  style={{ color: '#f59e0b', fontSize: '18px' }}
                >
                  🗺️
                </span>
                <h3 className='h5 fw-bold text-dark mb-0'>Route Map</h3>
              </div>
              <GoogleMapView
                origin={startLocation}
                destination={endLocation}
                directions={directions}
              />
            </div>
          </div>
        )}

        {/* Location Input Section */}
        <div
          className='card shadow-sm mb-4'
          style={{ borderRadius: '12px', border: 'none' }}
        >
          <div className='card-body p-4'>
            {/* Step 1: Set Start Location */}
            {(flowStep === 'start' || flowStep === 'confirm-start') && (
              <>
                <div className='d-flex align-items-center mb-3'>
                  <span
                    className='me-2'
                    style={{ color: '#10b981', fontSize: '18px' }}
                  >
                    📍
                  </span>
                  <h3 className='h5 fw-bold text-dark mb-0'>
                    {flowStep === 'start'
                      ? 'Set Start Location'
                      : 'Confirm Start Location'}
                  </h3>
                </div>

                <div className='mb-3'>
                  <label className='form-label small text-muted'>
                    Start Location
                  </label>
                  <LocationInput
                    value={startSearchValue}
                    onChange={setStartSearchValue}
                    onLocationSelect={handleStartLocationSelect}
                    placeholder='Enter start address or use GPS button below'
                    disabled={flowStep === 'confirm-start'}
                  />
                </div>

                {startLocation && (
                  <div className='mb-3'>
                    <div className='small text-muted'>Accuracy:</div>
                    <div className='small'>
                      {startLocation.accuracy <= 50 ? (
                        <span className='text-success'>
                          <i className='fas fa-check-circle me-1'></i> High
                          accuracy ({Math.round(startLocation.accuracy)} meters)
                        </span>
                      ) : (
                        <span className='text-warning'>
                          <i className='fas fa-exclamation-triangle me-1'></i>{' '}
                          Low accuracy ({Math.round(startLocation.accuracy)}{' '}
                          meters)
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className='row g-3 mb-4'>
                  <div className='col-12 col-md-6'>
                    <button
                      className={`btn btn-sm w-100 d-flex align-items-center justify-content-center ${
                        startLocation ? 'btn-success' : 'btn-outline-success'
                      }`}
                      onClick={handleStartTrip}
                      disabled={loading.start || flowStep === 'confirm-start'}
                      style={{ borderRadius: '6px', padding: '6px 12px' }}
                    >
                      {loading.start ? (
                        <>
                          <div
                            className='spinner-border spinner-border-sm me-2'
                            role='status'
                          ></div>
                          Getting Location...
                        </>
                      ) : (
                        <>📍 {startLocation ? ' Start Trip' : '  Start Trip'}</>
                      )}
                    </button>
                  </div>
                  {flowStep === 'confirm-start' && (
                    <div className='col-12 col-md-6'>
                      <button
                        className='btn btn-sm btn-primary w-100'
                        onClick={handleConfirmStart}
                        style={{ borderRadius: '6px', padding: '6px 12px' }}
                      >
                        Confirm Start Location
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Step 2: Set End Location */}
            {(flowStep === 'end' || flowStep === 'confirm-end') && (
              <>
                <div className='d-flex align-items-center mb-3'>
                  <span
                    className='me-2'
                    style={{ color: '#ef4444', fontSize: '18px' }}
                  >
                    🏁
                  </span>
                  <h3 className='h5 fw-bold text-dark mb-0'>
                    {flowStep === 'end'
                      ? 'Set End Location'
                      : 'Confirm End Location'}
                  </h3>
                </div>

                <div className='mb-3'>
                  <label className='form-label small text-muted'>
                    End Location
                  </label>
                  <LocationInput
                    value={endSearchValue}
                    onChange={setEndSearchValue}
                    onLocationSelect={handleEndLocationSelect}
                    placeholder='Enter end address or use GPS button below'
                    disabled={flowStep === 'confirm-end'}
                  />
                </div>

                {endLocation && (
                  <div className='mb-3'>
                    <div className='small text-muted'>Accuracy:</div>
                    <div className='small'>
                      {endLocation.accuracy <= 50 ? (
                        <span className='text-success'>
                          <i className='fas fa-check-circle me-1'></i> High
                          accuracy ({Math.round(endLocation.accuracy)} meters)
                        </span>
                      ) : (
                        <span className='text-warning'>
                          <i className='fas fa-exclamation-triangle me-1'></i>{' '}
                          Low accuracy ({Math.round(endLocation.accuracy)}{' '}
                          meters)
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className='row g-3 mb-4'>
                  <div className='col-12 col-md-6'>
                    <button
                      className={`btn btn-sm w-100 d-flex align-items-center justify-content-center ${
                        endLocation ? 'btn-danger' : 'btn-outline-danger'
                      }`}
                      onClick={handleEndTrip}
                      disabled={loading.end || flowStep === 'confirm-end'}
                      style={{ borderRadius: '6px', padding: '6px 12px' }}
                    >
                      {loading.end ? (
                        <>
                          <div
                            className='spinner-border spinner-border-sm me-2'
                            role='status'
                          ></div>
                          Getting Location...
                        </>
                      ) : (
                        <>🏁 {endLocation ? '  End Trip' : '  End Trip'}</>
                      )}
                    </button>
                  </div>
                  {flowStep === 'confirm-end' && (
                    <div className='col-12 col-md-6'>
                      <button
                        className='btn btn-sm btn-primary w-100'
                        onClick={handleConfirmEnd}
                        style={{ borderRadius: '6px', padding: '6px 12px' }}
                      >
                        Confirm End Location
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Location Details Display */}
            {(startLocation || endLocation) && (
              <div className='row g-3 mb-4'>
                {startLocation && (
                  <div className='col-12 col-md-6'>
                    <div
                      className='p-3 border'
                      style={{
                        backgroundColor: '#f0fdf4',
                        borderRadius: '8px',
                        borderColor: '#10b981',
                      }}
                    >
                      <div className='small fw-bold text-success mb-2'>
                        📍 Start Location
                      </div>
                      <div className='mb-2'>
                        <div className='small text-muted'>Address:</div>
                        <div
                          style={{
                            fontSize: '13px',
                            color: '#374151',
                            lineHeight: '1.3',
                          }}
                        >
                          {startName || 'Loading address...'}
                        </div>
                      </div>
                      <div>
                        <div className='small text-muted'>Coordinates:</div>
                        <div
                          style={{
                            fontSize: '12px',
                            color: '#6b7280',
                            fontFamily: 'monospace',
                          }}
                        >
                          {startLocation.lat.toFixed(6)},{' '}
                          {startLocation.lng.toFixed(6)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {endLocation && (
                  <div className='col-12 col-md-6'>
                    <div
                      className='p-3 border'
                      style={{
                        backgroundColor: '#fef2f2',
                        borderRadius: '8px',
                        borderColor: '#ef4444',
                      }}
                    >
                      <div className='small fw-bold text-danger mb-2'>
                        🏁 End Location
                      </div>
                      <div className='mb-2'>
                        <div className='small text-muted'>Address:</div>
                        <div
                          style={{
                            fontSize: '13px',
                            color: '#374151',
                            lineHeight: '1.3',
                          }}
                        >
                          {endName || 'Loading address...'}
                        </div>
                      </div>
                      <div>
                        <div className='small text-muted'>Coordinates:</div>
                        <div
                          style={{
                            fontSize: '12px',
                            color: '#6b7280',
                            fontFamily: 'monospace',
                          }}
                        >
                          {endLocation.lat.toFixed(6)},{' '}
                          {endLocation.lng.toFixed(6)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Clear Button */}
            <div className='d-flex gap-2'>
              <button
                className='btn btn-sm btn-outline-secondary w-100'
                onClick={handleClear}
                style={{ borderRadius: '6px', padding: '6px 12px' }}
              >
                🗑️ Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Distance Result */}
        {distanceResult && <DistanceResult data={distanceResult} />}

        {/* Footer */}
        <div className='text-center mt-4'>
          <p className='small text-muted mb-1'>
            {startLocation || endLocation
              ? 'Search for addresses or use GPS mode'
              : 'Allow location access when prompted'}
          </p>
          <p className='small text-muted mb-4'>
            Distance calculated using Google Maps road network data
          </p>
        </div>
      </div>
    </div>
  );
}

export default LocationForm;
