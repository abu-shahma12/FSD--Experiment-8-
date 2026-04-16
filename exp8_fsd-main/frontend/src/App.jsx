import React from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import PublicPostsTable from './components/PublicPostsTable';
import PublicPostsTableFetch from './components/PublicPostsTableFetch';
import RegisterForm from './components/RegisterForm';
import Login from './components/Login';
import ProductForm from './components/ProductForm';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

function AppContent() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <nav style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <Link to="/">Axios GET</Link>
        <Link to="/fetch-posts">Fetch GET</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/products">Protected Product API</Link>
        {token && <button onClick={handleLogout}>Logout</button>}
      </nav>

      <div className="container">
        <div className="card">
          <h1>Experiment 8: React + Spring Boot Integration</h1>
          <p>
            This project demonstrates public API fetching, form submission with response-code handling,
            global CORS configuration, and JWT-protected API calls.
          </p>
        </div>

        <Routes>
          <Route path="/" element={<PublicPostsTable />} />
          <Route path="/fetch-posts" element={<PublicPostsTableFetch />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;