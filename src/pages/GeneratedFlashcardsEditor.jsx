/**
 * This file defines a React component called FlashcardEditor (GeneratedFlashcardsEditor).
 * A "flashcard editor" is a page where users can view, create, and edit digital flashcards for studying.
 * This page lets users add new flashcards, edit their content, and save them to a database.
 *
 * Usage: This component is usually shown when the user navigates to the flashcard editor route.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveFlashcardSet, saveFlashcardSetToSupabase } from '../services/flashcardService.js';
import { useClerkSupabaseClient } from '../services/supabaseClient.js';
import { useUser } from '@clerk/clerk-react';

const FlashcardEditor = () => {
  // Get the Supabase client for database operations.
  const supabaseClient = useClerkSupabaseClient();
  // useNavigate lets us change pages in the app.
  const navigate = useNavigate();
  // useLocation gives us information about how we got to this page (including any flashcards passed from another page).
  const location = useLocation();
  // Get the current user (from Clerk authentication).
  const { user } = useUser();

  // Set up the initial flashcards, either from navigation state or as an empty array.
  // Each flashcard has an id, a "front" (question), and a "back" (answer).
  const initialFlashcards = location.state && location.state.flashcards
    ? location.state.flashcards.map((fc, idx) => ({
        id: idx + 1,
        front: fc.question || fc.front || "",
        back: fc.answer || fc.back || "",
        frontImage: null,
        backImage: null,
      }))
    : [
      ];
  
  // State for the list of flashcards being edited.
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  // State for the title of the flashcard set.
  const [title, setTitle] = useState('');
  // State for showing save messages to the user.
  const [saveMsg, setSaveMsg] = useState("");

 // Ref to track if initial data has loaded to prevent saving on mount
 const isInitialMount = useRef(true);

 // Function to perform the auto-save
 const autoSaveFlashcards = async () => {
   if (!user) {
     console.log("User not logged in, skipping auto-save.");
     return;
   }
   const folderName = title.trim() || "Untitled";
   const cardsToSave = flashcards.map(card => ({
     question: card.front,
     answer: card.back,
     frontImage: card.frontImage,
     backImage: card.backImage,
   }));
   try {
     await saveFlashcardSetToSupabase(supabaseClient, user.id, folderName, cardsToSave);
     console.log(`Auto-saved to database: "${folderName}"`);
   } catch (err) {
     console.error("Error during auto-save:", err);
     // Optionally show a temporary error message to the user
   }
 };

 // Effect for auto-saving with debounce
 useEffect(() => {
   // Prevent saving on initial mount
   if (isInitialMount.current) {
     isInitialMount.current = false;
     return;
   }

   const handler = setTimeout(() => {
     autoSaveFlashcards();
   }, 1000); // Save after 1 second of inactivity

   // Cleanup function to clear timeout and save on unmount
   return () => {
     clearTimeout(handler);
     // Save on component unmount
     autoSaveFlashcards();
   };
 }, [flashcards, title, user, supabaseClient]); // Dependencies for the effect

  // Effect to load the flashcard set title on initial mount
  useEffect(() => {
    if (location.state && location.state.folderName) {
      setTitle(location.state.folderName);
    }
  }, [location.state]); // Dependency on location.state to handle potential changes

  /**
   * This function saves the current flashcards to a new folder in the database.
   * It uses the title and a timestamp to make the folder name unique.
    */
 const handleImageUpload = (cardId, side, event) => {
   const file = event.target.files[0];
   if (file) {
     const reader = new FileReader();
     reader.onloadend = () => {
       setFlashcards(flashcards.map(card => {
         if (card.id === cardId) {
           return {
             ...card,
             [side === 'front' ? 'frontImage' : 'backImage']: reader.result,
           };
         }
         return card;
       }));
     };
     reader.readAsDataURL(file);
   }
 };

  /**
   * This function saves the current flashcards to a new folder in the database.
   * It uses the title and a timestamp to make the folder name unique.
   */
  const handleSaveToFolder = async () => {
    // Use title + timestamp for uniqueness
    const folderName = title.trim() || "Untitled";
    // Save as { question, answer, frontImage, backImage } pairs
    const cardsToSave = flashcards.map(card => ({
      question: card.front,
      answer: card.back,
      frontImage: card.frontImage, // TODO: Upload image to Supabase Storage and save the URL instead of data URL
      backImage: card.backImage, // TODO: Upload image to Supabase Storage and save the URL instead of data URL
    }));
    try {
      if (!user) {
        setSaveMsg("You must be logged in to save to the database.");
      } else {
        await saveFlashcardSetToSupabase(supabaseClient, user.id, folderName, cardsToSave);
        setSaveMsg(`Saved to database: "${folderName}"`);
      }
    } catch (err) {
      setSaveMsg("Error saving to database: " + (err.message || err));
    }
    // Clear the save message after 2.5 seconds.
    setTimeout(() => setSaveMsg(""), 2500);
  };

  const handleFormatClick = (cardId, formatType) => {
    // Find the card being edited
    const cardIndex = flashcards.findIndex(card => card.id === cardId);
    if (cardIndex === -1) return;

    // Restore the selection in the contenteditable div
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    if (selectedText) {
      // Use document.execCommand to apply/remove formatting
      document.execCommand(formatType, false, null);

      // Update the state with the new HTML content
      const updatedCards = [...flashcards];
      // Determine which side was edited based on the selection's container
      const container = selection.getRangeAt(0).commonAncestorContainer;
      const editedSide = container.closest('.grid > div:first-child') ? 'front' : 'back';

      // Find the contenteditable div for the edited side
      const contentEditableDiv = container.closest('[contenteditable="true"]');
      if (contentEditableDiv) {
        updatedCards[cardIndex][editedSide] = contentEditableDiv.innerHTML;
        setFlashcards(updatedCards);
      }
    }
  };

  return (
    // This <div> is the main container for the flashcard editor page.
    <div className="flex flex-col items-center justify-center min-h-screen bg-#F6F1E5">
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-6">
        {/* Top bar with page title and navigation buttons */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Edit Flashcards</h1>
          </div>
          <div className="flex items-center gap-2">
            {/* Button to go back to the flashcard generation page */}
            <button
              className="flex items-center px-4 py-2 text-blue-600 bg-white rounded-full border border-gray-200 hover:bg-gray-50"
              onClick={async () => {
                await autoSaveFlashcards();
                navigate('/generate');
              }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Flashcards
            </button>
            {/* Button to go to the dashboard */}
            <button
              className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-full border border-blue-700 hover:bg-blue-700 ml-2"
              onClick={async () => {
                await autoSaveFlashcards();
                navigate('/dashboard');
              }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 8h14v-2H7v2zm0-4h14v-2H7v2zm0-6v2h14V7H7z"></path>
              </svg>
              Dashboard
            </button>
          </div>
        </div>
        
        {/* Section for naming and saving the flashcard set */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            {/* Input for the flashcard set name */}
            <input
              type="text"
              className="w-full p-3 bg-gray-100 rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-4">
              {/* Button to save the flashcards to a folder */}
              <button
                onClick={handleSaveToFolder}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save to Folder
              </button>
              {/* Button to add a new (empty) flashcard */}
              <button
                onClick={() => {
                  setFlashcards([
                    ...flashcards,
                    {
                      id: flashcards.length > 0 ? Math.max(...flashcards.map(fc => fc.id)) + 1 : 1,
                      front: '',
                      back: '',
                      frontImage: null,
                      backImage: null,
                    }
                  ]);
                }}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Create New Flashcard
              </button>
              {/* Show a message if saving succeeded or failed */}
              {saveMsg && <span className="text-green-600">{saveMsg}</span>}
            </div>
            <div className="flex items-center gap-2">
              {/* Button to export flashcards to PDF (not implemented yet) */}
              <button
                onClick={() => { /* TODO: Implement export to PDF */ }}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Export to PDF
              </button>
              {/* Button to export flashcards to Anki (not implemented yet) */}
              <button
                onClick={() => { /* TODO: Implement export to Anki */ }}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Export to Anki
              </button>
            </div>
          </div>
          <p className="text-gray-600">All changes are saved automatically. Click and drag to rearrange flashcards.</p>
        </div>
        
        {/* List of flashcard items for editing */}
        {flashcards.map((card, index) => (
          <div key={card.id} className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              {/* Show the flashcard number */}
              <span className="text-xl font-semibold text-gray-700">{index + 1}</span>
              
              {/* Toolbar with formatting and AI buttons (not all implemented) */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {/* Example toolbar buttons (arrows, formatting, etc.) */}
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                  </button>
                  <span className="border-r border-gray-300 h-6 mx-2"></span>
                  <button className="p-2 text-gray-400 hover:text-gray-600" onClick={() => handleFormatClick(card.id, 'bold')}>B</button>
                  <button className="p-2 text-gray-400 hover:text-gray-600" onClick={() => handleFormatClick(card.id, 'italic')}>I</button>
                  <button className="p-2 text-gray-400 hover:text-gray-600" onClick={() => handleFormatClick(card.id, 'underline')}>U</button>
                  <button className="p-2 text-gray-400 hover:text-gray-600" onClick={() => handleFormatClick(card.id, 'strikethrough')}>S</button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                  </button>
                  <span className="border-r border-gray-300 h-6 mx-2"></span>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* AI button (not implemented) */}
                  <button className="p-2 text-white bg-purple-500 rounded-full hover:bg-purple-600">
                    AI
                  </button>
                  {/* Delete button (not implemented) */}
                  <button className="p-2 text-white bg-red-500 rounded-full hover:bg-red-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Two columns: one for the front, one for the back of the flashcard */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="mb-2 font-medium">Front</div>
                <div className="flex">
                  {/* Image upload and display for the front */}
                  <div className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-300 rounded-lg mr-4 cursor-pointer" onClick={() => document.getElementById(`frontImageInput-${card.id}`).click()}>
                    <input
                      type="file"
                      accept="image/*"
                      id={`frontImageInput-${card.id}`}
                      className="hidden"
                      onChange={(e) => handleImageUpload(card.id, 'front', e)}
                    />
                    {card.frontImage ? (
                      <img src={card.frontImage} alt="Front Flashcard Image" className="max-w-full max-h-32 object-contain" />
                    ) : (
                      <>
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span className="text-sm text-gray-500 mt-1">Image</span>
                      </>
                    )}
                  </div>
                  {/* Textarea for editing the front (question) of the flashcard */}
                  <div
                    className="flex-1 p-4 bg-gray-100 rounded-lg resize-none"
                    contentEditable="true"
                    onInput={(e) => {
                      const updatedCards = [...flashcards];
                      updatedCards[index].front = e.target.innerHTML;
                      setFlashcards(updatedCards);
                    }}
                  >
                    <p dangerouslySetInnerHTML={{ __html: card.front }}></p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="mb-2 font-medium">Back</div>
                <div className="flex">
                  {/* Textarea for editing the back (answer) of the flashcard */}
                  <div
                    className="flex-1 p-4 bg-gray-100 rounded-lg resize-none"
                    contentEditable="true"
                    onInput={(e) => {
                      const updatedCards = [...flashcards];
                      updatedCards[index].back = e.target.innerHTML;
                      setFlashcards(updatedCards);
                    }}
                  >
                    <p dangerouslySetInnerHTML={{ __html: card.back }}></p>
                  </div>
                  {/* Image upload and display for the back */}
                  <div className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-300 rounded-lg ml-4 cursor-pointer" onClick={() => document.getElementById(`backImageInput-${card.id}`).click()}>
                    <input
                      type="file"
                      accept="image/*"
                      id={`backImageInput-${card.id}`}
                      className="hidden"
                      onChange={(e) => handleImageUpload(card.id, 'back', e)}
                    />
                    {card.backImage ? (
                      <img src={card.backImage} alt="Back Flashcard Image" className="max-w-full max-h-32 object-contain" />
                    ) : (
                      <>
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span className="text-sm text-gray-500 mt-1">Image</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// This line makes the FlashcardEditor component available for use in other files.
export default FlashcardEditor;