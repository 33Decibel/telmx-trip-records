import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

const statusIcons = {
  loading: 'https://cdn.lordicon.com/rqptwppx.json',
  success: 'https://cdn.lordicon.com/ymsapbnv.json',
  fail: 'https://cdn.lordicon.com/usownftb.json',
};

const LoadingStatusModel = ({
  show,
  status = 'loading',
  loadingText,
  successText,
  failText,
  loadingIcon,
}) => {
  const getIcon = () => {
    if (status === 'loading') return loadingIcon || statusIcons.loading;
    if (status === 'fail') return statusIcons.fail;
    return statusIcons.success;
  };

  const getText = () => {
    if (status === 'success') return successText;
    if (status === 'fail') return failText;
    return loadingText;
  };

  return (
    <Modal isOpen={show} centered>
      <ModalBody className='py-3 px-5'>
        <div className='mt-2 text-center'>
          <lord-icon
            src={getIcon()}
            trigger={status === 'loading' ? 'loop' : 'in'}
            colors='primary:#121331,secondary:#08a88a'
            style={{ width: '100px', height: '100px' }}
          ></lord-icon>
          <div className='mt-4 pt-2 fs-15 mx-3 mx-sm-5'>
            <h4 className='text-rainbow'>{getText()}</h4>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default LoadingStatusModel;
