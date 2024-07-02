import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import eyeInvisible from '../assets/eye-invisible.png';
import { passwordEyes } from './PasswordEyes';
import globalContext from '../context/global/globalContext';

function Account() {
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  let navigate = useNavigate();
  if (!localStorage.getItem('token')) {
    navigate('/login');
  }
  useEffect(() => {
    passwordEyes('password', 'passwordEye');
  }, []);
  const [credentials, setCredentials] = useState({ password: '' });
  const onChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Set states for account deletion
  const [passCheck, setPassCheck] = useState(false);
  const [count, setCount] = useState(30);
  const [disableDelete, setDisableDelete] = useState(true);

  const gcontext = useContext(globalContext);
  const { showAlert, setSpinner } = gcontext;

  const host = process.env.REACT_APP_MYNOTEBOOK_HOST;

  // Hamdle submit for password check
  const handleSubmit = async e => {
    e.preventDefault();
    const { password } = credentials;
    setSpinner(true);
    const response = await fetch(`${host}/api/auth/checkuserpass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        password,
      }),
    });
    setSpinner(false);

    const json = await response.json();
    if (json.success) {
      setPassCheck(true);
      showAlert(json.message, 'success');
      deleteCounting();
    } else {
      setPassCheck(false);
      showAlert(json.error, 'danger');
    }
  };

  // Handle user deletion
  const handleUserDelete = async e => {
    e.preventDefault();
    const { password } = credentials;
    setSpinner(true);
    const response = await fetch(`${host}/api/auth/deleteuser`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        password,
      }),
    });
    setSpinner(false);

    const json = await response.json();
    if (json.success) {
      showAlert(json.message, 'success');
      document.getElementById('deleteAccountModalClose').click();
      // Logout user
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      navigate('/');
    } else {
      showAlert(json.error, 'danger');
    }
  };

  // Function for 30sec countdown for deletion
  function deleteCounting() {
    const intervalId = setInterval(() => {
      setCount(currentCount => {
        if (currentCount === 1) {
          setDisableDelete(false);
          clearInterval(intervalId); // Clear interval when count reaches 0
          return currentCount - 1;
        }
        return currentCount - 1;
      });
    }, 1000);
  }

  return (
    <div>
      {/* Card showing user details */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh',
        }}
      >
        <div className="card glassBox col-12 col-md-6 ">
          <div className="card-body">
            <h2 className="card-title">Account</h2>
            <div className="card-text p-1">
              <div className="mb-3">
                <label htmlFor="accName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="accName"
                  value={name}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="accEmail" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="accEmail"
                  value={email}
                  readOnly
                />
              </div>
            </div>
            <div className=" text-end ">
              <p>
                <Link
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('name');
                    localStorage.removeItem('email');
                  }}
                  className=" loginLink"
                  to="/forgot_password"
                >
                  Change Password /Forgot password?
                </Link>
              </p>
            </div>
            <hr />
            <div className="row mt-2">
              <div className="col-6 text-center">
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ backgroundColor: '#be0000' }}
                  id="deleteAccount"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteAccountModal"
                >
                  Delete Account
                </button>
              </div>
              <div className="col-6 text-center">
                <button
                  type="button"
                  className="btn btn-success px-4"
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('name');
                    localStorage.removeItem('email');
                    navigate('/');
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Account delete Card */}
      <div
        className="modal fade"
        id="deleteAccountModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content accCard">
            <div className="modal-header">
              <h1 className="modal-title fs-4" id="staticBackdropLabel">
                Confirmation :
              </h1>
              <button
                type="button"
                className="btn-close"
                id="deleteAccountModalClose"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <p style={{ fontSize: '1.3rem' }} className="text-info">
                      Your account will be deleted permenantly .{' '}
                      {!passCheck
                        ? 'Enter correct password to continue-'
                        : 'Press the delete button to continue- '}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <form className="mb-3 mt-2">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div className="input-group mb-3">
                      <input
                        type="password"
                        className="form-control accForm"
                        name="password"
                        id="password"
                        placeholder="*******"
                        value={credentials.password}
                        readOnly={passCheck ? true : false}
                        onChange={onChange}
                      />
                      <span
                        className="input-group-text accForm"
                        id="basic-addon1"
                      >
                        <img
                          src={eyeInvisible}
                          alt="invisible eye"
                          id="passwordEye"
                        />
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="container">
                <div className="row">
                  <div className="col-6 text-center">
                    {passCheck ? (
                      <button
                        type="button"
                        className="btn btn-danger px-2"
                        id="deleteAccountFinal"
                        disabled={disableDelete}
                        onClick={handleUserDelete}
                      >
                        Delete Account {count > 0 ? `(${count})` : ''}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary px-4"
                        id="checkPassword"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                  <div className="col-6 text-center">
                    <button
                      type="button"
                      className="btn btn-secondary px-4"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
