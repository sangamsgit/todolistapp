import React, { useState } from 'react';
import './NotesPage.css';

const App = () => {
  const [photo, setPhoto] = useState(null);
  const [heading, setHeading] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const noteData = {
      photo,
      heading,
      tags: tags.split(',').map(tag => tag.trim()),
      category,
      notes,
    };
    console.log('Note Saved:', noteData);
    // Reset form
    setPhoto(null);
    setHeading('');
    setTags('');
    setCategory('');
    setNotes('');
  };

  return (
    <div className="app-container">
      <div className="toolbar">
        <div className="toolbar-left">
          <button className="toolbar-btn">B</button>
          <button className="toolbar-btn">I</button>
          <button className="toolbar-btn">≡</button>
          <button className="toolbar-btn">≡</button>
          <button className="toolbar-btn">≡</button>
          <button className="toolbar-btn">ⓒ</button>
          <button className="toolbar-btn">🖼</button>
          <button className="toolbar-btn">…</button>
        </div>
        <div className="toolbar-right">
          <button className="toolbar-btn">✉</button>
          <button className="new-btn">+ NEW</button>
          <button className="toolbar-btn">🔍</button>
          <button className="toolbar-btn">🗑</button>
        </div>
      </div>
      <div className="note-container">
        <form onSubmit={handleSubmit}>
          <div className="photo-section">
            {photo ? (
              <img src={photo} alt="Uploaded" className="uploaded-photo" />
            ) : (
              <label className="photo-label">
                <span className="plus-icon">+</span>
                <span>ADD PHOTO</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="photo-input"
                />
              </label>
            )}
          </div>
          <input
            type="text"
            placeholder="ADD HEADING"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="ADD TAG"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="input-field"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
          >
            <option value="" disabled>CATEGORY</option>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Ideas">Ideas</option>
            <option value="Other">Other</option>
          </select>
          <textarea
            placeholder="WRITE YOUR NOTES"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="textarea-field"
          />
          <button type="submit" className="save-btn">Save Note</button>
        </form>
      </div>
    </div>
  );
};

export default App;