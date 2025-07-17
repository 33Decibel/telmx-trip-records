import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

export default function SubHeader({ title }) {
  const location = useLocation();
  return (
    <>
      <Row className=' shadow text-light bg-white'>
        <Col sm={12} className='my-2 '>
          <div
            className='d-flex justify-content-between align-items-center '
            style={{
              minHeight: '41px',
            }}
          >
            <div className='d-flex align-items-lg-center flex-lg-row flex-column'>
              <div className='flex-grow-1 fs-16 text-primary fw-bold'>
                {/* <div className='flex-grow-1 fs-16 text-brand-color fw-bold'> */}
                {title}
              </div>
            </div>
            <div className='d-flex flex-shrink  align-items-center'>
              <div>
                <div className='d-flex justify-content-between align-items-center fs-14'>
                  {/* <Link to='/settings/system'>
                    <div
                      className={
                        location.pathname === '/settings/system'
                          ? 'me-4  cursor-pointer text-primary fw-bold'
                          : 'me-4  cursor-pointer text-muted'
                      }
                    >
                      <i className='ri-settings-4-line align-bottom me-1'></i>
                      System
                    </div>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
