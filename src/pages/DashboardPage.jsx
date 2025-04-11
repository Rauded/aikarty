import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllFlashcardSets, getFlashcardSetsFromSupabase } from '../services/flashcardService.js';
import { useClerkSupabaseClient } from '../services/supabaseClient.js';
import { useUser } from '@clerk/clerk-react';

const DashboardPage = () => {
  const supabaseClient = useClerkSupabaseClient();
  const { user } = useUser();
  const navigate = useNavigate();

  // All folders and their flashcards
  const [folders, setFolders] = useState([]);

  // Load all folders from Supabase on mount (if logged in)
  useEffect(() => {
    if (user) {
      refreshFoldersFromSupabase();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Helper to refresh folder list from Supabase
  const refreshFoldersFromSupabase = async () => {
    try {
      const sets = await getFlashcardSetsFromSupabase(supabaseClient, user.id);
      // sets is an array of { folder_name, flashcards }
      const folderNames = sets ? sets.map(set => set.folder_name) : [];
      setFolders(folderNames);
    } catch (err) {
      setFolders([]);
    }
  };

  // Handler to open a folder in the flashcard editor
  const handleOpenFolder = async (folder) => {
    // Fetch the flashcards for this folder from Supabase
    try {
      const sets = await getFlashcardSetsFromSupabase(supabaseClient, user.id);
      const found = sets.find(set => set.folder_name === folder);
      const flashcards = found ? found.flashcards : [];
      navigate('/generated-flashcards', { state: { flashcards } });
    } catch {
      navigate('/generated-flashcards', { state: { flashcards: [] } });
    }
  };

  // Handler to delete a folder (from Supabase)
  const handleDeleteFolder = async (folder) => {
    try {
      await supabaseClient
        .from('flashcard_sets')
        .delete()
        .eq('user_id', user.id)
        .eq('folder_name', folder);
      refreshFoldersFromSupabase();
    } catch {
      // Optionally handle error
    }
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