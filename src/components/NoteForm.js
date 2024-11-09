import React, { useState } from 'react';

const NoteForm = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (title && content) {
      onSave({ id: Date.now(), title, content });
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-lg font-semibold mb-2 border-b focus:outline-none"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-64 border p-2 focus:outline-none"
      />
      <div className="flex justify-between mt-4">
        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
          Add
        </button>
        <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NoteForm;
