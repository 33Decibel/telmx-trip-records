import React, { useRef } from 'react';
import Flatpickr from 'react-flatpickr';

export default function FlatpickrCalander() {
  const flatpickrRef = useRef(null);

  const openFlatpickr = () => {
    if (flatpickrRef.current) {
      flatpickrRef.current.flatpickr.open();
    }
  };

  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return (
    <>
      {' '}
      <div className='input-group w-auto'>
        <Flatpickr
          ref={flatpickrRef}
          className='form-control border-0 dash-filter-picker shadow'
          options={{
            mode: 'range', // Enables range selection, but only today's date will be selected by default
            dateFormat: 'd M, Y', // Date format as day Month, Year (e.g., 01 Jan, 2022)
            defaultDate: [
              today.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              }),
            ], // Default selected date is today
            enableTime: true, // Enables time picker
          }}
        />
        <div
          className='input-group-text bg-primary border-primary text-white'
          onClick={openFlatpickr}
          style={{ cursor: 'pointer' }}
        >
          <i className='ri-calendar-2-line'></i>
        </div>
      </div>
    </>
  );
}
