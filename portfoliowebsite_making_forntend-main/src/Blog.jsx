import React, { useState, useEffect } from 'react';
import './Blog.css';

const Blog = ({ isAuthenticated }) => {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    content: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/blogs')
      .then(res => res.json())
      .then(setBlogs);
  }, []);

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
    const res = await fetch('http://localhost:8080/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      const newBlog = await res.json();
      setBlogs([newBlog, ...blogs]);
      setForm({ title: '', content: '', image: '' });
      setImagePreview('');
      setShowForm(false);
    } else {
      alert('Failed to post blog');
    }
  };

  return (
    <div className="blog-page">
      <h2>Blog</h2>
      {isAuthenticated && (
        <button className="add-blog-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Post Blog'}
        </button>
      )}
      {showForm && (
        <form className="blog-form" onSubmit={handleSubmit}>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Blog Title" required />
          <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required />
          <input type="file" accept="image/*" onChange={handleImage} />
          {imagePreview && <img src={imagePreview} alt="Preview" className="blog-img-preview" />}
          <button type="submit">Post</button>
        </form>
      )}
      <div className="blogs-list">
        {blogs.length === 0 && <p>No blogs yet.</p>}
        {blogs.map((blog, i) => (
          <div className="blog-card" key={blog.id || i}>
            {blog.image && <img src={blog.image} alt={blog.title} className="blog-img" />}
            <h3>{blog.title}</h3>
            <p className="blog-content">{blog.content}</p>
            {isAuthenticated && (
              <button
                className="delete-blog-btn"
                onClick={async () => {
                  if (window.confirm('Delete this blog post?')) {
                    const res = await fetch(`http://localhost:8080/api/blogs/${blog.id}`, { method: 'DELETE' });
                    if (res.ok) {
                      setBlogs(blogs.filter((b) => b.id !== blog.id));
                    } else {
                      alert('Failed to delete blog');
                    }
                  }
                }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
