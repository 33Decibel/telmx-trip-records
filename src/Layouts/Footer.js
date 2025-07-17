import React from 'react';
import TelMXLogo from '@assets/images/logo/logo-light.png';

const Footer = () => {
  return (
    <React.Fragment>
      <footer
        className='footer py-3 text-light'
        style={{
          backgroundColor: 'rgba(10, 19, 53,1)',
          zIndex: 1056,
          position: 'fixed',
        }}
      >
        <div className='d-flex justify-content-between flex-wrap align-items-center'>
          <div className='flex-grow-1'>
            {new Date().getFullYear()} ©{/* {process.env.REACT_APP_NAME} */}{' '}
            <img
              src={TelMXLogo}
              alt='Google Play Icon'
              style={{
                width: 'auto',
                height: '18px',
              }}
            />{' '}
            - {process.env.REACT_APP_BUILD_BY}
          </div>
          <div className='flex-shrink-0'>
            <div className='text-sm-end d-none d-sm-block text-capitalize '>
              {process.env.REACT_APP_VERSION} : {process.env.REACT_APP_TAGLINE}
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
