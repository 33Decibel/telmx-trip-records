import React from 'react';

export default function ConfirmationDialog({
  show,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!show) return null;

  return (
    <div
      className='modal show d-block'
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      tabIndex='-1'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>{title}</h5>
            <button
              type='button'
              className='btn-close'
              onClick={onCancel}
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <p>{message}</p>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
