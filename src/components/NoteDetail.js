import React, { useState } from 'react';

const NoteDetail = ({ note, onEdit, onDelete }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    onEdit({ ...note, title, content });
  };

  return (
    <div className="p-4 border rounded shadow">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-lg font-semibold mb-2 border-b focus:outline-none"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-64 border p-2 focus:outline-none"
      />
      <div className="flex justify-between mt-4">
        <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded">
          Save
        </button>
        <button onClick={() => onDelete(note.id)} className="px-4 py-2 bg-red-500 text-white rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteDetail;
