import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import eyeInvisible from '../assets/eye-invisible.png';
import { passwordEyes } from './PasswordEyes';
import { useNavigate } from 'react-router-dom';
import globalContext from '../context/global/globalContext';

function ResetPassword() {
  document.title = 'My Notebook | Reset Password';
  const { resetToken } = useParams();
  // console.log(resetToken);

  const gcontext = useContext(globalContext);
  const { showAlert, setSpinner } = gcontext;

  const [credentials, setCredentials] = useState({
    password: '',
    cpassword: '',
  });

  const [check, setCheck] = useState({
    password: false,
    cpassword: false,
  });

  const [passInfo, setPassInfo] = useState(false);

  const passRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={};':"\\|,.<>?])[A-Za-z\d!@#$%^&*()_+\-={};':"\\|,.<>?]{6,}$/;

  let navigate = useNavigate();

  const host = process.env.REACT_APP_MYNOTEBOOK_HOST;

  const handleSubmit = async e => {
    e.preventDefault();
    setSpinner(true);
    const response = await fetch(`${host}/api/auth/resetpassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resetToken,
        password: credentials.password,
      }),
    });
    setSpinner(false);

    const json = await response.json();
    if (json.success) {
      // save the auth token
      showAlert(json.message, 'success');
      navigate('/login');
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

  return (
    <div className="row d-flex justify-content-center mt-5">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card glassBox shadow-lg  ">
          <div className="card-body p-sm-5">
            <form className="mb-3" onSubmit={handleSubmit}>
              <div className="display-5 mb-5 fw-semibold text-center">
                Create New Password
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  New Password
                  <p className="innerEle" id="innerPass"></p>
                </label>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control "
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
                  <span className="input-group-text  " id="basic-addon1">
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
                    className="form-control  "
                    name="cpassword"
                    id="cpassword"
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
                  <span className="input-group-text  " id="basic-addon1">
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
                  className="btn btn-primary"
                  id="saveNewPassBtn"
                  type="submit"
                  disabled={check.password && check.cpassword ? false : true}
                >
                  Save New Password
                </button>
              </div>
            </form>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
