import { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './components/noteForm';
import NoteList from './components/noteList';
import './App.css';

const API_URL = 'http://localhost:5000';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setNotes(res.data.data || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch notes. Is the backend server running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = async (noteData) => {
    try {
      const res = await axios.post(API_URL, noteData);
      setNotes([res.data.data, ...notes]);
      setError('');
    } catch (err) {
      setError('Failed to add note');
    }
  };

  // Update note handler (PUT request)
  const handleUpdateNote = async (id, updatedData) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedData);
      setNotes(
        notes.map((note) => (note._id === id ? res.data.data : note))
      );
      setError('');
    } catch (err) {
      setError('Failed to update note');
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete note');
    }
  };

  return (
    <div className="container">
      <h1>Notes Manager</h1>

      {error && <div className="error-banner">{error}</div>}

      <NoteForm onAddNote={handleAddNote} />

      <h2>All Notes</h2>
      {loading ? (
        <p>Loading notes...</p>
      ) : (
        <NoteList
          notes={notes}
          onDeleteNote={handleDeleteNote}
          onUpdateNote={handleUpdateNote}
        />
      )}
    </div>
  );
}

export default App;