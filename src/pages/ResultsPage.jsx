import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

import { useEffect } from 'react';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialFlashcards = location.state?.flashcards || [];
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (index) => {
    setFlashcards(flashcards.filter((_, i) => i !== index));
  };

  const handleEdit = (index, newQuestion, newAnswer) => {
    const updated = [...flashcards];
    updated[index] = { question: newQuestion, answer: newAnswer };
    setFlashcards(updated);
  };

  const exportAsJSON = () => {
    const dataStr = JSON.stringify(flashcards, null, 2);
    downloadFile('flashcards.json', dataStr, 'application/json');
  };

  const exportAsCSV = () => {
    const csvRows = [
      ['Question', 'Answer'],
      ...flashcards.map((fc) => [fc.question, fc.answer]),
    ];
    const csvContent = csvRows.map((row) =>
      row.map((field) => `"${field.replace(/"/g, '""')}"`).join(',')
    ).join('\n');
    downloadFile('flashcards.csv', csvContent, 'text/csv');
  };

  const copyToClipboard = async () => {
    const text = flashcards.map(fc => `Q: ${fc.question}\nA: ${fc.answer}`).join('\n\n');
    try {
      await navigator.clipboard.writeText(text);
      alert('Flashcards copied to clipboard!');
    } catch {
      alert('Failed to copy to clipboard.');
    }
  };

  const downloadFile = (filename, content, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!flashcards.length) {
    return (
      <div className="w-full max-w-screen-lg mx-auto px-4 md:px-8 py-4 md:py-8">
        <h2 className="text-xl md:text-2xl font-bold mb-2">No Flashcards Found</h2>
        <p className="mb-4 text-base md:text-lg">Please generate flashcards first.</p>
        <Button className="min-h-[44px] px-4 py-2 text-base" onClick={() => navigate('/generate')}>Go to Generation Page</Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen-lg mx-auto px-4 md:px-8 py-4 md:py-8">
      <h2 className="text-xl md:text-2xl font-bold mb-2">Your Flashcards</h2>
      <p className="mb-4 text-base md:text-lg">Review and edit your flashcards below before exporting.</p>

      {loading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="bg-gray-100 rounded h-24 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 mb-6">
            {flashcards.map((fc, index) => (
              <EditableFlashcardCard
                key={index}
                flashcard={fc}
                onDelete={() => handleDelete(index)}
                onSave={(q, a) => handleEdit(index, q, a)}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button className="min-h-[44px] px-4 py-2 text-base" onClick={exportAsJSON} aria-label="Export flashcards as JSON">Export as JSON</Button>
            <Button className="min-h-[44px] px-4 py-2 text-base" onClick={exportAsCSV} aria-label="Export flashcards as CSV">Export as CSV</Button>
            <Button className="min-h-[44px] px-4 py-2 text-base" onClick={copyToClipboard} aria-label="Copy flashcards to clipboard">Copy to Clipboard</Button>
          </div>
        </>
      )}
    </div>
  );
};

const EditableFlashcardCard = ({ flashcard, onDelete, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [question, setQuestion] = useState(flashcard.question);
  const [answer, setAnswer] = useState(flashcard.answer);

  const handleSave = () => {
    onSave(question, answer);
    setIsEditing(false);
  };

  return (
    <Card>
      {isEditing ? (
        <div className="flex flex-col gap-2 p-2">
          <textarea
            className="w-full border rounded p-2 text-base"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={2}
          />
          <textarea
            className="w-full border rounded p-2 text-base"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={2}
          />
          <div className="flex gap-2 mt-2">
            <Button className="min-h-[44px] px-4 py-2 text-base" onClick={handleSave}>Save</Button>
            <Button className="min-h-[44px] px-4 py-2 text-base" onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 p-2">
          <h3 className="font-semibold text-base md:text-lg">Q: {flashcard.question}</h3>
          <p className="text-base md:text-lg">A: {flashcard.answer}</p>
          <div className="flex gap-2 mt-2">
            <Button className="min-h-[44px] px-4 py-2 text-base" onClick={() => setIsEditing(true)} aria-label="Edit flashcard">Edit</Button>
            <Button className="min-h-[44px] px-4 py-2 text-base" onClick={onDelete} aria-label="Delete flashcard">Delete</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ResultsPage;