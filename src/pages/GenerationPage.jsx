import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/generation_background.png';
import { generateFlashcards, generateFlashcardsFromFile } from '../services/flashcardService';

const FlashcardGenerator = () => {
  const [inputContent, setInputContent] = useState('');
  const [activeTab, setActiveTab] = useState('Text');
  const [charCount, setCharCount] = useState(0);
  const [videoLink, setVideoLink] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [flashcards, setFlashcards] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleContentChange = (e) => {
    const content = e.target.value;
    setInputContent(content);
    setCharCount(content.length);
  };

  const handleVideoLinkChange = (e) => {
    setVideoLink(e.target.value);
  };

  // Button component for consistent styling
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

  // Render different input areas based on active tab
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
              <svg className="mx-auto h-12 w-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="mt-2 text-lg font-medium text-orange-900">
                {selectedFile
                  ? `Selected: ${selectedFile.name}`
                  : `Click to upload your ${activeTab === 'Document' ? 'document' : 'image'}`}
              </p>
              <p className="mt-1 text-sm text-orange-500">
                {activeTab === 'Document' ? 'PDF, DOCX, or TXT' : 'JPG, PNG, or PDF'} files up to 1MB
              </p>
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
              <input
                type="text"
                className="w-full p-4 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          <textarea
            placeholder="Paste in your notes or other content"
            className="w-full p-4 border-4 rounded-xl shadow-inner h-80"
            style={{
              borderColor: '#d9d6c8',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
            }}
            value={inputContent}
            onChange={handleContentChange}
          ></textarea>
        );
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-50 to-purple-100" 
    style={{ backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'}}>
      <div className="mx-auto max-w-4xl w-full px-4">
        {/* Header */}
        <h1 className="text-center font-bold text-4xl text-white p-8 text-shadow-strong">AI Flashcard Generator</h1>
        
        {/* Subheader */}
        <h2 className="text-center text-xl text-white p-2 mb-12 max-w-2xl mx-auto text-shadow-strong">
          Upload a document, paste your notes, or select a video to automatically generate flashcards with AI.
        </h2>
        
        {/* Input Type Tabs and Options - Repositioned */}
        <div className="flex justify-between mb-4 mx-4">
          {/* Document type buttons on the left */}
          <div className="flex gap-2">
            {['Document', 'Text', 'Image', 'Video'].map((tab) => (
              <StyledButton 
                key={tab}
                text={tab}
                isActive={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              />
            ))}
          </div>
          
          {/* Options button on the right */}
          <div>
            <StyledButton text="Options" isActive={false} onClick={() => {}} />
          </div>
        </div>
        
        {/* Dynamic Input Area */}
        <div className="mb-6">
          {renderInputArea()}
        </div>
        
        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between mt-4 mb-10">
          <div className="text-white font-medium">
            {activeTab === 'Text' ? `${charCount}/25,000 characters ` : ''}
          </div>
          
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

export default FlashcardGenerator;