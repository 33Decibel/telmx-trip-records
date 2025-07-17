import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Loading() {
  const { loading } = useSelector((state) => ({
    loading: state.Layout.loading,
  }));

  return (
    <>
      {loading.show && (
        <>
          <div className='fixed-top h-100 w-100 bg-dark bg-opacity-50'></div>
          <div className='fixed-top h-100 w-100'>
            <div className='h-100 w-100 position-relative'>
              <div className='position-absolute top-50 start-50 translate-middle avatar-xs ms-2'>
                <div className='spin'></div>
              </div>
              <div className='position-absolute top-50 mt-3 ms-0 w-100 text-center text-light fs-4'>
                {loading.msg}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Loading;
