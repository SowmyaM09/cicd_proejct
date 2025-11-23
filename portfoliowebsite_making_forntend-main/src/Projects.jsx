import React, { useState, useEffect } from 'react';
import './Projects.css';

const Projects = ({ isAuthenticated }) => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    tech: '',
    link: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState('');

  // Fetch projects from backend on mount
  useEffect(() => {
    fetch('http://localhost:8080/api/projects')
      .then(res => res.json())
      .then(setProjects);
  }, []);

  // Handle image upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      const newProject = await res.json();
      setProjects([newProject, ...projects]);
      setForm({ name: '', description: '', tech: '', link: '', image: '' });
      setImagePreview('');
      setShowForm(false);
    } else {
      alert('Failed to save project');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    const res = await fetch(`http://localhost:8080/api/projects/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setProjects(projects.filter((proj) => proj.id !== id));
    } else {
      alert('Failed to delete project');
    }
  };

  return (
    <div className="projects-page">
      <h2>Projects</h2>
      {isAuthenticated && (
        <button className="add-project-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Project'}
        </button>
      )}
      {showForm && (
        <form className="project-form" onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Project Name" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
          <input name="tech" value={form.tech} onChange={handleChange} placeholder="Tech Stack" required />
          <input name="link" value={form.link} onChange={handleChange} placeholder="Project Link (optional)" />
          <input type="file" accept="image/*" onChange={handleImage} />
          {imagePreview && <img src={imagePreview} alt="Preview" className="project-img-preview" />}
          <button type="submit">Save Project</button>
        </form>
      )}
      <div className="projects-list">
        {projects.length === 0 && <p>No projects added yet.</p>}
        {projects.map((proj) => (
          <div className="project-card" key={proj.id}>
            {proj.image && <img src={proj.image} alt={proj.name} className="project-img" />}
            <h3>{proj.name}</h3>
            <p className="project-desc">{proj.description}</p>
            <p><b>Tech:</b> {proj.tech}</p>
            {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer">View Project</a>}
            {isAuthenticated && (
              <button className="delete-project-btn" onClick={() => handleDelete(proj.id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
