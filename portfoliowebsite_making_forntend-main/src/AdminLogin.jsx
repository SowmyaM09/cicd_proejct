import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    adminEmail: '',
    adminPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (loginError) {
      setLoginError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.adminEmail.trim()) {
      newErrors.adminEmail = 'Admin email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.adminEmail)) {
      newErrors.adminEmail = 'Please enter a valid email address';
    }

    if (!formData.adminPassword) {
      newErrors.adminPassword = 'Admin password is required';
    } else if (formData.adminPassword.length < 6) {
      newErrors.adminPassword = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setLoginError('');
    try {
      const res = await fetch('http://localhost:8080/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.adminEmail,
          password: formData.adminPassword
        })
      });
      if (res.ok) {
        setAttempts(0);
        setIsLoading(false);
        navigate('/admin-dashboard');
      } else {
        const msg = await res.text();
        setLoginError(msg || 'Invalid admin credentials. Please check your email and password.');
        setAttempts(prev => prev + 1);
        setIsLoading(false);
      }
    } catch (err) {
      setLoginError('Server error. Please try again later.');
      setIsLoading(false);
    }
// ...existing code...
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-header">
          <div className="admin-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L13.5 7H7V9H13.5L15 12L21 9ZM16 12H22V10H16V12ZM16 15H19V13H16V15ZM16 18H21V16H16V18Z"/>
            </svg>
          </div>
          <h2>Admin Portal</h2>
          <p>Secure administrative access</p>
        </div>

        {loginError && (
          <div className={`error-alert ${attempts > 2 ? 'danger' : ''}`}>
            <div className="error-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"/>
              </svg>
            </div>
            <div className="error-content">
              <strong>Access Denied</strong>
              <p>{loginError}</p>
              {attempts > 2 && (
                <p className="warning-text">Multiple failed attempts detected. Account may be locked.</p>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label htmlFor="adminEmail">Admin Email</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="adminEmail"
                name="adminEmail"
                value={formData.adminEmail}
                onChange={handleChange}
                className={errors.adminEmail ? 'error' : ''}
                placeholder="Enter admin email"
                autoComplete="username"
              />
              <div className="input-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12C14.21 12 16 10.21 16 8S14.21 4 12 4 8 5.79 8 8 9.79 12 12 12M12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
                </svg>
              </div>
            </div>
            {errors.adminEmail && <span className="error-message">{errors.adminEmail}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="adminPassword">Admin Password</label>
            <div className="input-wrapper">
              <input
                type="password"
                id="adminPassword"
                name="adminPassword"
                value={formData.adminPassword}
                onChange={handleChange}
                className={errors.adminPassword ? 'error' : ''}
                placeholder="Enter admin password"
                autoComplete="current-password"
              />
              <div className="input-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
                </svg>
              </div>
            </div>
            {errors.adminPassword && <span className="error-message">{errors.adminPassword}</span>}
          </div>

          <div className="security-notice">
            <div className="security-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.2C16,16.8 15.4,17.3 14.8,17.3H9.2C8.6,17.3 8,16.8 8,16.2V12.8C8,12.2 8.6,11.7 9.2,11.7V10.2C9.2,8.7 10.6,7.2 12,7.2M12,8.2C11.2,8.2 10.2,9.2 10.2,10.2V11.7H13.8V10.2C13.8,9.2 12.8,8.2 12,8.2Z"/>
              </svg>
            </div>
            <p>This is a secure admin area. All login attempts are monitored and logged.</p>
          </div>

          <button 
            type="submit" 
            className={`admin-button ${isLoading ? 'loading' : ''} ${attempts > 2 ? 'locked' : ''}`} 
            disabled={isLoading || attempts > 3}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                <span className="loading-text">Authenticating...</span>
              </>
            ) : attempts > 3 ? (
              <>
                <span className="lock-icon">🔒</span>
                Account Locked
              </>
            ) : (
              <>
                <span className="button-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                  </svg>
                </span>
                Login as Admin
              </>
            )}
          </button>
        </form>

        <div className="admin-footer">
          <p className="help-text">
            Need help? Contact system administrator
          </p>
          <div className="attempts-counter">
            <span>Login attempts: {attempts}/3</span>
          </div>
        </div>
      </div>

      {/* Advanced Background Animation */}
      <div className="background-animation">
        <div className="matrix-rain">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="matrix-column" style={{left: `${i * 5}%`, animationDelay: `${i * 0.1}s`}}>
              {[...Array(10)].map((_, j) => (
                <div key={j} className="matrix-char">
                  {Math.random() > 0.5 ? '1' : '0'}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="geometric-shapes">
          <div className="shape hexagon"></div>
          <div className="shape triangle"></div>
          <div className="shape square"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;