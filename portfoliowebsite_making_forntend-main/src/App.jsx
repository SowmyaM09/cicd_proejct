import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Signin from './Signin';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import About from './About';
import PortfolioForm from './PortfolioForm';
import Projects from './Projects';
import { useEffect, useState as useStateReact } from 'react';
import Blog from './Blog';
import Contact from './Contact';
// Public portfolio page
const PublicPortfolio = () => {
  const [portfolio, setPortfolio] = useStateReact(null);
  const url = window.location.pathname.split('/').pop();
  useEffect(() => {
    fetch(`http://localhost:8080/api/portfolio/${url}`)
      .then(res => res.json())
      .then(setPortfolio);
  }, [url]);
  if (!portfolio) return <div>Loading...</div>;

  // Parse JSON fields
  const education = portfolio.education ? JSON.parse(portfolio.education) : [];
  const experience = portfolio.experience ? JSON.parse(portfolio.experience) : [];
  const projects = portfolio.projects ? JSON.parse(portfolio.projects) : [];
  const achievements = portfolio.achievements ? JSON.parse(portfolio.achievements) : [];

  return (
    <div className="public-portfolio">
      {portfolio.profilePic && <img src={portfolio.profilePic} alt="Profile" className="public-profile-pic" />}
      <h1>{portfolio.fullName}</h1>
      <h2 className="public-title">{portfolio.title}</h2>
      <p className="public-summary">{portfolio.summary}</p>

      <div className="public-section">
        <h3>Contact</h3>
        <p><b>Email:</b> {portfolio.email}</p>
        {portfolio.phone && <p><b>Phone:</b> {portfolio.phone}</p>}
        {portfolio.location && <p><b>Location:</b> {portfolio.location}</p>}
        <div className="public-links">
          {portfolio.linkedin && <a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          {portfolio.github && <a href={portfolio.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
          {portfolio.website && <a href={portfolio.website} target="_blank" rel="noopener noreferrer">Website</a>}
          {portfolio.twitter && <a href={portfolio.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>}
        </div>
      </div>

      <div className="public-section">
        <h3>Skills</h3>
        <p><b>Technical:</b> {portfolio.skills}</p>
        <p><b>Tools:</b> {portfolio.tools}</p>
        <p><b>Soft Skills:</b> {portfolio.softSkills}</p>
      </div>

      <div className="public-section">
        <h3>Education</h3>
        {education.map((edu, i) => (
          <div key={i} className="public-entry">
            <b>{edu.degree}</b> at {edu.institution} ({edu.year})<br />
            <span>{edu.description}</span>
          </div>
        ))}
      </div>

      <div className="public-section">
        <h3>Experience</h3>
        {experience.map((exp, i) => (
          <div key={i} className="public-entry">
            <b>{exp.title}</b> at {exp.company} ({exp.duration})<br />
            <span>{exp.description}</span>
          </div>
        ))}
      </div>

      <div className="public-section">
        <h3>Projects</h3>
        {projects.map((proj, i) => (
          <div key={i} className="public-entry">
            <b>{proj.name}</b>: {proj.description}<br />
            <span><b>Tech:</b> {proj.tech}</span><br />
            {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer">Project Link</a>}
          </div>
        ))}
      </div>

      <div className="public-section">
        <h3>Achievements</h3>
        {achievements.map((ach, i) => (
          <div key={i} className="public-entry">
            <b>{ach.name}</b> ({ach.year})<br />
            <span>{ach.issuer}</span><br />
            <span>{ach.description}</span>
          </div>
        ))}
      </div>

      <div className="public-section">
        <h3>Hobbies & Languages</h3>
        <p><b>Hobbies:</b> {portfolio.hobbies}</p>
        <p><b>Languages:</b> {portfolio.languages}</p>
      </div>
    </div>
  );
};
import Navbar from './Navbar';
import './App.css';
import './public-portfolio.css';


function App() {
  // Persist auth state in localStorage
  const [isAuthenticated, setIsAuthenticated] = useStateReact(() => localStorage.getItem('isAuthenticated') === 'true');
  const [portfolioUrl, setPortfolioUrl] = useStateReact("");
  const [portfolioEmail, setPortfolioEmail] = useStateReact(() => localStorage.getItem('portfolioEmail') || "");
  const [portfolioData, setPortfolioData] = useStateReact(null);
  const [showEdit, setShowEdit] = useStateReact(false);
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPortfolioUrl("");
    setPortfolioEmail("");
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('portfolioEmail');
    navigate("/");
  };

  // After signin, fetch portfolio by email
  const fetchPortfolioByEmail = async (email) => {
    setPortfolioEmail(email);
    localStorage.setItem('portfolioEmail', email);
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
    const res = await fetch(`http://localhost:8080/api/portfolio/email/${email}`);
    if (res.ok) {
      const data = await res.json();
      setPortfolioData(data);
      setShowEdit(true);
    } else {
      setPortfolioData(null);
      setShowEdit(false);
    }
  };

  // On mount, if authenticated, refetch portfolio
  useEffect(() => {
    if (isAuthenticated && portfolioEmail) {
      fetchPortfolioByEmail(portfolioEmail);
    }
    // eslint-disable-next-line
  }, []);

  // Custom Signin wrapper to set auth state and fetch portfolio
  const SigninWrapper = () => {
    const navigate = useNavigate();
    return <Signin onSuccess={(email) => { setIsAuthenticated(true); fetchPortfolioByEmail(email); navigate('/portfolio'); }} />;
  };

  // Portfolio form submit handler (create or update)
  const handlePortfolioSubmit = async (data) => {
    const res = await fetch('http://localhost:8080/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      const { url } = await res.json();
      setPortfolioUrl(url);
      setShowEdit(true);
      alert('Portfolio saved! Your public URL: ' + url);
      fetchPortfolioByEmail(data.email);
    } else {
      alert('Failed to save portfolio');
    }
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SigninWrapper />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/portfolio" element={
          isAuthenticated ? (
            showEdit && portfolioData ? (
              <div style={{textAlign:'center',marginTop:40}}>
                <h2>Your Portfolio Already Exists</h2>
                {/* Clicking Edit Portfolio shows the form with previous data for editing */}
                <button onClick={() => setShowEdit(false)} style={{margin:'20px 0',padding:'10px 24px',fontSize:'1.1rem'}}>Edit Portfolio</button>
                <a href={portfolioData.url ? `/portfolio/${portfolioData.url}` : '#'} target="_blank" rel="noopener noreferrer" style={{display:'block',marginTop:10}}>View Public Portfolio</a>
                {/* Delete Portfolio button for authenticated user */}
                <DeletePortfolioButton url={portfolioData.url} onDeleted={() => { setShowEdit(false); setPortfolioData(null); setPortfolioUrl(""); setPortfolioEmail(""); setIsAuthenticated(false); localStorage.removeItem('isAuthenticated'); localStorage.removeItem('portfolioEmail'); navigate('/'); }} />
              </div>
            ) : (
              <PortfolioForm onSubmit={handlePortfolioSubmit} initialData={portfolioData} />
            )
          ) : <Navigate to="/signin" />
        } />

  <Route path="/portfolio/:url" element={<PublicPortfolio />} />
  <Route path="/projects" element={<Projects isAuthenticated={isAuthenticated} />} />
  <Route path="/blog" element={<Blog isAuthenticated={isAuthenticated} />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;

// DeletePortfolioButton component
function DeletePortfolioButton({ url, onDeleted }) {
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your portfolio? This cannot be undone.')) return;
    if (!window.confirm('This is your last chance! Delete portfolio?')) return;
    const res = await fetch(`http://localhost:8080/api/portfolio/${url}`, { method: 'DELETE' });
    if (res.ok) {
      alert('Portfolio deleted.');
      if (onDeleted) onDeleted();
    } else {
      alert('Failed to delete portfolio.');
    }
  };
  return (
    <button style={{background:'#e74c3c',color:'#fff',border:'none',padding:'10px 24px',borderRadius:8,marginTop:18,cursor:'pointer',fontWeight:600}} onClick={handleDelete}>Delete Portfolio</button>
  );
}
