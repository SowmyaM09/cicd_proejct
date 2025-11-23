
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const currentYear = new Date().getFullYear();
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/projects')
      .then(res => res.json())
      .then(setProjects);
    fetch('http://localhost:8080/api/blogs')
      .then(res => res.json())
      .then(setBlogs);
  }, []);


  return (
    <div className="home">
  {/* Navbar moved to App.jsx */}

      {/* Hero Section - Platform Welcome */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to <span className="highlight">Portfolioweb</span>
            </h1>
            <p className="hero-tagline">
              Create your own professional portfolio website in minutes!
            </p>
            <p className="hero-description">
              Showcase your projects, skills, and achievements with ease. No coding required — just sign up, fill out your details, and share your unique portfolio link with the world.
            </p>
            <Link to="/signup" className="cta-button">
              <span>Get Started</span>
              <div className="button-effect"></div>
            </Link>
          </div>
          <div className="hero-image">
            <div className="floating-elements">
              <div className="floating-element"></div>
              <div className="floating-element"></div>
              <div className="floating-element"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Platform Features */}
      <section id="about" className="about-section">
        <div className="about-container">
          <h2 className="about-title">Why Use Portfolioweb?</h2>
          <ul className="about-list">
            <li>🖼️ Build a beautiful, personalized portfolio website</li>
            <li>📝 Add your projects, skills, experience, and education</li>
            <li>🎨 Choose from modern, responsive templates</li>
            <li>🔗 Share your unique portfolio link with anyone</li>
            <li>👥 Connect with other creators and get inspired</li>
            <li>🚀 No coding required — just fill out simple forms</li>
            <li>🔒 Your data is secure and private</li>
            <li>📱 Mobile-friendly and fast</li>
            <li>💡 Perfect for students, professionals, and freelancers</li>
          </ul>
          <div className="about-cta">
            <Link to="/signup" className="about-btn">Start Your Portfolio</Link>
          </div>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="projects-container">
          <h2 className="section-title">Recent Projects</h2>
          <div className="projects-grid">
            {projects.length === 0 && <p>No projects available.</p>}
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  {project.image && <img src={project.image} alt={project.name} />}
                  <div className="project-overlay">
                    {project.link && <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">View Project</a>}
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <p className="project-tech"><b>Tech:</b> {project.tech}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="blogs">
        <div className="blogs-container">
          <h2 className="section-title">Latest Blogs</h2>
          <div className="blogs-grid">
            {blogs.length === 0 && <p>No blogs available.</p>}
            {blogs.map((blog) => (
              <div key={blog.id} className="blog-card">
                {blog.image && <img src={blog.image} alt={blog.title} className="blog-img" />}
                <h3>{blog.title}</h3>
                <p className="blog-content">{blog.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <p className="copyright">
              © {currentYear} John Doe. All rights reserved.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
              <a href="#" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499-.043.642-.266.642-.593v-2.187c-2.792.602-3.369-1.338-3.369-1.338-.452-1.152-1.107-1.459-1.107-1.459-.906-.618.069-.606.069-.606 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112.026 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855v2.752c0 .33.141.555.646.588C19.137 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;