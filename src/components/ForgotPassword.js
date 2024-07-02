import React, { useContext, useState } from 'react';
import globalContext from '../context/global/globalContext';

function ForgotPassword() {
  document.title = 'My Notebook | Forgot Password';
  const [credentials, setCredentials] = useState({
    email: '',
  });
  const onChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const host = process.env.REACT_APP_MYNOTEBOOK_HOST;
  const gcontext = useContext(globalContext);
  const { showAlert, setSpinner } = gcontext;

  const handleSubmit = async e => {
    const { email } = credentials;
    e.preventDefault();
    // Get the current URL information
    setSpinner(true);
    const response = await fetch(`${host}/api/auth/forgotpassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        clientUrl: `${window.location.protocol}//${window.location.host}`,
      }),
    });
    setSpinner(false);

    const json = await response.json();
    // console.log(json);
    if (json.success) {
      showAlert(json.message, 'success');
    } else {
      if (json.error) {
        showAlert(json.error, 'danger');
      } else {
        showAlert('Invalid credentials', 'danger');
      }
    }
  };
  return (
    <div className="row d-flex justify-content-center mt-5">
      <div className="col-12 col-md-8 col-lg-6">
        <div
          className="card glassBox shadow-lg t pt-2 my-5"
          style={{ borderWidth: '0px' }}
        >
          <div className="card-body px-sm-5 pt-2">
            <form className="mb-3 mt-md-4" onSubmit={handleSubmit}>
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
                        className="form-control "
                        name="email"
                        id="registeredEmail"
                        placeholder="name@example.com"
                        value={credentials.email}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-grid justify-content-center mt-4">
                <button
                  className="btn btn-primary px-5"
                  id="forgotPassBtn"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
