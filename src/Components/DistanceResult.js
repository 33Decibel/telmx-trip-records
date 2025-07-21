import React from 'react';

export default function DistanceResult({ data }) {
  if (!data || typeof data !== 'object') {
    console.error('Invalid data prop:', data);
    return null;
  }

  const isGoogleData = data.source === 'google';
  const isStraightLine = data.source === 'haversine';
  const hasError = data.status === 'error';

  const getTravelModeIcon = () => {
    if (!data.travelMode) return '🚗';
    switch (data.travelMode.toUpperCase()) {
      case 'DRIVING':
        return '🚗';
      case 'WALKING':
        return '🚶';
      case 'BICYCLING':
        return '🚴';
      case 'TRANSIT':
        return '🚆';
      default:
        return '🚗';
    }
  };

  const getTravelModeLabel = () => {
    if (!data.travelMode) return 'Driving';
    switch (data.travelMode.toUpperCase()) {
      case 'DRIVING':
        return 'Driving';
      case 'WALKING':
        return 'Walking';
      case 'BICYCLING':
        return 'Bicycling';
      case 'TRANSIT':
        return 'Transit';
      default:
        return 'Driving';
    }
  };

  const renderDistance = () => {
    if (!data.distance) return 'N/A';
    return typeof data.distance === 'string'
      ? data.distance
      : `${data.distance} km`;
  };

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
            {renderDistance()}
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
            {getTravelModeIcon()} {getTravelModeLabel()}
          </span>

          {hasError && (
            <span className='badge bg-danger ms-2'>
              Error: {data.error || 'Unknown error'}
            </span>
          )}
        </div>

        {data.tripPurpose && (
          <div className='mb-3'>
            <div className='small text-muted'>Purpose:</div>
            <div
              className='small fw-bold'
              style={{ textTransform: 'capitalize' }}
            >
              {data.tripPurpose}
            </div>
          </div>
        )}

        {(data.startAddress || data.endAddress) && (
          <div className='mb-3'>
            <div className='row'>
              <div className='col-12 col-md-6'>
                <div className='small text-success fw-bold'>📍 Start:</div>
                <div className='small text-muted'>
                  {data.startAddress || 'N/A'}
                </div>
              </div>
              <div className='col-12 col-md-6'>
                <div className='small text-danger fw-bold'>🏁 End:</div>
                <div className='small text-muted'>
                  {data.endAddress || 'N/A'}
                </div>
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

        {hasError && (
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
