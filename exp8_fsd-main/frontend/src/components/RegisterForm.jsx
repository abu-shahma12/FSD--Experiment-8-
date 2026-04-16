import React, { useState } from 'react';
import api from '../api';

function RegisterForm() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const response = await api.post('/api/auth/register', form);
      if (response.status === 201) {
        setMessage(response.data.message);
      }
    } catch (error) {
      setIsError(true);
      if (error.response?.status === 409) {
        setMessage(error.response.data.message);
      } else if (error.response?.status === 400) {
        setMessage('Validation failed');
      } else {
        setMessage('Registration failed');
      }
    }
  };

  return (
    <div className="card">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <br /><br />
        <button className="submit-btn" type="submit">Register</button>
      </form>
      {message && (
        <p className={isError ? 'message-error' : 'message-success'}>{message}</p>
      )}
    </div>
  );
}

export default RegisterForm;
