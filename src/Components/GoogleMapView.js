import React, { useEffect, useRef, useState } from 'react';

export default function GoogleMapView({
  origin,
  destination,
  directions,
  travelMode,
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const markersRef = useRef([]);
  const [mapError, setMapError] = useState(null);

  useEffect(() => {
    // Check if Google Maps API is loaded
    if (!window.google || !window.google.maps || !window.google.maps.marker) {
      setMapError('Google Maps API not loaded properly');
      return;
    }

    try {
      initializeMap();
    } catch (error) {
      console.error('Map initialization error:', error);
      setMapError('Failed to initialize map');
    }
  }, [origin, destination, directions, travelMode]);

  const initializeMap = () => {
    if (!mapRef.current) return;

    // Clear previous instances
    if (mapInstanceRef.current) {
      mapInstanceRef.current = null;
    }
    clearMarkers();
    clearDirections();

    // Initialize map
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 10,
      center: origin || { lat: 28.6139, lng: 77.209 },
      mapTypeId: 'roadmap',
    });
    mapInstanceRef.current = map;

    // Add markers
    if (origin) {
      addMarker(origin, 'green', 'S');
    }
    if (destination) {
      addMarker(destination, 'red', 'E');
    }

    // Handle directions
    if (directions) {
      renderDirections();
    } else if (origin && destination) {
      fitBounds();
    }
  };

  const addMarker = (position, color, glyph) => {
    try {
      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        position,
        map: mapInstanceRef.current,
        content: createMarkerContent(color, glyph),
      });
      markersRef.current.push(marker);
    } catch (error) {
      console.error('Marker creation error:', error);
    }
  };

  const createMarkerContent = (color, glyph) => {
    const pinElement = document.createElement('div');
    pinElement.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="40" viewBox="0 0 24 40">
        <path fill="${color}" d="M12 0C5.373 0 0 5.373 0 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C21.138 20.163 24 16.418 24 12c0-6.627-5.373-12-12-12z"/>
        <text x="12" y="22" font-family="Arial" font-size="12" font-weight="bold" fill="white" text-anchor="middle">${glyph}</text>
      </svg>
    `;
    return pinElement;
  };

  const renderDirections = () => {
    if (!directions || !mapInstanceRef.current) return;

    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: getTravelModeColor(travelMode),
        strokeOpacity: 1.0,
        strokeWeight: 4,
      },
    });
    directionsRenderer.setMap(mapInstanceRef.current);
    directionsRenderer.setDirections(directions);
    directionsRendererRef.current = directionsRenderer;
  };

  const fitBounds = () => {
    if (!origin || !destination || !mapInstanceRef.current) return;

    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(origin);
    bounds.extend(destination);
    mapInstanceRef.current.fitBounds(bounds);
  };

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => {
      if (marker) marker.map = null;
    });
    markersRef.current = [];
  };

  const clearDirections = () => {
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
      directionsRendererRef.current = null;
    }
  };

  const getTravelModeColor = (mode) => {
    switch (mode) {
      case 'WALKING':
        return '#10b981';
      case 'BICYCLING':
        return '#3b82f6';
      case 'TRANSIT':
        return '#8b5cf6';
      default:
        return '#4f46e5';
    }
  };

  if (mapError) {
    return (
      <div
        style={{
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa',
          color: '#dc3545',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <h3>Map Error</h3>
        <p>{mapError}</p>
        <p>
          Please check your API key and ensure all required Google Maps services
          are enabled.
        </p>
      </div>
    );
  }

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
