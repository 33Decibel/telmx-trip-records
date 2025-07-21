import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import {
  loadGoogleMapsScript,
  getDistanceMatrix,
  getDirections,
  reverseGeocode,
  haversineDistance,
  calculateDuration,
} from '../services/googleMapsService';
import GoogleMapView from './GoogleMapView';
import TravelModeSelector from './TravelModeSelector';
import LocationInput from './LocationInput';
import DistanceResult from './DistanceResult';
import ConfirmationDialog from './ConfirmationDialog';
import { Input } from 'reactstrap';

export default function LocationForm() {
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
  const [flowStep, setFlowStep] = useState('start');
  const [locationError, setLocationError] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null,
  });
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [tripPurpose, setTripPurpose] = useState('');
  const [tripHistory, setTripHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [client, setClient] = useState('');
  const [vendor, setVendor] = useState('');
  const [startTime, setStartTime] = useState(null);

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

    // Load saved history from localStorage
    const savedHistory = localStorage.getItem('tripHistory');
    if (savedHistory) {
      try {
        setTripHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Error parsing trip history:', e);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    const saveHistory = () => {
      if (tripHistory.length > 0) {
        try {
          const simplifiedHistory = tripHistory.map((trip) => ({
            id: trip.id,
            date: trip.date,
            startName: trip.startName,
            endName: trip.endName,
            distance: trip.distance,
            duration: trip.duration,
            travelMode: trip.travelMode,
            tripPurpose: trip.tripPurpose,
            client: trip.client,
            vendor: trip.vendor,
            coordinates: trip.coordinates,
          }));
          localStorage.setItem(
            'tripHistory',
            JSON.stringify(simplifiedHistory)
          );
        } catch (e) {
          console.error('Error saving history:', e);
        }
      }
    };

    const debouncedSave = debounce(saveHistory, 1000);
    debouncedSave();

    return () => debouncedSave.cancel();
  }, [tripHistory]);

  // Auto-save to history when trip is completed
  useEffect(() => {
    if (flowStep === 'complete' && distanceResult) {
      saveTripToHistory();
    }
  }, [flowStep, distanceResult]);

  const showConfirmationDialog = (
    title,
    message,
    onConfirm,
    onCancel = () => setShowDialog(false)
  ) => {
    setDialogConfig({
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setShowDialog(false);
      },
      onCancel,
    });
    setShowDialog(true);
  };

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

  const calculateDistance = async (start, end) => {
    const straightDistance = haversineDistance(start, end);
    if (straightDistance < 0.01) {
      setLocationError('Locations are too close to calculate route');
      return;
    }

    try {
      // Get distance matrix
      const distanceData = await getDistanceMatrix(
        [{ lat: start.lat, lng: start.lng, address: startName }],
        [{ lat: end.lat, lng: end.lng, address: endName }],
        travelMode
      );

      if (distanceData.status === 'success') {
        setDistanceResult({
          ...distanceData,
          tripPurpose: tripPurpose,
        });
      } else {
        // Fallback to haversine calculation
        const haversineDist = haversineDistance(start, end);
        setDistanceResult({
          distance: `${haversineDist.toFixed(2)} km`,
          duration: calculateDuration(haversineDist, travelMode),
          distanceValue: haversineDist,
          source: 'haversine',
          startAddress: startName,
          endAddress: endName,
          status: 'success',
          travelMode: travelMode,
          tripPurpose: tripPurpose,
        });
      }

      // Get directions for map
      const directionsData = await getDirections(start, end, travelMode);
      if (directionsData.status === 'success') {
        setDirections(directionsData.directions);
      }
    } catch (error) {
      console.error('Error calculating distance:', error);
      setLocationError('Error calculating distance. Please try again.');
      throw error; // Re-throw for handling in calling function
    }
  };

  const formatTripDataForAPI = () => {
    return {
      user_id: 4,
      travel_mode: travelMode.toLowerCase(),
      purpose: tripPurpose,
      approved_by: null,
      client: client || null,
      vendor: vendor || null,
      start_time: startTime
        ? startTime.toISOString().replace('T', ' ').slice(0, 19)
        : null,
      start_point: startLocation
        ? `${startLocation.lat},${startLocation.lng}`
        : null,
      status: 'active',
      metadata: {
        end_point: endLocation ? `${endLocation.lat},${endLocation.lng}` : null,
        distance: distanceResult?.distance || null,
        duration: distanceResult?.duration || null,
        start_address: startName,
        end_address: endName,
      },
    };
  };

  const saveTripToHistory = () => {
    if (!distanceResult || !startLocation || !endLocation) return;

    const newTrip = {
      id: Date.now(),
      date: new Date().toISOString(),
      startLocation,
      endLocation,
      startName,
      endName,
      distance: distanceResult.distance,
      duration: distanceResult.duration,
      distanceValue: distanceResult.distanceValue,
      travelMode,
      tripPurpose,
      client,
      vendor,
      coordinates: {
        start: { lat: startLocation.lat, lng: startLocation.lng },
        end: { lat: endLocation.lat, lng: endLocation.lng },
      },
    };

    setTripHistory((prev) => {
      const updatedHistory = [newTrip, ...prev].slice(0, 50);
      return updatedHistory;
    });
  };

  const handleStartTrip = () => {
    setStartTime(new Date());
    setLoading((prev) => ({ ...prev, start: true }));
    setLocationError(null);
    getCurrentLocation(async (coords) => {
      try {
        setStartLocation(coords);
        setEndLocation(null);
        setDistanceResult(null);
        setDirections(null);
        setEndName('');
        setEndSearchValue('');

        if (googleLoaded) {
          const { address, status, isApproximate } = await reverseGeocode(
            coords,
            coords.accuracy
          );
          setStartName(address);
          setStartSearchValue(address);

          if (isApproximate) {
            setLocationError(
              `Showing nearby location (accuracy: ${Math.round(
                coords.accuracy
              )}m)`
            );
          }
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

  const handleEndTrip = () => {
    setLoading((prev) => ({ ...prev, end: true }));
    setLocationError(null);
    getCurrentLocation(async (coords) => {
      try {
        setEndLocation(coords);
        if (googleLoaded) {
          const { address, status, isApproximate } = await reverseGeocode(
            coords,
            coords.accuracy
          );
          setEndName(address);
          setEndSearchValue(address);

          if (isApproximate) {
            setLocationError(
              `Showing nearby location (accuracy: ${Math.round(
                coords.accuracy
              )}m)`
            );
          }
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

  const handleConfirmStart = () => {
    showConfirmationDialog(
      'Confirm Start Location',
      `Are you sure you want to set "${startName}" as your starting point?`,
      () => {
        setFlowStep('end');
      }
    );
  };

  const handleConfirmEnd = () => {
    showConfirmationDialog(
      'Confirm End Location',
      `Are you sure you want to set "${endName}" as your destination?`,
      async () => {
        try {
          setLoading({ start: true, end: true });
          if (startLocation && endLocation) {
            await calculateDistance(startLocation, endLocation);
          }
          setFlowStep('complete');

          const tripData = formatTripDataForAPI();
          console.log('Trip Data:', tripData);
        } catch (error) {
          console.error('Error calculating distance:', error);
          setLocationError('Error calculating distance. Please try again.');
        } finally {
          setLoading({ start: false, end: false });
        }
      }
    );
  };

  const handleStartLocationSelect = (locationData) => {
    const location = {
      lat: locationData.lat,
      lng: locationData.lng,
      accuracy: 100,
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
      accuracy: 100,
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
    setTripPurpose('');
    setStartTime(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleDateString(undefined, options);
  };

  const clearHistory = () => {
    showConfirmationDialog(
      'Clear History',
      'Are you sure you want to clear all trip history?',
      () => {
        setTripHistory([]);
      }
    );
  };

  const loadTripFromHistory = (trip) => {
    showConfirmationDialog(
      'Load Trip',
      `Do you want to load this trip from ${trip.startName} to ${trip.endName}?`,
      () => {
        setStartLocation({
          lat: trip.coordinates.start.lat,
          lng: trip.coordinates.start.lng,
          accuracy: 10,
        });
        setEndLocation({
          lat: trip.coordinates.end.lat,
          lng: trip.coordinates.end.lng,
          accuracy: 10,
        });
        setStartName(trip.startName);
        setEndName(trip.endName);
        setStartSearchValue(trip.startName);
        setEndSearchValue(trip.endName);
        setTravelMode(trip.travelMode);
        setTripPurpose(trip.tripPurpose);
        setClient(trip.client || '');
        setVendor(trip.vendor || '');
        setFlowStep('complete');

        calculateDistance(
          { lat: trip.coordinates.start.lat, lng: trip.coordinates.start.lng },
          { lat: trip.coordinates.end.lat, lng: trip.coordinates.end.lng }
        );
      }
    );
  };

  const deleteTripFromHistory = (tripId) => {
    showConfirmationDialog(
      'Delete Trip',
      'Are you sure you want to delete this trip from history?',
      () => {
        setTripHistory((prev) => prev.filter((trip) => trip.id !== tripId));
      }
    );
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
        {/* Confirmation Dialog */}
        <ConfirmationDialog
          show={showDialog}
          title={dialogConfig.title}
          message={dialogConfig.message}
          onConfirm={dialogConfig.onConfirm}
          onCancel={dialogConfig.onCancel}
        />

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

        {/* Travel Mode and Purpose Section */}
        <div
          className='card shadow-sm mb-4'
          style={{ borderRadius: '12px', border: 'none' }}
        >
          <div className='card-body p-4'>
            <TravelModeSelector
              value={travelMode}
              onChange={setTravelMode}
            />

            <div className='mb-3'>
              <label className='form-label small text-muted'>
                Purpose of Trip
              </label>
              <select
                className='form-select form-select-sm'
                value={tripPurpose}
                onChange={(e) => setTripPurpose(e.target.value)}
                style={{ borderRadius: '6px' }}
              >
                <option value=''>Select purpose</option>
                <option value='business meeting'>Business Meeting</option>
                <option value='site visit'>Site Visit</option>
                <option value='client visit'>Client Visit</option>
                <option value='delivery'>Delivery</option>
                <option value='personal'>Personal</option>
                <option value='other'>Other</option>
              </select>
            </div>

            <div className='mb-3'>
              <label className='form-label small text-muted'>Client</label>
              <select
                className='form-select form-select-sm'
                value={client}
                onChange={(e) => setClient(e.target.value)}
                style={{ borderRadius: '6px' }}
              >
                <option value=''>Select Client</option>
                <option value='HCL'>HCL</option>
                <option value='RTT'>RTT</option>
              </select>
            </div>

            <div className='mb-3'>
              <label className='form-label small text-muted'>Vendor</label>
              <input
                type='text'
                className='form-control form-control-sm'
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                placeholder='Enter vendor name'
              />
            </div>
          </div>
        </div>

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
                travelMode={travelMode}
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
              <button
                className='btn btn-sm btn-outline-primary w-100'
                onClick={() => setShowHistory(!showHistory)}
                style={{ borderRadius: '6px', padding: '6px 12px' }}
              >
                {showHistory ? 'Hide History' : 'Show History'}
              </button>
            </div>
          </div>
        </div>

        {/* Distance Result */}
        {distanceResult && <DistanceResult data={distanceResult} />}

        {/* History Section */}
        {showHistory && (
          <div
            className='card shadow-sm mb-4'
            style={{ borderRadius: '12px', border: 'none' }}
          >
            <div className='card-body p-4'>
              <div className='d-flex justify-content-between align-items-center mb-3'>
                <h3 className='h5 fw-bold text-dark mb-0'>
                  <i className='fas fa-history me-2'></i>Trip History
                </h3>
                <div>
                  <button
                    className='btn btn-sm btn-outline-danger me-2'
                    onClick={clearHistory}
                    disabled={tripHistory.length === 0}
                  >
                    Clear All
                  </button>
                  <button
                    className='btn btn-sm btn-outline-secondary'
                    onClick={() => setShowHistory(false)}
                  >
                    Close
                  </button>
                </div>
              </div>

              {tripHistory.length === 0 ? (
                <div className='text-center py-4'>
                  <i className='fas fa-clock fa-2x text-muted mb-3'></i>
                  <p className='text-muted'>No trip history yet</p>
                </div>
              ) : (
                <div
                  className='list-group'
                  style={{ maxHeight: '500px', overflowY: 'auto' }}
                >
                  {tripHistory.map((trip) => (
                    <div
                      key={trip.id}
                      className='list-group-item border-0 py-3 px-0'
                    >
                      <div className='d-flex justify-content-between align-items-start'>
                        <div style={{ flex: 1 }}>
                          <div className='fw-bold'>
                            {trip.startName} → {trip.endName}
                          </div>
                          <div className='small text-muted mb-2'>
                            {formatDate(trip.date)}
                          </div>
                          <div className='small'>
                            <span className='badge bg-primary me-2'>
                              {trip.travelMode}
                            </span>
                            {trip.tripPurpose && (
                              <span className='badge bg-secondary me-2'>
                                {trip.tripPurpose}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='text-end ms-3'>
                          <div className='fw-bold'>{trip.distance}</div>
                          <div className='small text-muted'>
                            {trip.duration}
                          </div>
                        </div>
                      </div>
                      <div className='d-flex justify-content-end mt-2 gap-2'>
                        <button
                          className='btn btn-sm btn-outline-primary'
                          onClick={() => loadTripFromHistory(trip)}
                        >
                          <i className='fas fa-undo me-1'></i> Reload
                        </button>
                        <button
                          className='btn btn-sm btn-outline-danger'
                          onClick={() => deleteTripFromHistory(trip.id)}
                        >
                          <i className='fas fa-trash me-1'></i> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

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
