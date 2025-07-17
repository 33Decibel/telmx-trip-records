import React, { useState } from 'react';
import { geocode } from '../services/geocodeService';
import {
  getPlacesSuggestions,
  getPlaceDetails,
} from '../services/googleMapsService';

function LocationInput({
  label,
  value,
  onChange,
  onLocationSelect,
  placeholder,
  useGoogleAPI = true,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionToken] = useState(
    () =>
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
  );

  const fetchSuggestions = async (query) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    try {
      if (useGoogleAPI) {
        const result = await getPlacesSuggestions(query, sessionToken);
        if (result.status === 'success') {
          setSuggestions(result.predictions);
          setShowDropdown(result.predictions.length > 0);
        } else {
          await fetchOSMSuggestions(query);
        }
      } else {
        await fetchOSMSuggestions(query);
      }
    } catch (error) {
      await fetchOSMSuggestions(query);
    } finally {
      setLoading(false);
    }
  };

  const fetchOSMSuggestions = async (query) => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}&limit=5`;
      const res = await fetch(url);
      const data = await res.json();

      const osmSuggestions = data.map((item) => ({
        placeId: item.osm_id,
        description: item.display_name,
        mainText: item.display_name.split(',')[0],
        secondaryText: item.display_name,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        isOSM: true,
      }));

      setSuggestions(osmSuggestions);
      setShowDropdown(osmSuggestions.length > 0);
    } catch (error) {
      setSuggestions([]);
      setShowDropdown(false);
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
      let locationData;

      if (place.isOSM) {
        locationData = {
          lat: place.lat,
          lng: place.lng,
          address: place.description,
        };
      } else {
        const details = await getPlaceDetails(place.placeId, sessionToken);
        if (details.status === 'success') {
          locationData = {
            lat: details.lat,
            lng: details.lng,
            address: details.address,
            name: details.name,
          };
        } else {
          return;
        }
      }

      onChange(locationData.address);
      onLocationSelect(locationData);
      setSuggestions([]);
      setShowDropdown(false);
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
                  <div className='fw-bold'>{suggestion.mainText}</div>
                  <small className='text-muted'>
                    {suggestion.secondaryText || suggestion.description}
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

export default LocationInput;
