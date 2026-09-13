import { useState, useEffect } from 'react';
import axios from 'axios';
import Auth from './components/Auth';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });
  
  // State for Editing
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', description: '' });

  const authConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  // Fetch Notes
  const fetchNotes = async () => {
    if (!token) return;
    try {
      const res = await axios.get('http://localhost:5000/notes', authConfig);
      // Response structure handle
      const notesArray = res.data.data || res.data || [];
      setNotes(Array.isArray(notesArray) ? notesArray : []);
    } catch (err) {
      if (err.response?.status === 401) handleLogout();
    }
  };

  useEffect(() => {
    if (token) fetchNotes();
  }, [token]);

  // Add Note
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/notes', formData, authConfig);
      setFormData({ title: '', description: '' });
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Note
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`, authConfig);
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  // Start Editing Mode
  const startEdit = (note) => {
    setEditingId(note._id);
    setEditData({ title: note.title, description: note.description });
  };

  // Save Updated Note
  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/notes/${id}`, editData, authConfig);
      setEditingId(null);
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setNotes([]);
  };

  if (!token) {
    return <Auth setToken={setToken} />;
  }

  return (
    <div className="container">
      <header className="app-header">
        <h1>My Notes</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      {/* Add Note Form */}
      <form className="note-form" onSubmit={handleCreate}>
        <h3>Add New Note</h3>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <button type="submit">Add Note</button>
      </form>

      {/* Display Notes Grid */}
      <h2>Your Saved Notes</h2>
      {notes.length === 0 ? (
        <p className="empty-msg">No notes found. Create your first note above!</p>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note._id} className={`note-card ${editingId === note._id ? 'edit-mode' : ''}`}>
              {editingId === note._id ? (
                // EDIT MODE
                <>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  />
                  <textarea
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  />
                  <div className="card-actions">
                    <button onClick={() => handleUpdate(note._id)} className="save-btn">Save</button>
                    <button onClick={() => setEditingId(null)} className="cancel-btn">Cancel</button>
                  </div>
                </>
              ) : (
                // VIEW MODE
                <>
                  <div className="note-header">
                    <h4>{note.title}</h4>
                  </div>
                  <p>{note.description}</p>
                  <div className="card-actions">
                    <button onClick={() => startEdit(note)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDelete(note._id)} className="delete-btn">Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;