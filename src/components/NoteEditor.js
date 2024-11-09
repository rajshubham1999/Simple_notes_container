import React, { useState, useEffect, useRef } from 'react';

const NoteEditor = ({ note, onSave, onClose }) => {
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  const titleRef = useRef(null); 

  
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }

   
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [note]); 

  const handleSave = () => {
    const updatedNote = {
      id: note ? note.id : null,
      title,
      content,
    };
    onSave(updatedNote);
  };

  return (
    <div className="p-4 border rounded bg-white shadow-md">
      <input
        ref={titleRef}
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-2 border-b border-gray-300 focus:outline-none"
      />
      <textarea
        placeholder="Note Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-64 p-2 border border-gray-300 focus:outline-none"
      />
      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="mr-2 p-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default NoteEditor;
