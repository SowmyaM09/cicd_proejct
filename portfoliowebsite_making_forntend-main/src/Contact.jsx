import React from 'react';
import './Contact.css';

const Contact = () => (
  <div className="contact-page">
    <h2>Contact Us</h2>
    <div className="contact-instructions">
      <p>If you need to contact the site admin for support, feedback, or inquiries, please follow the instructions below:</p>
      <ul>
        <li>Email us at <a href="mailto:admin.portofliowebsite@gmail.com">admin.portofliowebsite@gmail.com</a></li>
        <li>Include your name, email, and a detailed message about your request or issue.</li>
        <li>We aim to respond within 2 business days.</li>
      </ul>
      <p>Thank you for using our portfolio platform!</p>
    </div>
  </div>
);

export default Contact;
