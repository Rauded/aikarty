/**
 * This file defines a React component called FlashcardGenerator (GenerationPage).
 * This page lets users generate flashcards using artificial intelligence (AI) from different sources:
 * - Text (notes you paste in)
 * - Documents (like PDFs or Word files)
 * - Images (like photos of notes)
 * - Videos (like YouTube links)
 * The user can choose the input type, provide their content, and then click "Next" to generate flashcards.
 *
 * Usage: This component is usually shown when the user navigates to the flashcard generation route.
 */

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/generation_background.png';
import { generateFlashcards, generateFlashcardsFromFile } from '../services/flashcardService';

const FlashcardGenerator = () => {
  // State for the text input (when using the "Text" tab)
  const [inputContent, setInputContent] = useState('');
  // State for which input type tab is active ("Text", "Document", "Image", or "Video")
  const [activeTab, setActiveTab] = useState('Text');
  // State for counting the number of characters in the text input
  const [charCount, setCharCount] = useState(0);
  // State for the YouTube video link (when using the "Video" tab)
  const [videoLink, setVideoLink] = useState('');
  // State for the selected file (when using the "Document" or "Image" tab)
  const [selectedFile, setSelectedFile] = useState(null);
  // State for showing a loading spinner while generating flashcards
  const [loading, setLoading] = useState(false);
  // State for showing error messages
  const [error, setError] = useState('');
  // State for the generated flashcards (not shown on this page)
  const [flashcards, setFlashcards] = useState(null);
  // Reference to the hidden file input element
  const fileInputRef = useRef(null);
  // useNavigate lets us change pages in the app
  const navigate = useNavigate();

  /**
   * This function updates the text input and character count when the user types.
   */
  const handleContentChange = (e) => {
    const content = e.target.value;
    setInputContent(content);
    setCharCount(content.length);
  };

  /**
   * This function updates the video link when the user types in the "Video" tab.
   */
  const handleVideoLinkChange = (e) => {
    setVideoLink(e.target.value);
  };

  /**
   * This is a small button component used for the tab buttons and the "Next" button.
   * It changes style based on whether it's active or primary.
   */
  const StyledButton = ({ text, isActive, onClick, isPrimary }) => {
    return (
      <button
        onClick={onClick}
        className={`relative text-1xl px-6 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 ${
          isPrimary
            ? "bg-orange-200 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl font-bold"
            : isActive
              ? "bg-orange-200 text-orange-600 shadow-lg font-bold"
              : "bg-orange-200 bg-opacity-80 text-white hover:bg-orange-600 shadow-md font-bold"
        }`}
      >
        <span className="relative z-10">{text}</span>
        <span className={`absolute inset-0 rounded-full ${isActive ? 'animate-pulse bg-orange-200 bg-opacity-30' : ''}`}></span>
      </button>
    );
  };

  /**
   * This function shows the correct input area based on which tab is active.
   * - For "Document" and "Image", it shows a file upload area.
   * - For "Video", it shows a text input for a YouTube link.
   * - For "Text", it shows a textarea for notes.
   */
  const renderInputArea = () => {
    switch (activeTab) {
      case 'Document':
      case 'Image':
        return (
          <div
            className="flex flex-col items-center justify-center h-80 w-full border-4 border-dashed border-orange-300 rounded-xl bg-white bg-opacity-70 cursor-pointer hover:bg-orange-50 transition-colors"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            style={{ position: 'relative' }}
          >
            <div className="text-center p-8">
              {/* Icon for file upload */}
              <svg className="mx-auto h-12 w-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              {/* Show the selected file name or a prompt to upload */}
              <p className="mt-2 text-lg font-medium text-orange-900">
                {selectedFile
                  ? `Selected: ${selectedFile.name}`
                  : `Click to upload your ${activeTab === 'Document' ? 'document' : 'image'}`}
              </p>
              <p className="mt-1 text-sm text-orange-500">
                {activeTab === 'Document' ? 'PDF, DOCX, or TXT' : 'JPG, PNG, or PDF'} files up to 1MB
              </p>
              {/* Hidden file input for uploading files */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept={activeTab === 'Document' ? '.pdf,.doc,.docx,.txt' : '.jpg,.jpeg,.png,.pdf'}
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
              />
            </div>
          </div>
        );

      case 'Video':
        return (
          <div className="flex flex-col items-center w-full p-8 border-4 rounded-xl shadow-inner bg-white bg-opacity-70">
            <div className="max-w-md w-full mb-4">
              <label className="block mb-2 text-lg font-medium text-black">
                Enter YouTube Video URL
              </label>
              {/* Input for the YouTube video link */}
              <input
                type="text"
                className="w-full p-4 border-2 border-orange-300 rounded-lg focus:outline-none focus:border-orange-300"
                placeholder="https://www.youtube.com/watch?v=..."
                value={videoLink}
                onChange={handleVideoLinkChange}
              />
            </div>
            <p className="mt-2 text-sm text-orange-500">
              We'll extract and analyze the content from the video
            </p>
          </div>
        );

      default: // Text
        return (
          // Textarea for pasting notes or other content
          <textarea
            placeholder="Paste in your notes or other content"
            className="flex flex-col items-center justify-center h-80 w-full border-4 border-dashed border-orange-300 rounded-xl bg-white bg-opacity-70 cursor-pointer transition-colors focus:outline-none focus:border-orange-300"
            value={inputContent}
            onChange={handleContentChange}
          ></textarea>
        );
    }
  };

  return (
    // This <div> is the main container for the flashcard generator page.
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-50 to-purple-100 overflow-x-hidden"
    style={{ backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'}}>
      <div className="mx-auto max-w-screen-lg w-full px-4 md:px-8 py-4 md:py-8">
        {/* Header */}
        <h1 className="text-center font-bold text-xl md:text-4xl text-white py-4 md:py-8 text-shadow-strong">AI Flashcard Generator</h1>
        
        {/* Subheader */}
        <h2 className="text-center text-base md:text-xl text-white py-2 mb-6 md:mb-12 max-w-2xl mx-auto text-shadow-strong">
          Upload a document, paste your notes, or select a video to automatically generate flashcards with AI.
        </h2>
        
        {/* Input Type Tabs and Options */}
        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2 md:gap-4 mx-0 md:mx-4">
          {/* Document type buttons on the left */}
          <div className="flex gap-2 md:gap-4">
            {['Document', 'Text', 'Image', 'Video'].map((tab) => (
              <StyledButton
                key={tab}
                text={tab}
                isActive={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              />
            ))}
          </div>
          
          {/* Options button on the right (not implemented) */}
          <div>
            <StyledButton text="Options" isActive={false} onClick={() => {}} />
          </div>
        </div>
        
        {/* Dynamic Input Area */}
        <div className="mb-4 md:mb-6">
          {renderInputArea()}
        </div>
        
        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between mt-4 mb-8 md:mb-10 gap-2">
          {/* Show character count for the Text tab */}
          <div className="text-white font-medium text-sm md:text-base">
            {activeTab === 'Text' ? `${charCount}/25,000 characters ` : ''}
          </div>
          
          {/* "Next" button to generate flashcards */}
          <StyledButton
             text={loading ? "Generating..." : "Next"}
             isPrimary={true}
             onClick={async () => {
               setError('');
               setFlashcards(null);
               if (loading) return;
               setLoading(true);
               try {
                 let result;
                 if (activeTab === 'Text') {
                   if (!inputContent.trim()) throw new Error('Please enter some text.');
                   result = await generateFlashcards(inputContent, {});
                 } else if (activeTab === 'Document' || activeTab === 'Image') {
                   if (!selectedFile) throw new Error('Please select a file to upload.');
                   result = await generateFlashcardsFromFile(selectedFile, {});
                 } else {
                   throw new Error('This input type is not yet supported.');
                 }
                 // Navigate to the flashcards editor page with generated flashcards
                 navigate('/flashcards-editor', { state: { flashcards: result } });
               } catch (err) {
                 setError(err.message || 'An error occurred.');
               }
               setLoading(false);
             }}
          />
        </div>
      </div>
      {/* Error and Results */}
      {error && (
        <div className="mt-4 text-red-600 font-semibold text-center">{error}</div>
      )}
      {/* The generated flashcards are now shown in the editor page, not here */}
    </div>
  );
};

// This line makes the FlashcardGenerator component available for use in other files.
export default FlashcardGenerator;