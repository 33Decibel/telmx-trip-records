import React from 'react';
import LocationForm from '../../Components/LocationForm';

function TrackerPage() {
  return (
    <div className='container-fluid bg-light  py-1 px-1'>
      <div
        className='mx-auto  p-2 '
        style={{ maxWidth: '1500px' }}
      >
        <LocationForm />
      </div>
    </div>
  );
}

export default TrackerPage;
