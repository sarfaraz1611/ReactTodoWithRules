import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = ({ message }) => {
  const notify = () => toast.success(message, { position: toast.POSITION.TOP_RIGHT });

  return (
    <div>
      <ToastContainer />
      {notify()}
    </div>
  );
};

export default Toast;
