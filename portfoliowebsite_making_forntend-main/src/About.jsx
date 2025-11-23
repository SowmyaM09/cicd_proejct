import React from 'react';
import './About.css';

const About = () => (
  <section id="about" className="about-section">
    <div className="about-container">
      <h2 className="about-title">About This Platform</h2>
      <p className="about-description">
        Welcome to <b>Portfolioweb</b> — the easiest way to create, customize, and share your professional portfolio online!<br /><br />
        <b>What can you do here?</b>
        <ul className="about-list">
          <li>🖼️ Build a beautiful, personalized portfolio website in minutes</li>
          <li>📝 Add your projects, skills, experience, and education</li>
          <li>🎨 Choose from modern, responsive templates</li>
          <li>🔗 Share your unique portfolio link with anyone</li>
          <li>👥 Connect with other creators and get inspired</li>
        </ul>
        <br />
        <b>Why use Portfolioweb?</b>
        <ul className="about-list">
          <li>🚀 No coding required — just fill out simple forms</li>
          <li>🔒 Your data is secure and private</li>
          <li>📱 Mobile-friendly and fast</li>
          <li>💡 Perfect for students, professionals, and freelancers</li>
        </ul>
      </p>
      <div className="about-cta">
        <a href="#signup" className="about-btn">Get Started</a>
      </div>
    </div>
  </section>
);

export default About;
