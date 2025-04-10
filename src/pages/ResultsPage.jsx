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
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">No Flashcards Found</h2>
        <p className="mb-4">Please generate flashcards first.</p>
        <Button onClick={() => navigate('/generate')}>Go to Generation Page</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Flashcards</h2>
      <p className="mb-4">Review and edit your flashcards below before exporting.</p>

      {loading ? (
        <div className="grid gap-4 mb-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="p-4 border rounded shadow animate-pulse space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-4 mb-6">
            {flashcards.map((fc, index) => (
              <EditableFlashcardCard
                key={index}
                flashcard={fc}
                onDelete={() => handleDelete(index)}
                onSave={(q, a) => handleEdit(index, q, a)}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Button onClick={exportAsJSON} aria-label="Export flashcards as JSON">Export as JSON</Button>
            <Button onClick={exportAsCSV} aria-label="Export flashcards as CSV">Export as CSV</Button>
            <Button onClick={copyToClipboard} aria-label="Copy flashcards to clipboard">Copy to Clipboard</Button>
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
    <Card className="p-4">
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            className="w-full border rounded p-2"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={2}
          />
          <textarea
            className="w-full border rounded p-2"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={2}
          />
          <div className="flex gap-2 mt-2">
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={() => setIsEditing(false)} className="bg-gray-300 text-black hover:bg-gray-400">Cancel</Button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="font-semibold mb-2">Q: {flashcard.question}</h3>
          <p className="mb-2">A: {flashcard.answer}</p>
          <div className="flex gap-2 mt-2">
            <Button onClick={() => setIsEditing(true)} aria-label="Edit flashcard">Edit</Button>
            <Button onClick={onDelete} className="bg-red-500 hover:bg-red-600" aria-label="Delete flashcard">Delete</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ResultsPage;