import React from 'react';
import withRouter from '../../Components/Common/withRouter';

const ParticlesAuth = ({ children }) => {
  return (
    <React.Fragment>
      <div className='auth-page-wrapper pt-5'>
        <div
          className='auth-one-bg-position auth-one-bg h-100'
          id='auth-particles'
        >
          <video
            autoPlay
            muted
            loop
            className='h-100 w-100'
            style={{
              objectFit: 'cover',
              position: 'absolute',
              zIndex: '1',
            }}
          >
            <source
              src={
                'https://assets.gotelmx.com/bg/video-bg.mp4'
                // 'https://gotp-prod.s3.ap-south-1.amazonaws.com/assets/video-bg-02.mp4'
              }
              type='video/mp4'
            />
          </video>
          {/* <div className='bg-overlay'></div> */}

          {/* <div className="shape">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 1440 120">
              <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
            </svg>
          </div> */}
        </div>

        {/* pass the children */}
        {children}

        <footer className='footer' style={{ zIndex: '3' }}>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='text-center'>
                  <p className='mb-0 text-white'>
                    &copy; {new Date().getFullYear()}{' '}
                    {process.env.REACT_APP_NAME} {process.env.REACT_APP_VERSION}{' '}
                    - {process.env.REACT_APP_BUILD_BY}{' '}
                    {process.env.REACT_APP_TAGLINE}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ParticlesAuth);
