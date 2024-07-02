import React, { useEffect, useRef, useState } from 'react';

function ForgotPassword() {
  //   Otp process Stuff
  const otpInputs = useRef([]);

  const addRef = el => {
    if (el && !otpInputs.current.includes(el)) {
      otpInputs.current.push(el);
    }
  };

  useEffect(() => {
    const handleInput = index => {
      if (otpInputs.current[index].value.length === 1) {
        if (index < otpInputs.current.length - 1) {
          otpInputs.current[index + 1].focus();
        }
      }
    };

    const eraseLastInput = () => {
      for (let i = otpInputs.current.length - 1; i >= 0; i--) {
        if (otpInputs.current[i].value.length > 0) {
          otpInputs.current[i].value = '';
          otpInputs.current[i].focus();
          break;
        }
      }
    };

    const currentOtpInputs = otpInputs.current;

    currentOtpInputs.forEach((input, index) => {
      input.addEventListener('input', () => handleInput(index));
      input.addEventListener('keydown', function (event) {
        if (event.key === 'Backspace') {
          eraseLastInput();
        }
        if (isNaN(event.key) && event.key !== 'Backspace') {
          event.preventDefault();
        }
      });
    });

    return () => {
      currentOtpInputs.forEach((input, index) => {
        input.removeEventListener('input', () => handleInput(index));
        input.removeEventListener('keydown', function (event) {
          if (event.key === 'Backspace') {
            eraseLastInput();
          }
          if (isNaN(event.key) && event.key !== 'Backspace') {
            event.preventDefault();
          }
        });
      });
    };
  }, []);

  //   ------------------------

  const [emailFound, setEmailFound] = useState(false);

  return (
    <div className="container vh-100" id="forgotPass">
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-12 col-md-8 col-lg-6">
          <div
            className="card shadow-lg t pt-2 my-5"
            style={{ borderWidth: '0px' }}
          >
            <div className="card-body px-sm-5 pt-2">
              <form className="mb-3 mt-md-4" action="/forgotPass" method="POST">
                <div className="display-4 mb-5 fw-semibold text-center">
                  Verification
                </div>
                <div>
                  <div className="container" style={{ maxWidth: '400px' }}>
                    <div className="row">
                      <div className="col-12">
                        <label htmlFor="email" className="form-label">
                          Enter email address :
                          <p className="innerEle" id="innerEmail"></p>
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 input-group">
                        <input
                          type="email"
                          className="form-control forgotPassForm"
                          name="email"
                          id="registeredEmail"
                          placeholder="name@example.com"
                        />
                      </div>
                    </div>
                  </div>
                  {emailFound && (
                    <div
                      className="container mt-3 "
                      id="forgotPassOtp"
                      style={{ maxWidth: '400px' }}
                    >
                      <div className="row justify-content-md-center">
                        <div className="col-12">
                          <label htmlFor="otp" className="form-label">
                            Enter OTP :
                          </label>
                        </div>
                      </div>
                      <div className="row justify-content-md-center mb-5">
                        <div className="col-2">
                          <input
                            type="text"
                            className="form-control forgotPassForm text-center otp"
                            name="otp"
                            maxLength={1}
                            ref={addRef}
                            autoFocus
                          />
                        </div>
                        <div className="col-2">
                          <input
                            type="text"
                            className="form-control forgotPassForm text-center otp"
                            name="otp"
                            maxLength={1}
                            ref={addRef}
                          />
                        </div>
                        <div className="col-2">
                          <input
                            type="text"
                            className="form-control forgotPassForm text-center otp"
                            name="otp"
                            maxLength={1}
                            ref={addRef}
                          />
                        </div>
                        <div className="col-2">
                          <input
                            type="text"
                            className="form-control forgotPassForm text-center otp"
                            name="otp"
                            maxLength={1}
                            ref={addRef}
                          />
                        </div>
                        <div className="col-2">
                          <input
                            type="text"
                            className="form-control forgotPassForm text-center otp"
                            name="otp"
                            maxLength={1}
                            ref={addRef}
                          />
                        </div>
                        <div className="col-2">
                          <input
                            type="text"
                            className="form-control forgotPassForm text-center otp"
                            name="otp"
                            maxLength={1}
                            ref={addRef}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="d-grid justify-content-center mt-4">
                  <button
                    className="btn btn-primary px-5"
                    id="forgotPassBtn"
                    type="button"
                    disabled
                  >
                    Submit
                  </button>
                </div>
                {emailFound && (
                  <div className="container " id="forgotPassResend">
                    <div className="row mt-4" id="resendLine">
                      <div className="col-12 text-center">
                        <p
                          className="mb-0 small"
                          style={{ display: 'inline-block' }}
                        >
                          Didn't receive OTP? &nbsp; &nbsp;|&nbsp;
                        </p>
                        <p
                          style={{ display: 'inline-block' }}
                          className="text-info fw-bold loginLink"
                          id="otpResend"
                        >
                          Resend again
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 448 512"
                            style={{ fill: '#0dcaf0' }}
                          >
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                          </svg>
                        </p>
                      </div>
                    </div>
                    {emailFound && (
                      <div className="row mt-4 " id="resendTimer">
                        <div className="col-12">
                          <p
                            className="mb-0 text-center small fw-bold"
                            style={{ color: '#0393b0' }}
                            id="timer"
                          >
                            Resend in : 30 sec
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
