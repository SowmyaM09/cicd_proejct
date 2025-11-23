
import React, { useState } from 'react';
import './PortfolioForm.css';

const emptyEdu = { degree: '', institution: '', year: '', description: '' };
const emptyExp = { title: '', company: '', duration: '', description: '' };
const emptyProj = { name: '', description: '', tech: '', link: '' };
const emptyAch = { name: '', issuer: '', year: '', description: '' };

const PortfolioForm = ({ onSubmit, initialData }) => {
  // Helper to parse JSON fields if present
  const parseArray = (val, fallback) => {
    if (!val) return [ { ...fallback } ];
    try {
      const arr = typeof val === 'string' ? JSON.parse(val) : val;
      return Array.isArray(arr) && arr.length > 0 ? arr : [ { ...fallback } ];
    } catch {
      return [ { ...fallback } ];
    }
  };
  const [form, setForm] = useState(() => {
    if (!initialData) return {
      fullName: '', title: '', email: '', phone: '', location: '', profilePic: '', summary: '',
      linkedin: '', github: '', website: '', twitter: '', skills: '', tools: '', softSkills: '',
      education: [ { ...emptyEdu } ], experience: [ { ...emptyExp } ], projects: [ { ...emptyProj } ], achievements: [ { ...emptyAch } ],
      hobbies: '', languages: ''
    };
    return {
      ...initialData,
      education: parseArray(initialData.education, emptyEdu),
      experience: parseArray(initialData.experience, emptyExp),
      projects: parseArray(initialData.projects, emptyProj),
      achievements: parseArray(initialData.achievements, emptyAch)
    };
  });
  const [isLoading, setIsLoading] = useState(false);

  // If initialData changes (e.g. after fetch), update form
  React.useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        education: parseArray(initialData.education, emptyEdu),
        experience: parseArray(initialData.experience, emptyExp),
        projects: parseArray(initialData.projects, emptyProj),
        achievements: parseArray(initialData.achievements, emptyAch)
      });
    }
  }, [initialData]);

  // Handle simple field change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, profilePic: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Handle array field change
  const handleArrayChange = (section, idx, e) => {
    const arr = form[section].map((item, i) =>
      i === idx ? { ...item, [e.target.name]: e.target.value } : item
    );
    setForm({ ...form, [section]: arr });
  };

  // Add new entry to array section
  const addArrayEntry = (section, emptyObj) => {
    setForm({ ...form, [section]: [ ...form[section], { ...emptyObj } ] });
  };

  // Remove entry from array section
  const removeArrayEntry = (section, idx) => {
    setForm({ ...form, [section]: form[section].filter((_, i) => i !== idx) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Convert array fields to JSON strings for backend
    const payload = {
      ...form,
      education: JSON.stringify(form.education),
      experience: JSON.stringify(form.experience),
      projects: JSON.stringify(form.projects),
      achievements: JSON.stringify(form.achievements)
    };
    await onSubmit(payload);
    setIsLoading(false);
  };

  return (
    <div className="portfolio-form-container">
      <h2>Complete Your Portfolio</h2>
      <form onSubmit={handleSubmit} className="portfolio-form">
        <fieldset className="section">
          <legend>Personal Details</legend>
          <div className="form-group"><label>Full Name</label><input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="e.g. John Doe" /></div>
          <div className="form-group"><label>Professional Title</label><input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Frontend Developer" /></div>
          <div className="form-group"><label>Email</label><input name="email" value={form.email} onChange={handleChange} required placeholder="e.g. john@email.com" /></div>
          <div className="form-group"><label>Phone Number</label><input name="phone" value={form.phone} onChange={handleChange} placeholder="e.g. +91 9876543210" /></div>
          <div className="form-group"><label>Location</label><input name="location" value={form.location} onChange={handleChange} required placeholder="e.g. Hyderabad, India" /></div>
          <div className="form-group"><label>Profile Picture</label><input type="file" accept="image/*" onChange={handleImage} /></div>
          {form.profilePic && <img src={form.profilePic} alt="Profile Preview" style={{maxWidth:100,marginBottom:10}} />}
          <div className="form-group"><label>Short Bio / Summary</label><textarea name="summary" value={form.summary} onChange={handleChange} required placeholder="1–3 sentences about yourself" /></div>
        </fieldset>

        <fieldset className="section">
          <legend>Social / Portfolio Links</legend>
          <div className="form-group"><label>LinkedIn</label><input name="linkedin" value={form.linkedin} onChange={handleChange} required placeholder="e.g. https://linkedin.com/in/username" /></div>
          <div className="form-group"><label>GitHub</label><input name="github" value={form.github} onChange={handleChange} required placeholder="e.g. https://github.com/username" /></div>
          <div className="form-group"><label>Personal Website / Blog</label><input name="website" value={form.website} onChange={handleChange} placeholder="e.g. https://myblog.com" /></div>
          <div className="form-group"><label>Twitter / Instagram / Medium</label><input name="twitter" value={form.twitter} onChange={handleChange} placeholder="e.g. https://twitter.com/username" /></div>
        </fieldset>

        <fieldset className="section">
          <legend>Skills</legend>
          <div className="form-group"><label>Technical Skills</label><input name="skills" value={form.skills} onChange={handleChange} placeholder="e.g. React, Java, SQL, Python" required /></div>
          <div className="form-group"><label>Tools & Technologies</label><input name="tools" value={form.tools} onChange={handleChange} placeholder="e.g. VSCode, Git, Docker" required /></div>
          <div className="form-group"><label>Soft Skills</label><input name="softSkills" value={form.softSkills} onChange={handleChange} placeholder="e.g. Problem-solving, Communication" required /></div>
        </fieldset>

        <fieldset className="section">
          <legend>Education</legend>
          {form.education.map((edu, i) => (
            <div className="multi-entry" key={i}>
              <input name="degree" value={edu.degree} onChange={e => handleArrayChange('education', i, e)} placeholder="Degree / Certification (e.g. B.Tech, MSc)" required />
              <input name="institution" value={edu.institution} onChange={e => handleArrayChange('education', i, e)} placeholder="Institution (e.g. IIT Bombay)" required />
              <input name="year" value={edu.year} onChange={e => handleArrayChange('education', i, e)} placeholder="Year of Completion (e.g. 2024)" required />
              <input name="description" value={edu.description} onChange={e => handleArrayChange('education', i, e)} placeholder="Description (optional) e.g. CGPA, achievements" />
              {form.education.length > 1 && <button type="button" onClick={() => removeArrayEntry('education', i)}>-</button>}
            </div>
          ))}
          <button type="button" onClick={() => addArrayEntry('education', emptyEdu)}>+ Add Education</button>
        </fieldset>

        <fieldset className="section">
          <legend>Work Experience / Internships</legend>
          {form.experience.map((exp, i) => (
            <div className="multi-entry" key={i}>
              <input name="title" value={exp.title} onChange={e => handleArrayChange('experience', i, e)} placeholder="Job Title (e.g. Intern, SDE)" required />
              <input name="company" value={exp.company} onChange={e => handleArrayChange('experience', i, e)} placeholder="Company Name" required />
              <input name="duration" value={exp.duration} onChange={e => handleArrayChange('experience', i, e)} placeholder="Duration (e.g. Jan 2023 - May 2023)" required />
              <input name="description" value={exp.description} onChange={e => handleArrayChange('experience', i, e)} placeholder="Description (e.g. role, responsibilities)" />
              {form.experience.length > 1 && <button type="button" onClick={() => removeArrayEntry('experience', i)}>-</button>}
            </div>
          ))}
          <button type="button" onClick={() => addArrayEntry('experience', emptyExp)}>+ Add Experience</button>
        </fieldset>

        <fieldset className="section">
          <legend>Projects</legend>
          {form.projects.map((proj, i) => (
            <div className="multi-entry" key={i}>
              <input name="name" value={proj.name} onChange={e => handleArrayChange('projects', i, e)} placeholder="Project Name" required />
              <input name="description" value={proj.description} onChange={e => handleArrayChange('projects', i, e)} placeholder="Short Description" required />
              <input name="tech" value={proj.tech} onChange={e => handleArrayChange('projects', i, e)} placeholder="Technology Stack (e.g. React, Node.js)" required />
              <input name="link" value={proj.link} onChange={e => handleArrayChange('projects', i, e)} placeholder="GitHub / Live Link (optional)" />
              {form.projects.length > 1 && <button type="button" onClick={() => removeArrayEntry('projects', i)}>-</button>}
            </div>
          ))}
          <button type="button" onClick={() => addArrayEntry('projects', emptyProj)}>+ Add Project</button>
        </fieldset>

        <fieldset className="section">
          <legend>Achievements / Certifications</legend>
          {form.achievements.map((ach, i) => (
            <div className="multi-entry" key={i}>
              <input name="name" value={ach.name} onChange={e => handleArrayChange('achievements', i, e)} placeholder="Achievement Name" required />
              <input name="issuer" value={ach.issuer} onChange={e => handleArrayChange('achievements', i, e)} placeholder="Issuer / Organization" required />
              <input name="year" value={ach.year} onChange={e => handleArrayChange('achievements', i, e)} placeholder="Year (e.g. 2024)" required />
              <input name="description" value={ach.description} onChange={e => handleArrayChange('achievements', i, e)} placeholder="Short Description (optional)" />
              {form.achievements.length > 1 && <button type="button" onClick={() => removeArrayEntry('achievements', i)}>-</button>}
            </div>
          ))}
          <button type="button" onClick={() => addArrayEntry('achievements', emptyAch)}>+ Add Achievement</button>
        </fieldset>

        <fieldset className="section">
          <legend>Optional Sections</legend>
          <div className="form-group"><label>Hobbies / Interests</label><input name="hobbies" value={form.hobbies} onChange={handleChange} placeholder="e.g. Reading, Football, Music" /></div>
          <div className="form-group"><label>Languages Known</label><input name="languages" value={form.languages} onChange={handleChange} placeholder="e.g. English, Hindi, Telugu" /></div>
        </fieldset>

        <button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Portfolio'}</button>
      </form>
    </div>
  );
};

export default PortfolioForm;
