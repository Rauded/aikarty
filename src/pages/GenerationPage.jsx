import React, { useState } from 'react';
import backgroundImage from '../assets/generation_background.png';

const FlashcardGenerator = () => {
  const [inputContent, setInputContent] = useState('');
  const [activeTab, setActiveTab] = useState('Text');
  const [charCount, setCharCount] = useState(0);

  const handleContentChange = (e) => {
    const content = e.target.value;
    setInputContent(content);
    setCharCount(content.length);
  };

  return (
    <div className="generation-page min-h-screen w-full bg-sage-100" style={{
      backgroundColor: 'rgba(227, 229, 215, 0.5)',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <div className="flex justify-center items-center min-h-screen py-8">
        <div className="w-full max-w-1/2 mx-auto px-6 py-6 bg-white/80 rounded-lg shadow-2xl backdrop-blur-sm">
          {/* Header */}
          <h1 className="text-2xl font-bold text-gray-800 mb-2 drop-shadow" style={{ fontSize: 20 }}>AI Flashcard Generator</h1>
          
          {/* Subheader */}
          <p className="text-gray-600 mb-6 drop-shadow" style={{ fontSize: 20 }}>
            Upload a document, paste your notes, or select a video to automatically generate flashcards with AI.
          </p>
          
          {/* Input Type Tabs */}
          <div className="flex border-b mb-4">
            {['Document', 'Text', 'Image', 'Video'].map((tab) => (
              <button
                key={tab}
                className={`py-2 px-4 mr-2 ${
                  activeTab === tab
                    ? 'border border-gray-300 border-b-0 rounded-t-md bg-white drop-shadow'
                    : 'text-gray-500 hover:text-gray-700 drop-shadow'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
            <div className="flex-grow"></div>
            <button className="py-2 px-4 border rounded-md border-gray-300 text-gray-700">
              Options
            </button>
          </div>
          
          {/* Text Input Area */}
          <div className="mb-6">
            <textarea
              placeholder="Paste in your notes or other content"
              className="w-full p-4 border-4 border-dashed rounded-lg"
              style={{
                height: '300px',
                borderColor: '#d9d6c8',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
              }}
              value={inputContent}
              onChange={handleContentChange}
            ></textarea>
          </div>
          
          {/* Action Controls */}
          <div className="flex justify-between items-center">
            <button className="px-8 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors drop-shadow">
              Next
            </button>
            
            <div className="text-gray-500 text-sm drop-shadow">
              {charCount}/25,000 characters
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardGenerator;