import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './ContactUs.css';
import { useConfig } from './ConfigContext'; // Import the named export


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { apiUrl } = useConfig(); // Destructure apiUrl from the context

  if (apiUrl) {
    console.info('API URL:', {apiUrl});
  }

  const [dialogMessage, setDialogMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Show the dialog with the summary of the message
        setDialogMessage(
          `Thank you, ${data.summary.name}! We have received your message: "${data.summary.messageSnippet}"`
        );

      } else {
        alert('Error: ' + data.error);
      }

      // Clear the form after submission
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting the form.');
    }
  };

  // Display SweetAlert confirmation dialog
  useEffect(() => {
    // Show SweetAlert when the message changes
    if (dialogMessage) {
      Swal.fire({
        title: 'Message Sent',
        text: dialogMessage,
        icon: 'success',
        confirmButtonText: 'Close',
      });
    }
  }, [dialogMessage]); // Trigger when the message state changes

  return (
    <div className="contact-us-container">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>

    </div>
  );
};

export default ContactUs;
