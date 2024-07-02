import React from 'react';

function Alert() {
  return (
    <div className="toast-container position-fixed top-0 end-0 p-3">
      <div
        id="notification"
        className="toast text-light"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div
          className="toast-body alert alert-dismissible pb-3"
          id="notiAlert"
          role="alert"
        >
          <div id="notifcationContent"></div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
}

export default Alert;
