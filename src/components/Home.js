import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import particlesOptions from '../assets/particlesjs-config.json';
import user from '../assets/socialLinks.json';

function Home() {
  document.title = 'My Notebook ';
  let navigate = useNavigate();
  // Particle JS
  const particlesInit = useCallback(async engine => {
    // console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    // await console.log(container);
  }, []);

  const publicUrl = process.env.PUBLIC_URL;
  return (
    <div>
      {/* HeroSection */}
      <div style={{ height: '75vh' }} className="glassBox my-4">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={particlesOptions}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <p id="WelcomeMessage" className="mt-1">
            Welcome to <b className="myNotebookH"> MyNotebook</b>!!!
          </p>
          <p id="NoteMessage">
            Save all your Notes,TODOs and Email Reminders here on the cloud!
          </p>
          <button
            type="button"
            className="btn btn-primary btn-lg mt-4 fw-bolder fs-4 py-2 px-3 userButton"
            onClick={() => {
              navigate('/content');
            }}
          >
            Content Page{' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
              style={{ fill: '#ffffff' }}
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </button>
          {/* <button
            onClick={() => {
              navigate('/content');
            }}
            className="button-85 mt-4 fw-bold fs-4 py-2 px-3"
            type="button"
          >
            Content Page
          </button> */}
        </div>
      </div>
      {/* Features */}
      <div className="container my-5">
        <div className="row">
          {/* Notes */}
          <div className=" col-md-6 col-xl-4 my-2">
            <div className="card glassBox">
              <div
                id="carouselExampleCaptions1"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions1"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions1"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions1"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions1"
                    data-bs-slide-to="3"
                    aria-label="Slide 4"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={publicUrl + '/assests/notes-carousel/1.jpg'}
                      className="d-block w-100"
                      style={{
                        borderRadius: '16px 16px 0px 0px',
                        minHeight: '100px',
                      }}
                      alt="notes1"
                      loading="lazy"
                    />
                  </div>
                  <div className="carousel-item ">
                    <img
                      src={publicUrl + '/assests/notes-carousel/2.jpg'}
                      className="d-block w-100"
                      style={{
                        borderRadius: '16px 16px 0px 0px',
                        minHeight: '100px',
                      }}
                      alt="notes2"
                      loading="lazy"
                    />
                  </div>
                  <div className="carousel-item ">
                    <img
                      src={publicUrl + '/assests/notes-carousel/3.jpg'}
                      className="d-block w-100"
                      style={{
                        borderRadius: '16px 16px 0px 0px',
                        minHeight: '100px',
                      }}
                      alt="notes3"
                      loading="lazy"
                    />
                  </div>
                  <div className="carousel-item ">
                    <img
                      src={publicUrl + '/assests/notes-carousel/4.jpg'}
                      className="d-block w-100"
                      style={{
                        borderRadius: '16px 16px 0px 0px',
                        minHeight: '100px',
                      }}
                      alt="notes4"
                      loading="lazy"
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleCaptions1"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleCaptions1"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <div className="card-body">
                <h2 className="card-title">Notes</h2>
                <p className="card-text">
                  Easily jot down your
                  <b> ideas, thoughts, and important information </b>
                  with our intuitive <b>note-taking</b> feature. Whether you're
                  brainstorming for a project or simply want to capture a moment
                  of inspiration, our platform ensures that your notes are
                  organized and accessible whenever you need them.
                </p>
              </div>
            </div>
          </div>
          {/* Todos */}
          <div className=" col-md-6 col-xl-4 my-2">
            <div className="card glassBox">
              <div
                id="carouselExampleCaptions2"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions2"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions2"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions2"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={publicUrl + '/assests/todos-carousel/1.jpg'}
                      className="d-block w-100"
                      style={{
                        borderRadius: '16px 16px 0px 0px',
                        minHeight: '100px',
                      }}
                      alt="notes1"
                      loading="lazy"
                    />
                  </div>
                  <div className="carousel-item ">
                    <img
                      src={publicUrl + '/assests/todos-carousel/2.jpg'}
                      className="d-block w-100"
                      style={{
                        borderRadius: '16px 16px 0px 0px',
                        minHeight: '100px',
                      }}
                      alt="notes2"
                      loading="lazy"
                    />
                  </div>
                  <div className="carousel-item ">
                    <img
                      src={publicUrl + '/assests/todos-carousel/3.jpg'}
                      className="d-block w-100"
                      style={{
                        borderRadius: '16px 16px 0px 0px',
                        minHeight: '100px',
                      }}
                      alt="notes3"
                      loading="lazy"
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleCaptions2"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleCaptions2"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <div className="card-body">
                <h2 className="card-title">Todos</h2>
                <p className="card-text">
                  Stay on top of your <b> tasks and to-dos </b> with our
                  powerful <b> task management system </b>. Create, edit, and
                  mark tasks as completed, helping you prioritize and manage
                  your workload effectively. Our user-friendly interface ensures
                  a hassle-free experience, allowing you to focus on what
                  matters most.
                </p>
              </div>
            </div>
          </div>
          {/* Reminders */}
          <div className=" col-md-6 col-xl-4 my-2">
            <div className="card glassBox">
              <div
                id="carouselExampleCaptions3"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions3"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions3"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions3"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions3"
                    data-bs-slide-to="3"
                    aria-label="Slide 4"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions3"
                    data-bs-slide-to="4"
                    aria-label="Slide 5"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={publicUrl + '/assests/reminder-carousel/1.jpg'}
                      className="d-block w-100"
                      style={{
                        borderRadius: '16px 16px 0px 0px',
                        minHeight: '100px',
                      }}
                      alt="notes1"
                      loading="lazy"
                    />
                  </div>
                  <div className="carousel-item ">
                    <img
                      src={publicUrl + '/assests/reminder-carousel/2.jpg'}
                      className="d-block w-100"
                      style={{
                        borderRadius: '16px 16px 0px 0px',
                        minHeight: '100px',
                      }}
                      alt="notes2"
                      loading="lazy"
                    />
                  </div>
                  <div className="carousel-item ">
                    <img
                      src={publicUrl + '/assests/reminder-carousel/3.jpg'}
                      className="d-block w-100"
                      style={{
                        borderRadius: '16px 16px 0px 0px',
                        minHeight: '100px',
                      }}
                      alt="notes3"
                      loading="lazy"
                    />
                  </div>
                  <div className="carousel-item ">
                    <img
                      src={publicUrl + '/assests/reminder-carousel/4.jpg'}
                      className="d-block w-100"
                      style={{
                        borderRadius: '16px 16px 0px 0px',
                        minHeight: '100px',
                      }}
                      alt="notes4"
                      loading="lazy"
                    />
                  </div>
                  <div className="carousel-item ">
                    <img
                      src={publicUrl + '/assests/reminder-carousel/5.jpg'}
                      className="d-block w-100"
                      style={{
                        borderRadius: '16px 16px 0px 0px',
                        minHeight: '100px',
                      }}
                      alt="notes4"
                      loading="lazy"
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleCaptions3"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleCaptions3"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <div className="card-body">
                <h2 className="card-title">Email Reminders</h2>
                <p className="card-text">
                  Never miss a <b> deadline </b> or forget an
                  <b> important event </b> again. With our
                  <b> email reminder </b> feature, you can set future reminders
                  for yourself. Receive timely notifications directly to your
                  inbox, keeping you informed and on track with your
                  commitments.Set an Email Reminder for the future you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className=" text-center glassBox">
        <div className="container px-4 py-3 pb-0">
          <section className="mb-2">
            <a
              data-mdb-ripple-init
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: '#55acee' }}
              href={user.socials.twitter}
              role="button"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>

            <a
              data-mdb-ripple-init
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: '#ac2bac' }}
              href={user.socials.instagram}
              role="button"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              data-mdb-ripple-init
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: '#0082ca' }}
              href={user.socials.linkedin}
              role="button"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>

            <a
              data-mdb-ripple-init
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: '#333333' }}
              href={user.socials.github}
              target="_blank"
              rel="noreferrer"
              role="button"
            >
              <i className="fab fa-github"></i>
            </a>
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        >
          <a
            className="myNotebookH"
            style={{ textDecoration: 'none' }}
            href="/"
          >
            MyNotebook
          </a>{' '}
          -by Anirban Saha
        </div>
      </footer>
    </div>
  );
}

export default Home;
