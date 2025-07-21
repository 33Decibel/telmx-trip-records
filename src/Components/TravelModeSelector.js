import React from 'react';

export default function TravelModeSelector({ value, onChange }) {
  const travelModes = [
    { value: 'DRIVING', label: 'Car', icon: '🚗' },
    { value: 'WALKING', label: 'Walking', icon: '🚶' },
    { value: 'BICYCLING', label: 'Bicycle', icon: '🚴' },
    { value: 'TRANSIT', label: 'Transit', icon: '🚆' },
  ];

  return (
    <div className='mb-3'>
      <label className='form-label small text-muted'>Travel Mode</label>
      <select
        className='form-select form-select-sm'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ borderRadius: '6px' }}
      >
        {travelModes.map((mode) => (
          <option
            key={mode.value}
            value={mode.value}
          >
            {mode.icon} {mode.label}
          </option>
        ))}
      </select>
    </div>
  );
}
