import NoteItem from './noteItem';

const NoteList = ({ notes, onDeleteNote, onUpdateNote }) => {
  if (!notes || notes.length === 0) {
    return <p className="empty-msg">No notes available. Add a new note above!</p>;
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteItem
          key={note._id}
          note={note}
          onDeleteNote={onDeleteNote}
          onUpdateNote={onUpdateNote}
        />
      ))}
    </div>
  );
};

export default NoteList;