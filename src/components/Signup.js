import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import globalContext from '../context/global/globalContext';
import eyeInvisible from '../assets/eye-invisible.png';
import { Link } from 'react-router-dom';
import { passwordEyes } from './PasswordEyes';

function Signup() {
  document.title = 'My Notebook | Sign Up';
  const gcontext = useContext(globalContext);
  const { showAlert, setSpinner } = gcontext;

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const [check, setCheck] = useState({
    name: false,
    email: false,
    password: false,
    cpassword: false,
  });

  useEffect(() => {
    if (credentials.password !== credentials.cpassword) {
      setCheck(prevCheck => ({ ...prevCheck, cpassword: false }));
    }
  }, [credentials.password, credentials.cpassword]);
  // For password and check password

  const [passInfo, setPassInfo] = useState(false);

  const passRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={};':"\\|,.<>?])[A-Za-z\d!@#$%^&*()_+\-={};':"\\|,.<>?]{6,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  let navigate = useNavigate();

  const host = process.env.REACT_APP_MYNOTEBOOK_HOST;

  const handleSubmit = async e => {
    const { name, email, password } = credentials;
    e.preventDefault();
    setSpinner(true);
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
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
      showAlert('Account Created Successfully', 'success');
      navigate('/');
    } else {
      if (json.error) {
        showAlert(json.error, 'danger');
      } else {
        showAlert('Invalid credentials', 'danger');
      }
    }
  };
  const onChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    passwordEyes('password', 'passwordEye');
    passwordEyes('cpassword', 'cpasswordEye');
  }, []);

  // console.log(check);

  return (
    <div className="row d-flex justify-content-center my-4">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card glassBox shadow-lg ">
          <div className="card-body p-sm-5">
            <form className="mb-3" onSubmit={handleSubmit}>
              <div className="display-4 mb-5 fw-semibold text-center">
                Sign Up
              </div>
              <div className="mb-3">
                <label htmlFor="text" className="form-label">
                  Full Name
                  <p className="innerEle" id="innerFname"></p>
                </label>
                <input
                  type="text"
                  className="form-control "
                  name="name"
                  id="name"
                  style={
                    check.name ? { border: '2px solid rgb(0, 211, 0)' } : {}
                  }
                  onChange={e => {
                    onChange(e);
                    if (e.target.value.length >= 3) {
                      setCheck({ ...check, name: true });
                    } else {
                      setCheck({ ...check, name: false });
                    }
                  }}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                  <p className="innerEle" id="innerEmail"></p>
                </label>
                <input
                  type="email"
                  className="form-control "
                  name="email"
                  id="email"
                  style={
                    check.email ? { border: '2px solid rgb(0, 211, 0)' } : {}
                  }
                  onChange={e => {
                    onChange(e);
                    if (emailRegex.test(e.target.value)) {
                      setCheck({ ...check, email: true });
                    } else {
                      setCheck({ ...check, email: false });
                    }
                  }}
                  placeholder="name@example.com"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                  <p className="innerEle" id="innerPass"></p>
                </label>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control registerForm"
                    name="password"
                    id="password"
                    onFocus={() => {
                      setPassInfo(true);
                    }}
                    style={
                      check.password
                        ? { border: '2px solid rgb(0, 211, 0)' }
                        : {}
                    }
                    onChange={e => {
                      onChange(e);
                      if (passRegex.test(e.target.value)) {
                        setCheck({ ...check, password: true });
                      } else {
                        setCheck({ ...check, password: false });
                      }
                    }}
                    placeholder="*******"
                  />
                  <span className="input-group-text " id="basic-addon1">
                    <img
                      src={eyeInvisible}
                      alt="invisible eye"
                      id="passwordEye"
                    />
                  </span>
                </div>
              </div>
              <div
                id="criteria"
                className="small"
                style={
                  check.password
                    ? { display: 'none' }
                    : { display: 'block', color: 'white' }
                }
              >
                <ul>
                  {passInfo && (
                    <li id="passInfo">
                      Use a combination of atleast 1 uppercase,1 lowercase,1
                      symbol,numbers and minimum length of 6.
                    </li>
                  )}
                </ul>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Confirm Password
                  <p className="innerEle" id="innerCPass"></p>
                </label>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control "
                    name="cpassword"
                    id="cpassword"
                    readOnly={check.password ? false : true}
                    style={
                      check.cpassword
                        ? { border: '2px solid rgb(0, 211, 0)' }
                        : {}
                    }
                    onChange={e => {
                      onChange(e);
                      if (e.target.value === credentials.password) {
                        setCheck({ ...check, cpassword: true });
                      } else {
                        setCheck({ ...check, cpassword: false });
                      }
                    }}
                    placeholder="*******"
                  />
                  <span className="input-group-text " id="basic-addon1">
                    <img
                      src={eyeInvisible}
                      alt="invisible eye"
                      id="cpasswordEye"
                    />
                  </span>
                </div>
              </div>
              <div className="d-grid justify-content-center pt-4">
                <button
                  className="btn btn-primary userButton"
                  id="signupBtn"
                  type="submit"
                  disabled={
                    check.name &&
                    check.email &&
                    check.password &&
                    check.cpassword
                      ? false
                      : true
                  }
                >
                  Sign Up
                </button>
              </div>
            </form>
            <br />
            <div>
              <p className="mb-0 text-center small">
                Already have an account?&nbsp; &nbsp;|&nbsp; &nbsp;
                <Link to="/login" className=" fw-bold loginLink">
                  Login
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

export default Signup;
