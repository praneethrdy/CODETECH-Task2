import React, { useState } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // Edit existing post
      const updatedPosts = [...posts];
      updatedPosts[editIndex] = { title, content };
      setPosts(updatedPosts);
      setEditIndex(null);
    } else {
      // Create new post
      setPosts([...posts, { title, content }]);
    }

    // Clear the form
    setTitle('');
    setContent('');
  };

  const handleEdit = (index) => {
    const postToEdit = posts[index];
    setTitle(postToEdit.title);
    setContent(postToEdit.content);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>BLOGGING WEBSITE</h1>
      </header>

      <div className="form-container">
        <h2>{editIndex !== null ? 'Edit Post' : 'Create a Post'}</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            className="input-field"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="textarea-field"
            placeholder="Post Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="submit-btn">
            {editIndex !== null ? 'Update Post' : 'Create Post'}
          </button>
        </form>
      </div>

      <div className="posts-container">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div className="post-card" key={index}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <div className="post-actions">
                <button onClick={() => handleEdit(index)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(index)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-posts-text">No posts yet. Start by creating one!</p>
        )}
      </div>
    </div>
  );
}

export default App;
