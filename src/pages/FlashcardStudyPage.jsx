import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useClerkSupabaseClient } from '../services/supabaseClient.js'; // Assuming correct path

/**
 * FlashcardStudyPage.jsx
 *
 * A modern flashcard study interface incorporating evidence-based learning techniques:
 * - Spaced repetition: Cards are shown based on recall difficulty (via study modes)
 * - Active recall: Users actively test their memory before seeing answers
 * - Metacognition: Users rate their confidence in answers
 * - Interleaving: Optional mixing of different topics (Note: Requires fetching from multiple folders, not implemented in this component version)
 * - Retrieval practice: Focus on retrieving information from memory
 * - Timer: Customizable countdown timer or stopwatch displayed in the upper right corner.
 * - Answers cannot be typed to cards
 * - No progress bar
 * - Cards are tracked with a bubble display: [First Card #] - [Bubble: Current Card #] - [Last Card #]
 *
 * Keyboard Shortcuts:
 * - Space: Flip card (show/hide answer) OR Save selected rating and go next (if answer shown & rating selected via arrows).
 * - Right Arrow: Next card
 * - Left Arrow: Previous card
 * - Up/Down Arrow: Select difficulty rating when answer is shown.
 * - Enter: Confirm selected difficulty rating (if answer shown & rating selected via arrows).
 * - 1/2/3/4: Rate difficulty directly (Again/Hard/Good/Easy) when answer is shown.
 *
 * @module FlashcardStudyPage
 */

/**
 * FlashcardStudyPage Component
 *
 * Main study interface for reviewing flashcards with spaced repetition, active recall, and keyboard navigation.
 * Handles card flipping, navigation, rating, and session timing.
 */
const FlashcardStudyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const supabaseClient = useClerkSupabaseClient();
  const timerMenuRef = useRef(null); // Ref for the timer menu

  // Extract flashcards and folder name from navigation state
  const { flashcards: initialFlashcards = [], folderName = 'Untitled Deck' } = location.state || {};

  // State variables
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyStats, setStudyStats] = useState({
    cardsStudied: 0, // Tracks how many cards received a rating
    correctAnswers: 0, // Tracks 'good' or 'easy' ratings
    timeSpent: 0, // Total session time (tracked by sessionTimer)
  });
  const [difficultyRatings, setDifficultyRatings] = useState({}); // Tracks rating per card index for potential future use
  const [studyComplete, setStudyComplete] = useState(false);
  const [studyMode, setStudyMode] = useState('standard'); // standard, spaced, shuffle
  const [isLoading, setIsLoading] = useState(true);
  const [studyHistory, setStudyHistory] = useState([]); // Track review events
  const [selfRating, setSelfRating] = useState(null); // Tracks keyboard-selected rating before confirmation

  // --- Timer State ---
  const [sessionTimer, setSessionTimer] = useState(0); // Tracks total session time in seconds (always counts up)
  const [timerValue, setTimerValue] = useState(0); // Current display value (seconds) - counts up or down
  const [timerMode, setTimerMode] = useState('stopwatch'); // 'stopwatch' or 'countdown'
  const [timerDuration, setTimerDuration] = useState(null); // Total duration for countdown mode (seconds)
  const [isTimerRunning, setIsTimerRunning] = useState(true); // Controls the display timer interval
  const [isTimerMenuOpen, setIsTimerMenuOpen] = useState(false);
  const [customTimeInput, setCustomTimeInput] = useState("05:00"); // Default custom input MM:SS

  // --- Initialize Flashcards and Timers ---
  useEffect(() => {
    // Reset states when new deck/mode is loaded
    setIsLoading(true);
    setFlashcards([]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setStudyComplete(false);
    setSelfRating(null);
    setDifficultyRatings({});
    setStudyStats({ cardsStudied: 0, correctAnswers: 0, timeSpent: 0 });
    setStudyHistory([]);

    // Reset and start timers
    setSessionTimer(0); // Reset total session timer
    setTimerValue(0); // Reset display timer
    setTimerMode('stopwatch'); // Default to stopwatch
    setTimerDuration(null);
    setIsTimerRunning(true); // Start display timer (stopwatch)
    setIsTimerMenuOpen(false); // Ensure menu is closed

    if (initialFlashcards.length > 0) {
      const preparedCards = initialFlashcards.map((card, index) => ({
        ...card,
        id: card.id || `temp-id-${index}`, // Ensure unique ID
        lastStudied: null,
        timesReviewed: 0,
        nextReviewDelay: 1,
        mastery: 0,
      }));

      let sortedCards = [...preparedCards];
      if (studyMode === 'spaced') {
        sortedCards = sortByDueDate(preparedCards);
      } else if (studyMode === 'shuffle') {
        sortedCards = shuffleArray(preparedCards);
      }

      setFlashcards(sortedCards);
      setIsLoading(false);

    } else {
      setIsLoading(false); // No cards, stop loading
    }
  }, [initialFlashcards, studyMode]); // Rerun if initial cards or mode change

  // --- Session Timer Effect (Always counts up total time) ---
  useEffect(() => {
      const intervalId = setInterval(() => {
        // Only increment session timer if study isn't complete
        if (!studyComplete) {
           setSessionTimer(prevTimer => prevTimer + 1);
        }
      }, 1000);

      // Cleanup interval on component unmount or when study completes
      return () => clearInterval(intervalId);
  }, [studyComplete]); // Rerun only if studyComplete changes

  // --- Display Timer Logic Effect (Handles stopwatch/countdown) ---
  useEffect(() => {
    let intervalId = null;

    if (isTimerRunning && !studyComplete) {
      intervalId = setInterval(() => {
        if (timerMode === 'stopwatch') {
          setTimerValue(prev => prev + 1);
        } else if (timerMode === 'countdown') {
          setTimerValue(prev => {
            if (prev <= 1) {
              clearInterval(intervalId); // Stop interval
              setIsTimerRunning(false);
              // Optional: Notify user timer ended
              alert("Timer finished!"); // Simple notification
              // Revert to stopwatch mode after countdown finishes?
              setTimerMode('stopwatch');
              setTimerDuration(null);
              setTimerValue(0); // Reset display
              setIsTimerRunning(true); // Start stopwatch again
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }

    // Cleanup function
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isTimerRunning, timerMode, studyComplete]); // Dependencies for display timer

  // --- Click Outside Timer Menu ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (timerMenuRef.current && !timerMenuRef.current.contains(event.target)) {
        setIsTimerMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // Get current card safely
  const currentCard = flashcards.length > 0 ? flashcards[currentIndex] : { id: 'loading', question: 'Loading...', answer: 'Please wait...' };

  // --- Time Formatting ---
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  // --- Timer Control Handlers ---
  const toggleTimerMenu = () => {
      setIsTimerMenuOpen(prev => !prev);
  };

  const handleSetPresetTimer = (minutes) => {
      const seconds = minutes * 60;
      setTimerMode('countdown');
      setTimerDuration(seconds);
      setTimerValue(seconds);
      setIsTimerRunning(true);
      setIsTimerMenuOpen(false);
  };

  const handleSetCustomTimer = () => {
      const parts = customTimeInput.split(':');
      if (parts.length === 2) {
          const minutes = parseInt(parts[0], 10);
          const seconds = parseInt(parts[1], 10);
          if (!isNaN(minutes) && !isNaN(seconds) && minutes >= 0 && seconds >= 0 && seconds < 60) {
              const totalSeconds = minutes * 60 + seconds;
              if (totalSeconds > 0) {
                  setTimerMode('countdown');
                  setTimerDuration(totalSeconds);
                  setTimerValue(totalSeconds);
                  setIsTimerRunning(true);
                  setIsTimerMenuOpen(false);
              } else {
                  // If user enters 00:00, treat as stopwatch
                  handleSetStopwatchMode();
              }
          } else {
              alert("Invalid time format. Please use MM:SS (e.g., 05:00).");
          }
      } else {
           alert("Invalid time format. Please use MM:SS (e.g., 05:00).");
      }
  };

  const handleSetStopwatchMode = () => {
      setTimerMode('stopwatch');
      setTimerDuration(null);
      // Should it reset the timerValue? Yes, probably.
      setTimerValue(0);
      setIsTimerRunning(true);
      setIsTimerMenuOpen(false);
  };

  // --- Spaced Repetition & Sorting Logic ---
  const sortByDueDate = (cards) => { /* ... (no changes needed) ... */
    return [...cards].sort((a, b) => {
        const reviewTimeA = a.lastStudied ? new Date(a.lastStudied).getTime() + (a.nextReviewDelay || 1) * 24 * 60 * 60 * 1000 : 0;
        const reviewTimeB = b.lastStudied ? new Date(b.lastStudied).getTime() + (b.nextReviewDelay || 1) * 24 * 60 * 60 * 1000 : 0;
        return reviewTimeA - reviewTimeB;
      });
  };
  const shuffleArray = (array) => { /* ... (no changes needed) ... */
    let currentIndex = array.length, randomIndex;
    const newArray = [...array];
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
      }
    return newArray;
   };


  // --- Card Interaction Logic ---
  const handleFlip = () => { /* ... (no changes needed) ... */
    if (!isFlipped) {
        setIsFlipped(true);
        setStudyHistory(prev => [...prev, { cardId: currentCard.id, timestamp: new Date(), action: 'viewed_answer' }]);
      } else {
        setIsFlipped(false);
        setSelfRating(null);
      }
  };

  const handleDifficultyRating = (rating) => { /* ... (mostly unchanged, ensure timeSpent uses sessionTimer) ... */
    if (!isFlipped || !currentCard || flashcards.length === 0) return; // Only rate when answer is shown

    const updatedCards = [...flashcards];
    const cardToUpdate = updatedCards[currentIndex];

    let mastery = cardToUpdate.mastery || 0;
    let nextDelay = cardToUpdate.nextReviewDelay || 1;

    switch (rating) {
      case 'easy': mastery = Math.min(100, mastery + 20); nextDelay = Math.max(1, nextDelay * 2.0); break;
      case 'good': mastery = Math.min(100, mastery + 10); nextDelay = Math.max(1, nextDelay * 1.5); break;
      case 'hard': mastery = Math.max(0, mastery + 5); nextDelay = Math.max(1, nextDelay * 1.1); break;
      case 'again': default: mastery = Math.max(0, mastery - 15); nextDelay = 1; break;
    }

    updatedCards[currentIndex] = {
      ...cardToUpdate,
      lastStudied: new Date(),
      timesReviewed: (cardToUpdate.timesReviewed || 0) + 1,
      nextReviewDelay: Math.round(nextDelay * 10) / 10,
      mastery: Math.round(mastery),
    };

    setDifficultyRatings({ ...difficultyRatings, [currentIndex]: rating });

    setStudyStats(prev => ({
      ...prev,
      cardsStudied: prev.cardsStudied + 1,
      correctAnswers: rating === 'easy' || rating === 'good' ? prev.correctAnswers + 1 : prev.correctAnswers,
      // timeSpent is updated when study completes using sessionTimer
    }));

    setFlashcards(updatedCards);
    moveToNextCard(rating);
  };

  const moveToNextCard = (rating) => { /* ... (ensure timeSpent uses sessionTimer) ... */
    setIsFlipped(false);
    setSelfRating(null);

    if (currentIndex >= flashcards.length - 1) {
        // Study complete - Record total session time
        setStudyStats(prev => ({ ...prev, timeSpent: sessionTimer }));
        setStudyComplete(true);
        setIsTimerRunning(false); // Stop display timer
        saveProgress(); // Attempt to save progress
    } else {
        setCurrentIndex(currentIndex + 1);
    }
  };


  const skipCard = () => { /* ... (ensure timeSpent uses sessionTimer) ... */
    setIsFlipped(false);
    setSelfRating(null);

    if (studyMode === 'shuffle' && flashcards.length > 1) {
      let nextIndex;
      do { nextIndex = Math.floor(Math.random() * flashcards.length); } while (nextIndex === currentIndex);
      setCurrentIndex(nextIndex);
      return;
    }

    if (currentIndex >= flashcards.length - 1) {
      setStudyStats(prev => ({ ...prev, timeSpent: sessionTimer }));
      setStudyComplete(true);
      setIsTimerRunning(false); // Stop display timer
      saveProgress();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousCard = () => { /* ... (no changes needed) ... */
     if (studyMode === 'shuffle' && flashcards.length > 1) {
        let prevIndex;
        do { prevIndex = Math.floor(Math.random() * flashcards.length); } while (prevIndex === currentIndex);
        setIsFlipped(false);
        setSelfRating(null);
        setCurrentIndex(prevIndex);
        return;
      }
    if (currentIndex > 0) {
      setIsFlipped(false);
      setSelfRating(null);
      setCurrentIndex(currentIndex - 1);
    }
  };

  // --- Keyboard Navigation ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (studyComplete || ['INPUT', 'TEXTAREA', 'BUTTON'].includes(document.activeElement.tagName)) {
        return;
      }

      switch (e.key) {
        case " ": // Spacebar
          e.preventDefault();
          // *** NEW: If answer shown and rating selected via arrows, save rating ***
          if (isFlipped && selfRating) {
              handleDifficultyRating(selfRating);
          } else {
          // Otherwise, just flip the card
              handleFlip();
          }
          break;
        case "ArrowRight": skipCard(); break;
        case "ArrowLeft": previousCard(); break;
        case "ArrowUp":
        case "ArrowDown":
          if (isFlipped) {
            e.preventDefault();
            const ratingOrder = ["again", "hard", "good", "easy"];
            let currentIdx = selfRating ? ratingOrder.indexOf(selfRating) : -1;
            let nextIdx;

            if (e.key === "ArrowUp") { // Move towards 'easy'
                if (currentIdx === -1) nextIdx = 1; // Start at 'hard'
                else nextIdx = Math.min(ratingOrder.length - 1, currentIdx + 1);
            } else { // ArrowDown - Move towards 'again'
                if (currentIdx === -1) nextIdx = 2; // Start at 'good'
                else nextIdx = Math.max(0, currentIdx - 1);
            }
             setSelfRating(ratingOrder[nextIdx]);
          }
          break;
        case "Enter": // Confirm rating selected by arrows
             if (isFlipped && selfRating) {
                handleDifficultyRating(selfRating);
            }
            // Optional: Could make Enter flip if not flipped and no rating selected
            // else if (!isFlipped) { handleFlip(); }
            break;
        // Direct rating keys
        case "1": if (isFlipped) handleDifficultyRating("again"); break;
        case "2": if (isFlipped) handleDifficultyRating("hard"); break;
        case "3": if (isFlipped) handleDifficultyRating("good"); break;
        case "4": if (isFlipped) handleDifficultyRating("easy"); break;

        default: break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // Dependencies now include selfRating for Space/Enter keys
  }, [currentIndex, isFlipped, studyComplete, flashcards, selfRating, timerMode, timerValue, sessionTimer, studyMode]); // Added timer states and studyMode


  // --- Study Mode & Session Management ---
  const changeStudyMode = (mode) => { /* ... (useEffect handles reset now) ... */
    if (mode === studyMode) return;
    setStudyMode(mode);
     // The main useEffect [initialFlashcards, studyMode] handles the rest
     document.getElementById('studyModeMenu').classList.add('hidden'); // Close menu
  };

  const saveProgress = async () => { /* ... (ensure timeSpent uses sessionTimer in studyData) ... */
    if (!user || !supabaseClient || flashcards.length === 0) return false;

    try {
      const cardsMetadata = flashcards.map(card => ({
        id: card.id,
        mastery: card.mastery || 0,
        times_reviewed: card.timesReviewed || 0,
        next_review_delay: card.nextReviewDelay || 1,
        last_studied: card.lastStudied ? card.lastStudied.toISOString() : null,
      }));

      const studyData = {
          userId: user.id,
          folderName: folderName,
          lastStudiedAt: new Date().toISOString(),
          cardsMetadata: cardsMetadata,
          // Use sessionTimer for total time spent in this session
          sessionStats: { ...studyStats, timeSpent: sessionTimer }
      };

      const { data, error } = await supabaseClient
        .from('flashcard_study_progress')
        .upsert({
          user_id: user.id,
          folder_name: folderName,
          study_data: studyData,
          last_studied_at: studyData.lastStudiedAt
        }, { onConflict: 'user_id, folder_name' })
        .select();

      if (error) {
        console.error('Error saving progress:', error.message); return false;
      }
      // console.log('Progress saved successfully:', data);
      return true;
    } catch (err) {
      console.error('Unexpected error during saveProgress:', err); return false;
    }
  };

  const exitStudySession = async () => { /* ... (no changes needed) ... */
    await saveProgress();
    navigate('/dashboard');
  };

  const restartStudy = () => { /* ... (useEffect handles reset now) ... */
     // Just trigger the reload effect by changing studyMode slightly if needed,
     // or simply reset relevant states manually. Let useEffect handle it for consistency.
     // Force a re-run of the initialization useEffect
     setStudyMode(prevMode => prevMode); // This might not trigger if value is same
     // Explicitly reset:
     setIsLoading(true); // Briefly show loading
     const currentMode = studyMode;
     setStudyMode(''); // Temporarily change to force useEffect rerun
     setTimeout(() => setStudyMode(currentMode), 0); // Set it back
  };

  // --- UI Helper ---
  const getMasteryColor = (mastery) => { /* ... (no changes needed) ... */
    if (mastery >= 80) return 'bg-green-500';
    if (mastery >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
   };


  // --- Render Logic ---

  // Loading State
  if (isLoading) { /* ... (no changes needed) ... */
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="ml-4 text-gray-600">Loading Deck...</p>
        </div>
      );
  }

   // No Flashcards State
   if (!isLoading && flashcards.length === 0) { /* ... (no changes needed) ... */
     return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-700 mb-4">No Cards to Study</h1>
          <p className="text-gray-500 mb-6">There are no flashcards in this deck, or they couldn't be loaded.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      );
   }

  // Study Completion Screen
  if (studyComplete) { /* ... (ensure finalStats use correct time) ... */
    // Use the final recorded sessionTimer from studyStats
    const finalStats = studyStats;
    const accuracy = finalStats.cardsStudied > 0
      ? Math.round((finalStats.correctAnswers / finalStats.cardsStudied) * 100)
      : 0;
    const avgMastery = flashcards.length > 0
        ? Math.round(flashcards.reduce((sum, card) => sum + (card.mastery || 0), 0) / flashcards.length)
        : 0;

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white  p-4 md:p-8 flex items-center justify-center">
          <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-blue-600 p-6 text-white">
              <h1 className="text-2xl font-bold text-center">Study Session Complete!</h1>
              <p className="opacity-90 text-center mt-1">Great work finishing the deck!</p>
            </div>

            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">Session Summary</h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* Cards Studied */}
                <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-100">
                  <div className="text-3xl font-bold text-blue-600">{finalStats.cardsStudied}</div>
                  <div className="text-sm text-gray-600 mt-1">Cards Rated</div>
                </div>
                {/* Accuracy */}
                <div className="bg-green-50 p-4 rounded-lg text-center border border-green-100">
                  <div className="text-3xl font-bold text-green-600">{accuracy}%</div>
                  <div className="text-sm text-gray-600 mt-1">Accuracy <span className="text-xs">(Good/Easy)</span></div>
                </div>
                {/* Time Spent (uses sessionTimer) */}
                <div className="bg-purple-50 p-4 rounded-lg text-center border border-purple-100">
                  <div className="text-3xl font-bold text-purple-600">{formatTime(finalStats.timeSpent)}</div>
                  <div className="text-sm text-gray-600 mt-1">Time Spent</div>
                </div>
                {/* Average Mastery */}
                <div className="bg-yellow-50 p-4 rounded-lg text-center border border-yellow-100">
                   <div className="text-3xl font-bold text-yellow-600">{avgMastery}%</div>
                  <div className="text-sm text-gray-600 mt-1">Average Mastery</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={restartStudy}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-150 ease-in-out"
                >
                  Study Again
                </button>
                <button
                  onClick={exitStudySession}
                  className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors duration-150 ease-in-out"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      );
  }

  // --- Main Study Interface ---
  return (
    <div className="min-h-screen bg-#F6F1E5 p-4 flex flex-col">
      <div className="max-w-3xl mx-auto w-full flex-grow flex flex-col">
        {/* Header section */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-y-3">
          {/* Left Side: Deck Title & Study Mode */}
           <div className="flex flex-col items-center sm:items-start">
             {/* ... (Study Mode dropdown remains the same) ... */}
             <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate max-w-xs md:max-w-md" title={folderName}>
                 {folderName}
             </h1>
             <div className="relative mt-1">
               <button
                 id="studyModeButton"
                 onClick={() => document.getElementById('studyModeMenu').classList.toggle('hidden')}
                 className="flex items-center gap-1 py-1 px-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                 aria-haspopup="true"
                 aria-controls="studyModeMenu"
                 aria-expanded={!document.getElementById('studyModeMenu')?.classList.contains('hidden')}
               >
                 <span>Mode: {studyMode.charAt(0).toUpperCase() + studyMode.slice(1)}</span>
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
               </button>
               <div id="studyModeMenu" className="hidden absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                 <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="studyModeButton">
                   <button onClick={() => changeStudyMode('standard')} className={`w-full text-left px-4 py-2 text-sm ${studyMode === 'standard' ? 'bg-blue-100 text-blue-800 font-medium' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`} role="menuitem">Standard</button>
                   <button onClick={() => changeStudyMode('spaced')} className={`w-full text-left px-4 py-2 text-sm ${studyMode === 'spaced' ? 'bg-blue-100 text-blue-800 font-medium' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`} role="menuitem">Spaced Repetition</button>
                   <button onClick={() => changeStudyMode('shuffle')} className={`w-full text-left px-4 py-2 text-sm ${studyMode === 'shuffle' ? 'bg-blue-100 text-blue-800 font-medium' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`} role="menuitem">Shuffle</button>
                 </div>
               </div>
             </div>
           </div>

          {/* Right Side: New Timer & Exit Button */}
          <div className="flex items-center gap-4">
            {/* --- New Timer --- */}
            <div className="relative" ref={timerMenuRef}>
                {/* Timer Display Button */}
                <button
                    onClick={toggleTimerMenu}
                    className="text-lg font-medium text-gray-700 bg-white px-3 py-1 rounded-lg border border-gray-200 shadow-sm flex items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    aria-haspopup="true"
                    aria-controls="timerMenu"
                    aria-expanded={isTimerMenuOpen}
                >
                    <svg className={`inline-block w-5 h-5 mr-1.5 ${timerMode === 'countdown' ? 'text-red-500' : 'text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {timerMode === 'countdown'
                         ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v3a3 3 0 01-3 3z"></path> // Countdown icon (placeholder)
                         : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> // Stopwatch icon
                         }
                    </svg>
                    {formatTime(timerValue)}
                    {timerMode === 'countdown' && timerDuration && (
                        <span className="text-xs ml-1.5 text-gray-400">/ {formatTime(timerDuration)}</span>
                    )}
                </button>

                {/* Timer Options Dropdown */}
                {isTimerMenuOpen && (
                    <div id="timerMenu" className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-xl ring-1 ring-black ring-opacity-5 z-30 p-4">
                        <p className="text-sm font-medium text-gray-700 mb-3">Set Timer</p>

                        {/* Preset Buttons */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            <button onClick={() => handleSetPresetTimer(5)} className="text-sm py-1.5 px-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300">5 min</button>
                            <button onClick={() => handleSetPresetTimer(10)} className="text-sm py-1.5 px-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300">10 min</button>
                            <button onClick={() => handleSetPresetTimer(15)} className="text-sm py-1.5 px-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300">15 min</button>
                        </div>

                        {/* Custom Time Input */}
                         <div className="flex items-center gap-2 mb-4">
                            <input
                                type="text"
                                value={customTimeInput}
                                onChange={(e) => setCustomTimeInput(e.target.value)}
                                placeholder="MM:SS"
                                className="flex-grow w-full px-2 py-1 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                aria-label="Custom time input in MM:SS format"
                            />
                            <button onClick={handleSetCustomTimer} className="text-sm py-1 px-3 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">Set</button>
                        </div>

                        {/* Stopwatch Mode Button */}
                         <button onClick={handleSetStopwatchMode} className="w-full text-sm py-1.5 px-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
                           Stopwatch (00:00)
                         </button>

                         {/* Pause/Resume (Example - could be added) */}
                         {/* <button onClick={() => setIsTimerRunning(prev => !prev)} className="...">
                           {isTimerRunning ? 'Pause' : 'Resume'}
                         </button> */}
                    </div>
                )}
            </div>
            {/* --- End New Timer --- */}

            {/* Exit Button */}
            <button
              onClick={exitStudySession}
              className="p-2 text-gray-500 hover:text-red-600 transition-colors rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300"
              title="Exit Study Session & Save Progress"
              aria-label="Exit Study Session"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
            </button>
          </div>
        </header>

        {/* Card Count Bubble Display */}
        <div className="flex justify-center items-center gap-x-3 my-4 text-sm font-medium text-gray-600">
            {/* ... (no changes needed) ... */}
             <span className="text-lg font-semibold text-gray-400">1</span>
             <span className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full text-sm font-bold shadow">
                 {currentIndex + 1}
             </span>
             <span className="text-lg font-semibold text-gray-400">{flashcards.length}</span>
        </div>


        {/* Flashcard Area - Adjusted margins/padding */}
        <div className="perspective flex-grow flex flex-col justify-start pt-2 md:pt-4 mb-4"> {/* Adjusted padding-top and mb */}
          <div
            className={`relative bg-white rounded-2xl shadow-lg transition-transform duration-500 preserve-3d cursor-pointer w-full h-72 md:h-80 flex flex-col ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={(e) => {
              // Prevent flip if clicking on button inside card (like rating)
              if (e.target.closest('button')) return;
              handleFlip();
            }}
            role="button"
            tabIndex={0}
            aria-label={`Flashcard ${currentIndex + 1}. ${isFlipped ? 'Showing Answer' : 'Showing Question'}. Click or press Space to flip.`}
          >
            {/* Card Front (Question) */}
            <div className={`absolute inset-0 p-6 md:p-8 backface-hidden flex flex-col ${isFlipped ? 'invisible' : ''}`}>
                {/* ... (Front content remains the same) ... */}
                <div className="flex justify-between items-start mb-3">
                 <span className="text-xs font-semibold uppercase tracking-wide text-blue-600 bg-blue-100 px-2 py-0.5 rounded">Question</span>
                 {currentCard.mastery !== undefined && currentCard.mastery > 0 && (
                   <div className="flex items-center gap-1" title={`Mastery: ${currentCard.mastery}%`}>
                     <span className="text-xs text-gray-500">Mastery:</span>
                     <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                       <div
                         className={`h-full ${getMasteryColor(currentCard.mastery)} transition-all duration-300`}
                         style={{ width: `${currentCard.mastery}%` }}
                       ></div>
                     </div>
                   </div>
                 )}
               </div>
               <div className="flex-grow flex items-center justify-center text-center">
                   <p className="text-lg md:text-xl font-semibold text-gray-800">
                     {currentCard.question}
                   </p>
               </div>
               <div className="text-center text-xs text-gray-400 mt-auto pt-2">
                 Tap or press Space to reveal answer
               </div>
            </div>

            {/* Card Back (Answer) */}
            <div className={`absolute inset-0 p-6 md:p-8 backface-hidden rotate-y-180 flex flex-col ${!isFlipped ? 'invisible' : ''}`}>
                {/* ... (Answer content remains the same) ... */}
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-green-600 bg-green-100 px-2 py-0.5 rounded">Answer</span>
                  {currentCard.timesReviewed > 0 && (
                    <span className="text-xs text-gray-500 italic">Reviewed {currentCard.timesReviewed} time(s)</span>
                  )}
                </div>
                <div className="flex-grow flex items-center justify-center text-center mb-4">
                  <p className="text-lg md:text-xl font-medium text-gray-800">
                    {currentCard.answer}
                  </p>
                </div>

               {/* Difficulty Rating */}
               <div className="mt-auto pt-2">
                 <p className="text-sm font-medium text-gray-700 mb-2 text-center">How well did you recall this?</p>
                 <div className="grid grid-cols-4 gap-2">
                    {['again', 'hard', 'good', 'easy'].map((rating, index) => {
                      const colors = {
                        again: 'bg-red-100 hover:bg-red-200 text-red-800 border-red-200 focus:ring-red-300',
                        hard: 'bg-orange-100 hover:bg-orange-200 text-orange-800 border-orange-200 focus:ring-orange-300',
                        good: 'bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-200 focus:ring-blue-300',
                        easy: 'bg-green-100 hover:bg-green-200 text-green-800 border-green-200 focus:ring-green-300',
                      };
                      const keyNumber = index + 1;
                      // Highlight button if selected via keyboard arrows
                      const isSelected = selfRating === rating;
                      return (
                        <button
                          key={rating}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card flip
                            handleDifficultyRating(rating);
                          }}
                          className={`p-3 rounded-lg text-sm font-semibold border transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 ${colors[rating]} ${isSelected ? 'ring-2 ring-offset-1 ring-blue-400 shadow-md scale-105' : ''}`} // Added visual feedback for keyboard selection
                          title={`Rate as ${rating} (Press ${keyNumber} or use Arrows + Space/Enter)`}
                          aria-label={`Rate as ${rating}`}
                          aria-pressed={isSelected} // Indicate selection state
                        >
                          {rating.charAt(0).toUpperCase() + rating.slice(1)}
                          <span className="block text-xs opacity-70">({keyNumber})</span>
                        </button>
                      );
                    })}
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Card Navigation Controls */}
        <div className="flex justify-between items-center mt-auto pb-4">
            {/* ... (Previous/Next buttons remain the same) ... */}
             <button
               onClick={previousCard}
               className={`py-2 px-5 rounded-lg font-medium transition-colors duration-150 ease-in-out flex items-center gap-1 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
               id="prev-card-btn"
               disabled={currentIndex === 0}
               aria-label="Previous Card (Left Arrow)"
             >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
               Previous
             </button>
             <button
               onClick={skipCard}
               className="py-2 px-5 rounded-lg font-medium transition-colors duration-150 ease-in-out flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
               id="next-card-btn"
               aria-label="Next Card (Right Arrow)"
             >
               Next
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
             </button>
        </div>

      </div>

      {/* CSS for 3D card flip effect and focus states */}
      <style jsx>{`
        .perspective {
          perspective: 2000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden; /* Safari */
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        /* Enhance focus states for accessibility */
        button:focus-visible, div[role="button"]:focus-visible, input:focus-visible {
            outline: 2px solid #60a5fa; /* Tailwind blue-400 */
            outline-offset: 2px;
            box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.3); /* Optional softer glow */
        }
        /* Override default focus for specific elements if needed */
        button.focus\\:ring-2:focus-visible {
             outline: none; /* Use only the ring */
        }
         /* Styling for keyboard selected rating (using ring from className now) */
        /* .ring-2 {
             box-shadow: 0 0 0 2px theme('colors.blue.400'), 0 0 0 3px theme('colors.white');
         } */
      `}</style>
    </div>
  );
};

export default FlashcardStudyPage;