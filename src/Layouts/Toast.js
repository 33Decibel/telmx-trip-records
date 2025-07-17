import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

function Toast() {
  const { setToast } = useSelector((state) => ({
    setToast: state.Layout.setToast,
  }));
  useEffect(() => {
    if (setToast.isShow) {
      switch (setToast.type) {
        case 'SUCCESS':
          toast.success(setToast.message, { autoClose: 3000 });
          break;
        case 'ERROR':
          toast.error(setToast.message, { autoClose: 3000 });
          break;
        default:
          toast.success(setToast.message, { autoClose: 3000 });
      }
    }
  }, [setToast]);

  return (
    <ToastContainer
      closeButton={false}
      limit={1}
    />
  );
}

export default Toast;
