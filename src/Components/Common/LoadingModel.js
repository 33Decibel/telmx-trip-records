import PropTypes from 'prop-types';
import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

// usownftb

const LoadingModel = ({
  show,
  isLoading = false,
  loadingText,
  successText,
  loadingDone,
  responseFail,
  failText,
  loadingIcon,
}) => {
  // <lord-icon target="div" loading="interaction" trigger="hover" src="https://media.lordicon.com/icons/system/solid/731-spinner-three-squares.li">
  //           <img alt="" loading="eager" src="https://media.lordicon.com/icons/system/solid/731-spinner-three-squares.svg">
  // {/* </lord-icon> */}
  return (
    <Modal isOpen={show} centered={true}>
      <ModalBody className='py-3 px-5'>
        <div className='mt-2 text-center'>
          {!isLoading ? (
            !responseFail ? (
              <lord-icon
                src='https://cdn.lordicon.com/ymsapbnv.json'
                trigger='in'
                colors='primary:#121331,secondary:#08a88a'
                style={{ width: '100px', height: '100px' }}
              ></lord-icon>
            ) : (
              <lord-icon
                src='https://cdn.lordicon.com/usownftb.json'
                trigger='loop'
                colors='primary:#121331,secondary:#08a88a'
                style={{ width: '100px', height: '100px' }}
              ></lord-icon>
            )
          ) : (
            <lord-icon
              src={loadingIcon || 'https://cdn.lordicon.com/rqptwppx.json'}
              trigger='loop'
              colors='primary:#121331,secondary:#08a88a'
              style={{ width: '100px', height: '100px' }}
            ></lord-icon>
          )}

          <div className='mt-4 pt-2 fs-15 mx-3 mx-sm-5'>
            <h4 className='text-rainbow'>
              {loadingDone
                ? responseFail
                  ? failText
                  : successText
                : loadingText}
            </h4>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

LoadingModel.propTypes = {
  show: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadingText: PropTypes.string.isRequired,
  successText: PropTypes.string.isRequired,
  failText: PropTypes.string.isRequired,
  loadingDone: PropTypes.bool.isRequired,
  responseFail: PropTypes.bool.isRequired,
  loadingIcon: PropTypes.string,
};

export default LoadingModel;

// https://cdn.lordicon.com/ymsapbnv.json
