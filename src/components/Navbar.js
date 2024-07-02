import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useScroll } from '../hooks/useScroll';

function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();

  const { scrollDirection } = useScroll();
  const styles = {
    active: {
      visibility: 'visible',
      transition: 'all 0.3s',
    },
    hidden: {
      visibility: 'hidden',
      transition: 'all 0.3s',
      transform: 'translateY(-100%)',
    },
  };

  const navStatus = () => {
    if (scrollDirection === 'down') {
      return styles.active;
    } else if (scrollDirection === undefined) {
      return styles.active;
    } else {
      return styles.hidden;
    }
  };

  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.getElementById('navbarToggler');
    function navbarToggle() {
      document.addEventListener('click', function (event) {
        let isClickInside = navbar.contains(event.target);
        if (!isClickInside) {
          if (navbarToggler.getAttribute('aria-expanded') === 'true') {
            navbarToggler.click();
          }
        }
      });
    }
    navbarToggle();
    return () => {
      document.removeEventListener('click', navbarToggle);
    };
  }, []);

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark  fixed-top"
        style={navStatus()}
      >
        <div className="container-fluid">
          <Link className="navbar-brand myNotebook" to="/">
            MyNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            id="navbarToggler"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === '/' ? 'active' : ''
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === '/content' ? 'active' : ''
                  }`}
                  aria-current="page"
                  to="/content"
                >
                  Content
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === '/about' ? 'active' : ''
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === '/contact_us' ? 'active' : ''
                  }`}
                  to="/contact_us"
                >
                  Contact Us
                </Link>
              </li>
              {localStorage.getItem('token') && (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === '/account' ? 'active' : ''
                    }`}
                    aria-current="page"
                    to="/account"
                  >
                    Account
                  </Link>
                </li>
              )}
            </ul>
            {!localStorage.getItem('token') ? (
              <div className="d-flex justify-content-end">
                <Link to="/login" className="btn mx-1" role="button">
                  Login
                </Link>
                <Link to="/signup" className="btn  mx-1" role="button">
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="d-flex justify-content-end">
                <p className="text-light fs-5 mx-2 my-auto">
                  {localStorage.getItem('name')} |
                </p>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('name');
                    localStorage.removeItem('email');
                    navigate('/');
                  }}
                  className="btn mx-1"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
