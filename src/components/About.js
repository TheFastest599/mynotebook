import React from 'react';

function About() {
  document.title = 'MyNotebook | About';
  return (
    <div className="container my-4">
      <div className="row">
        <h2 className="col-12 display-2">About</h2>
      </div>
      <div className="row ">
        <div className="col-12 aboutTextContent mt-2">
          Welcome to MyNotebook, your go-to platform for streamlined
          note-taking, task management, and future planning. Powered by the MERN
          (MongoDB, Express.js, React, Node.js) stack, our small but mighty
          project is designed to simplify your daily life by providing a
          seamless and efficient way to organize your thoughts, tasks, and
          reminders.
        </div>
      </div>

      <div className="row mt-4 aboutTextContent">
        <h4 className="col-12 display-4">What We Offer:</h4>
        <hr />
        <h5 className="col-12 display-5">Notes:</h5>
        <div className="col-12">
          Easily jot down your
          <strong> ideas, thoughts, and important information </strong>
          with our intuitive <storng>note-taking</storng> feature. Whether
          you're brainstorming for a project or simply want to capture a moment
          of inspiration, our platform ensures that your notes are organized and
          accessible whenever you need them.
        </div>
        <h5 className="col-12 display-5">Todos:</h5>
        <div className="col-12">
          Stay on top of your <strong> tasks and to-dos </strong> with our
          powerful <strong> task management system </strong>. Create, edit, and
          mark tasks as completed, helping you prioritize and manage your
          workload effectively. Our user-friendly interface ensures a
          hassle-free experience, allowing you to focus on what matters most.{' '}
        </div>
        <h5 className="col-12 display-5">Reminders:</h5>
        <div className="col-12">
          Never miss a <strong> deadline </strong> or forget an{' '}
          <strong> important event </strong> again. With our{' '}
          <strong> email reminder </strong> feature, you can set future
          reminders for yourself. Receive timely notifications directly to your
          inbox, keeping you informed and on track with your commitments.
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12 aboutTextContent mb-5">
          <h4 className="col-12 display-4">How It Works:</h4>
          Our MERN stack project leverages the latest technologies to provide a
          responsive and dynamic user experience. The MongoDB database ensures
          efficient data storage, while Express.js facilitates the smooth flow
          of information between the backend and frontend. The React frontend
          offers a modern and intuitive interface, while Node.js handles the
          server-side operations.
        </div>
      </div>
    </div>
  );
}

export default About;
