import { useState, useEffect } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]); // State for storing posts
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts'); 
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data); // Save posts data
      } catch (err) {
        setError('Unable to fetch posts. Please try again later.'); // Friendly error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPosts(); // Trigger the fetch
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
