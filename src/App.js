import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import NoteEditor from './components/NoteEditor';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);


  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

 
  const addNewNote = () => {
    setIsCreating(true);
    setSelectedNote(null);
  };


  const saveNote = (note) => {
    if (note.id) {
      setNotes(notes.map((n) => (n.id === note.id ? note : n)));
    } else {
      const newNote = { ...note, id: Date.now() };
      setNotes([newNote, ...notes]);
    }
    setIsCreating(false);
    setSelectedNote(note);
  };


  const handleSelectNote = (note) => {
    setIsCreating(false);
    setSelectedNote(note);
  };


  const closeNoteEditor = () => {
    setIsCreating(false);
    setSelectedNote(null);
  };


  const handleDeleteNote = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId));
    localStorage.setItem('notes', JSON.stringify(notes.filter(note => note.id !== noteId)));
    setDeleteConfirmation(null);
  };


  const handleDeleteConfirmation = (noteId) => {
    setDeleteConfirmation(noteId);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        notes={notes}
        onAddNote={addNewNote}
        onSelectNote={handleSelectNote}
        onDeleteNote={handleDeleteConfirmation}
      />
      <div className="flex-grow p-4">
  
        <h1 className="text-2xl font-bold mb-4 text-center">Notes</h1>
        
        {(isCreating || selectedNote) ? (
          <NoteEditor
            note={selectedNote}
            onSave={saveNote}
            onClose={closeNoteEditor}
          />
        ) : (
          <div className="text-gray-500 text-center mt-20">
            Select or create a note to get started.
          </div>
        )}
      </div>

      {deleteConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <p className="text-lg">Are you sure you want to delete this note?</p>
            <div className="mt-4 flex justify-between">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => handleDeleteNote(deleteConfirmation)}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setDeleteConfirmation(null)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
