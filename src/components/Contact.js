import React, { useContext, useState } from 'react';
import globalContext from '../context/global/globalContext';
import user from '../assets/socialLinks.json';

const Contact = () => {
  document.title = 'My Notebook | Contact Us';
  const gcontext = useContext(globalContext);
  const { showAlert, setSpinner } = gcontext;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, message } = formData;
    // Add your logic to handle the form submission, such as sending an email or storing data.
    const host = process.env.REACT_APP_MYNOTEBOOK_HOST;
    setSpinner(true);
    const response = await fetch(`${host}/api/contactus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });
    setSpinner(false);
    const json = await response.json();
    if (json.success) {
      showAlert(json.message, 'success');
    } else if (!json.success) {
      showAlert(json.error, 'danger');
    }
  };

  return (
    <div className="container glassBox my-5 py-3">
      <h2 className="col-12 display-2">Contact Us</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <p className="display-6">Tell Us about it!</p>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={formData.name.length < 1 || formData.message.length < 1}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
      {/* Social Media and Email Links */}
      <div className="mt-4 text-center">
        <p className="mt-4">Connect with us:</p>
        <a
          href={user.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="me-4 contactLink"
        >
          GitHub
        </a>
        <a
          href={user.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="me-4 contactLink"
        >
          LinkedIn
        </a>
        <a
          href={user.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="me-4 contactLink"
        >
          Instagram
        </a>
        <a href={`mailto:${user.email}`} className="me-2 contactLink">
          Email
        </a>
      </div>
    </div>
  );
};

export default Contact;
