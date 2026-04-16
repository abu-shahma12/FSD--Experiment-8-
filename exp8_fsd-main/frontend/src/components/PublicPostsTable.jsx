import React, { useEffect, useState } from 'react';
import api from '../api';

function PublicPostsTable() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/api/public/posts')
      .then((response) => setPosts(response.data.slice(0, 10)))
      .catch(() => setError('Failed to load posts from backend'));
  }, []);

  return (
    <div className="card">
      <h2>Public Posts using Axios</h2>
      <p>React calls the Spring Boot backend, which fetches posts from a public API and returns them to the UI.</p>
      {error && <p className="message-error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.userId}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PublicPostsTable;
