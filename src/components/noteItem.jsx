import { useState } from 'react';

const NoteItem = ({ note, onDeleteNote, onUpdateNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onUpdateNote(note._id, { title, content });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="note-card edit-mode">
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="3"
          />
          <div className="card-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="note-card">
      <div className="note-header">
        <h4>{note.title}</h4>
        <div className="card-actions">
          <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
          <button onClick={() => onDeleteNote(note._id)} className="delete-btn">Delete</button>
        </div>
      </div>
      <p>{note.content}</p>
      <small>
        {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : ''}
      </small>
    </div>
  );
};

export default NoteItem;