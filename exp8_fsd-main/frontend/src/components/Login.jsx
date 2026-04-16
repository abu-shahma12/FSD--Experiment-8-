import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const response = await api.post('/api/auth/login', form);
      localStorage.setItem('token', response.data.token);
      setMessage('Login successful');
      navigate('/products');
    } catch (error) {
      setIsError(true);
      if (error.response?.status === 401) {
        setMessage('Invalid username or password');
      } else {
        setMessage('Login failed');
      }
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
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
        <button className="submit-btn" type="submit">Login</button>
      </form>
      {message && (
        <p className={isError ? 'message-error' : 'message-success'}>{message}</p>
      )}
    </div>
  );
}

export default Login;
