import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import globalContext from '../context/global/globalContext';
import eyeInvisible from '../assets/eye-invisible.png';
import { Link } from 'react-router-dom';
import { passwordEyes } from './PasswordEyes';

function Login() {
  document.title = 'My Notebook | Login';
  const gcontext = useContext(globalContext);
  const { showAlert, setSpinner } = gcontext;
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  let navigate = useNavigate();
  const host = process.env.REACT_APP_MYNOTEBOOK_HOST;
  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = credentials;
    setSpinner(true);
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    setSpinner(false);

    const json = await response.json();
    // console.log(json);
    if (json.success) {
      // save the auth token
      localStorage.setItem('token', json.authToken);
      localStorage.setItem('name', json.name);
      localStorage.setItem('email', json.email);
      showAlert('Logged In Successfully', 'success');
      navigate('/content');
    } else {
      showAlert('Invalid credentials', 'danger');
    }
  };
  const onChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    passwordEyes('password', 'passwordEye');
  }, []);

  return (
    <div className="row d-flex justify-content-center mt-5">
      <div className="col-12 col-md-8 col-lg-6">
        <div
          className="card glassBox shadow-lg   pb-5 pt-2 mt-5"
          style={{ borderWidth: '0px' }}
        >
          <div className="card-body px-sm-5 pt-4">
            <form className="mb-3 mt-md-4" onSubmit={handleSubmit}>
              <div className="display-4 mb-5 fw-semibold text-center">
                Login
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control "
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                  placeholder="Enter here"
                />
              </div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="*******"
                  value={credentials.password}
                  onChange={onChange}
                />
                <span className="input-group-text " id="basic-addon1">
                  <img
                    src={eyeInvisible}
                    alt="invisible eye"
                    id="passwordEye"
                  />
                </span>
              </div>
              <div className=" text-end py-2">
                <p className="small ">
                  <Link className=" loginLink" to="/forgot_password">
                    Forgot password?
                  </Link>
                </p>
              </div>
              <div className="d-grid justify-content-center">
                <button
                  className="btn btn-primary userButton"
                  id="loginButton"
                  type="submit "
                >
                  Login
                </button>
              </div>
            </form>
            <br />
            <div>
              <p className="mb-0 text-center small">
                Don't have an account? &nbsp;&nbsp; | &nbsp;&nbsp;
                <Link to="/signup" className=" fw-bold loginLink">
                  Sign Up
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                    style={{ fill: '#ffffff' }}
                  >
                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                  </svg>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
