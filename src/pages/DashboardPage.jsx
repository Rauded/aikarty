import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllFlashcardSets } from '../services/flashcardService.js';

const DashboardPage = () => {
  const navigate = useNavigate();

  // All folders and their flashcards
  const [folders, setFolders] = useState([]);

  // Load all folders from localStorage on mount
  useEffect(() => {
    refreshFolders();
  }, []);

  // Helper to refresh folder list from localStorage
  const refreshFolders = () => {
    const sets = getAllFlashcardSets();
    const folderNames = Object.keys(sets);
    setFolders(folderNames);
  };

  // Handler to open a folder in the flashcard editor
  const handleOpenFolder = (folder) => {
    const sets = getAllFlashcardSets();
    const flashcards = sets[folder] || [];
    navigate('/generated-flashcards', { state: { flashcards } });
  };

  // Handler to delete a folder
  const handleDeleteFolder = (folder) => {
    const sets = getAllFlashcardSets();
    delete sets[folder];
    localStorage.setItem('flashcardSets', JSON.stringify(sets));
    refreshFolders();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Your Flashcards Dashboard</h1>

      {(
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Folders</h2>
          <div className="flex flex-col gap-2">
            {folders.length === 0 && <span className="text-gray-500">No folders yet. Generate and save flashcards!</span>}
            {folders.map((folder, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-gray-100 rounded px-3 py-2">
                <span className="flex-1 font-medium truncate">{folder}</span>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                  onClick={() => alert('View not implemented yet')}
                >
                  View
                </button>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600"
                  onClick={() => {
                    const sets = getAllFlashcardSets();
                    const flashcards = sets[folder] || [];
                    navigate('/flashcards-editor', { state: { flashcards } });
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                  onClick={() => handleDeleteFolder(folder)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No flashcards/cards shown here */}
    </div>
  );
};

export default DashboardPage;