/**
 * This file defines a React component called DashboardPage.
 * A "dashboard" is a page where users can see and manage their own data—in this case, folders of flashcards.
 * This DashboardPage lets users view, edit, and delete their flashcard folders.
 *
 * Usage: This component is usually shown when the user navigates to the "/dashboard" route.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllFlashcardSets, getFlashcardSetsFromSupabase } from '../services/flashcardService.js';
import { useClerkSupabaseClient } from '../services/supabaseClient.js';
import { useUser } from '@clerk/clerk-react';

/**
 * The DashboardPage component doesn't take any props.
 * It uses state and effects to load and manage the user's flashcard folders.
 */
const DashboardPage = () => {
  // Get the Supabase client for database operations.
  const supabaseClient = useClerkSupabaseClient();
  // Get the current user (from Clerk authentication).
  const { user } = useUser();
  // useNavigate lets us change pages in the app.
  const navigate = useNavigate();

  // State variables
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [folderToDelete, setFolderToDelete] = useState(null);

  // useEffect runs code when the component loads or when the user changes.
  // Here, we load the folders from the database when the user is available.
  useEffect(() => {
    if (user) {
      refreshFoldersFromSupabase();
    }
    // The comment below disables a warning about missing dependencies.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /**
   * This function loads the list of folders from the Supabase database.
   * It updates the folders state with the folder names.
   */
  const refreshFoldersFromSupabase = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const sets = await getFlashcardSetsFromSupabase(supabaseClient, user.id);
      // sets is an array of { folder_name, flashcards }
      const folderNames = sets ? sets.map(set => set.folder_name) : [];
      setFolders(folderNames);
    } catch (err) {
      setError("Failed to load your flashcard folders. Please try again.");
      setFolders([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * This function is called when the user wants to open a folder.
   * It loads the flashcards for that folder and navigates to the flashcard editor page.
   */
  const handleOpenFolder = async (folder) => {
    // Show loading state for this specific action if needed
    try {
      const sets = await getFlashcardSetsFromSupabase(supabaseClient, user.id);
      const found = sets.find(set => set.folder_name === folder);
      const flashcards = found ? found.flashcards : [];
      navigate('/study', { state: { flashcards, folderName: folder } });
    } catch (err) {
      // Display an inline error instead of silently navigating with empty data
      alert(`Error loading flashcards from "${folder}". Please try again.`);
    }
  };

  /**
   * This function is called when the user wants to delete a folder.
   * It removes the folder from the database and refreshes the list.
   */
  const handleDeleteFolder = async (folder) => {
    try {
      await supabaseClient
        .from('flashcard_sets')
        .delete()
        .eq('user_id', user.id)
        .eq('folder_name', folder);
      refreshFoldersFromSupabase();
      setFolderToDelete(null); // Close confirmation dialog
    } catch (err) {
      alert(`Failed to delete folder "${folder}". Please try again.`);
    }
  };

  /**
   * Filter folders based on search query
   */
  const filteredFolders = folders.filter(folder => 
    folder.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * Navigate to create new flashcards
   */
  const handleCreateNew = () => {
    navigate('/flashcards-editor');
  };

  /**
   * Function to edit folder flashcards
   */
  const handleEditFolder = async (folder) => {
    try {
      const sets = await getFlashcardSetsFromSupabase(supabaseClient, user.id);
      const found = sets.find(set => set.folder_name === folder);
      const flashcards = found ? found.flashcards : [];
      navigate('/flashcards-editor', { state: { flashcards, folderName: folder } });
    } catch (err) {
      alert(`Error loading flashcards from "${folder}" for editing. Please try again.`);
    }
  };

  return (
    <div className="bg-#F6F1E5 min-h-screen">
      <div className="max-w-screen-lg mx-auto px-4 md:px-8 py-6 md:py-12">
        {/* Header section with title and create button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Flashcard Folders</h1>
            <p className="text-gray-600 mt-1">Manage your saved flashcard collections</p>
          </div>
          <button
            onClick={handleCreateNew}
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg flex items-center transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Create New Flashcards
          </button>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 px-4 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg 
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-blue-600"></div>
          </div>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            <p className="font-medium">{error}</p>
            <button 
              onClick={refreshFoldersFromSupabase}
              className="mt-2 text-sm font-medium text-red-700 hover:text-red-800"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && folders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No flashcard folders yet</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">Create your first set of flashcards to start studying smarter</p>
            <button
              onClick={handleCreateNew}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Create Your First Flashcards
            </button>
          </div>
        )}

        {/* Folders grid */}
        {!isLoading && !error && filteredFolders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFolders.map((folder, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <h3 className="text-lg font-medium text-gray-800 mb-2 truncate">{folder}</h3>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Created: {new Date().toLocaleDateString()}
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleOpenFolder(folder)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Study these flashcards"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg> 
                      </button>
                      <button
                        onClick={() => handleEditFolder(folder)}
                        className="text-green-600 hover:text-green-800 ml-2"
                        title="Edit these flashcards"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                      <button
                        onClick={() => setFolderToDelete(folder)}
                        className="text-red-600 hover:text-red-800 ml-2"
                        title="Delete this folder"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
                  <button
                    onClick={() => handleOpenFolder(folder)}
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                  >
                    Study Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No search results */}
        {!isLoading && !error && folders.length > 0 && filteredFolders.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg shadow-sm border border-gray-200">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No matching folders</h3>
            <p className="mt-1 text-gray-500">We couldn't find any folders matching "{searchQuery}"</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      {folderToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Folder</h3>
            <p className="text-gray-500 mb-4">
              Are you sure you want to delete "{folderToDelete}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setFolderToDelete(null)}
                className="px-4 py-2 text-gray-700 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteFolder(folderToDelete)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;