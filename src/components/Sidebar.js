import React, { useState } from 'react';

const Sidebar = ({ notes, onAddNote, onSelectNote, onDeleteNote }) => {
  const [searchQuery, setSearchQuery] = useState('');

  
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-1/4 p-4 bg-gray-200">
      <button
        onClick={onAddNote}
        className="mb-4 p-2 w-full bg-blue-500 text-white rounded"
      >
        + New Note
      </button>

      
      <input
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 w-full border border-gray-300 rounded"
      />

      <ul>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <li
              key={note.id}
              className="p-2 cursor-pointer hover:bg-gray-300 relative"
              onClick={() => onSelectNote(note)} 
            >
             
              <h3 className="font-semibold text-center truncate">{note.title}</h3>
              <p className="text-sm text-gray-500 text-center truncate">{note.content}</p>
              
             
              <button
                className="absolute top-0 right-0 p-1 text-red-500"
                onClick={(e) => {
                  e.stopPropagation(); 
                  onDeleteNote(note.id);  
                }}
              >
                &times;
              </button>
            </li>
          ))
        ) : (
          <li className="p-2 text-center text-gray-500">No notes found</li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
