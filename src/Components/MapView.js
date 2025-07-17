import React, { useEffect, useRef } from 'react';

function MapView({ origin, destination, directions, googleMapsApiKey }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const directionsRendererRef = useRef(null);

  useEffect(() => {
    if (googleMapsApiKey && window.google && mapRef.current) {
      initializeGoogleMap();
    }
  }, [origin, destination, directions, googleMapsApiKey]);

  const initializeGoogleMap = () => {
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 10,
      center: origin || { lat: 0, lng: 0 },
      mapTypeId: 'roadmap',
    });

    mapInstanceRef.current = map;

    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
    }

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
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(origin);
      bounds.extend(destination);
      map.fitBounds(bounds);
    }
  };

  const FallbackMap = () => (
    <div
      style={{
        height: '300px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed #dee2e6',
      }}
    >
      <div className='text-center'>
        <div style={{ fontSize: '2rem' }}>🗺️</div>
        <div className='text-muted'>
          {origin && destination
            ? 'Route Map'
            : 'Map will show here when locations are set'}
        </div>
        {origin && destination && (
          <div className='mt-2'>
            <small className='text-success'>
              📍 Start: {origin.lat.toFixed(4)}, {origin.lng.toFixed(4)}
            </small>
            <br />
            <small className='text-danger'>
              🏁 End: {destination.lat.toFixed(4)}, {destination.lng.toFixed(4)}
            </small>
          </div>
        )}
        {!googleMapsApiKey && (
          <div className='mt-2'>
            <small className='text-warning'>
              Add Google Maps API key for interactive map
            </small>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {googleMapsApiKey && window.google ? (
        <div
          ref={mapRef}
          style={{
            height: '300px',
            borderRadius: '8px',
            border: '1px solid #dee2e6',
          }}
        />
      ) : (
        <FallbackMap />
      )}
    </div>
  );
}

export default MapView;
