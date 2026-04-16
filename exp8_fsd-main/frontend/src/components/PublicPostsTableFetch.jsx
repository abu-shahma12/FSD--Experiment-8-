import React, { useEffect, useState } from 'react';

function PublicPostsTableFetch() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/public/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setPosts(data.slice(0, 10)))
      .catch((err) => setError(`Fetch failed: ${err.message}`));
  }, []);

  return (
    <div className="card">
      <h2>Public Posts using Fetch</h2>
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

export default PublicPostsTableFetch;
