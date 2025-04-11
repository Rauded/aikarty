import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveFlashcardSet, saveFlashcardSetToSupabase } from '../services/flashcardService.js';
import { useClerkSupabaseClient } from '../services/supabaseClient.js';
import { useUser } from '@clerk/clerk-react';
const FlashcardEditor = () => {
  const supabaseClient = useClerkSupabaseClient();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  // Accept flashcards from navigation state, or use default sample cards
  const initialFlashcards = location.state && location.state.flashcards
    ? location.state.flashcards.map((fc, idx) => ({
        id: idx + 1,
        front: fc.question || fc.front || "",
        back: fc.answer || fc.back || ""
      }))
    : [
      ];
  
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [title, setTitle] = useState('');
  const [saveMsg, setSaveMsg] = useState("");

  // Save flashcards to a new folder in Supabase (and optionally localStorage)
  const handleSaveToFolder = async () => {
    // Use title + timestamp for uniqueness
    const folderName = `${title.trim() || "Untitled"} - ${Date.now()}`;
    // Save as { question, answer } pairs
    const cardsToSave = flashcards.map(card => ({
      question: card.front,
      answer: card.back
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
    setTimeout(() => setSaveMsg(""), 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 min-w-screen">
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Edit Flashcards</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center px-4 py-2 text-blue-600 bg-white rounded-full border border-gray-200 hover:bg-gray-50"
              onClick={() => navigate('/generate')}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Flashcards
            </button>
            <button
              className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-full border border-blue-700 hover:bg-blue-700 ml-2"
              onClick={() => navigate('/dashboard')}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 8h14v-2H7v2zm0-4h14v-2H7v2zm0-6v2h14V7H7z"></path>
              </svg>
              Dashboard
            </button>
          </div>
        </div>
        
        {/* Flashcard Title Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-100 rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-4">
              <button
                onClick={handleSaveToFolder}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save to Folder
              </button>
              <button
                onClick={() => {
                  setFlashcards([
                    ...flashcards,
                    {
                      id: flashcards.length > 0 ? Math.max(...flashcards.map(fc => fc.id)) + 1 : 1,
                      front: '',
                      back: ''
                    }
                  ]);
                }}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Create New Flashcard
              </button>
              {saveMsg && <span className="text-green-600">{saveMsg}</span>}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { /* TODO: Implement export to PDF */ }}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Export to PDF
              </button>
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
        
        {/* Flashcard Items */}
        {flashcards.map((card, index) => (
          <div key={card.id} className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-semibold text-gray-700">{index + 1}</span>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
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
                  <button className="p-2 text-gray-400 hover:text-gray-600">B</button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">I</button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">U</button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">S</button>
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
                  <button className="p-2 text-white bg-purple-500 rounded-full hover:bg-purple-600">
                    AI
                  </button>
                  <button className="p-2 text-white bg-red-500 rounded-full hover:bg-red-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="mb-2 font-medium">Front</div>
                <div className="flex">
                  <div className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-300 rounded-lg mr-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span className="text-sm text-gray-500 mt-1">Image</span>
                  </div>
                  <textarea 
                    className="flex-1 p-4 bg-gray-100 rounded-lg resize-none"
                    value={card.front}
                    onChange={(e) => {
                      const updatedCards = [...flashcards];
                      updatedCards[index].front = e.target.value;
                      setFlashcards(updatedCards);
                    }}
                  />
                </div>
              </div>
              
              <div>
                <div className="mb-2 font-medium">Back</div>
                <div className="flex">
                  <textarea 
                    className="flex-1 p-4 bg-gray-100 rounded-lg resize-none"
                    value={card.back}
                    onChange={(e) => {
                      const updatedCards = [...flashcards];
                      updatedCards[index].back = e.target.value;
                      setFlashcards(updatedCards);
                    }}
                  />
                  <div className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-300 rounded-lg ml-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span className="text-sm text-gray-500 mt-1">Image</span>
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

export default FlashcardEditor;